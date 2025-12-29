import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Controller } from '../core/controller/controller.js';
import { CreateUserDto, LoginDto } from '../dto/index.js';
import { UserService } from '../services/index.js';
import { plainToInstance } from 'class-transformer';
import { SignJWT } from 'jose';
import { config } from '../core/config/config.js';
import { AuthRequest } from '../middleware/index.js';

export class UserController extends Controller {
  constructor(private readonly userService: UserService) {
    super();
  }

  public register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const dto = plainToInstance(CreateUserDto, req.body);
    const user = await this.userService.create(dto);

    const secret = new TextEncoder().encode(config.get('security.jwtSecret'));
    const token = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret);

    this.created(res, { token, data: user.toObject() });
  });

  public login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const dto = plainToInstance(LoginDto, req.body);
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      this.unauthorized(res, 'Invalid credentials');
      return;
    }

    // TODO: Check password hash

    const secret = new TextEncoder().encode(config.get('security.jwtSecret'));
    const token = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret);

    this.ok(res, {
      token,
      user: user.toObject(),
    });
  });

  public checkAuth = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    // Since auth middleware is used, req.user is set
    const userId = req.user?.id;
    if (!userId) {
      this.unauthorized(res, 'Not authenticated');
      return;
    }
    const user = await this.userService.findById(userId);
    if (!user) {
      this.unauthorized(res, 'User not found');
      return;
    }
    this.ok(res, { data: user.toObject() });
  });

  public logout = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    // For JWT, logout is client-side
    this.noContent(res);
  });

  public uploadAvatar = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.userId;
    const file = req.file as Express.Multer.File | undefined;

    if (!file) {
      this.badRequest(res, 'File is required');
      return;
    }

    const avatarPath = `/uploads/${file.filename}`;
    const updated = await this.userService.update(userId, { avatar: avatarPath });

    if (!updated) {
      this.notFound(res, 'User not found');
      return;
    }

    this.ok(res, { data: updated.toObject() });
  });
}
