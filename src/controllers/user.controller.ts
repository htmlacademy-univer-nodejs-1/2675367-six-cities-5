import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Controller } from '../core/controller/controller.js';
import { CreateUserDto } from '../dto/index.js';
import { UserService } from '../services/index.js';
import { plainToInstance } from 'class-transformer';

export class UserController extends Controller {
  constructor(private readonly userService: UserService) {
    super();
  }

  public register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const dto = plainToInstance(CreateUserDto, req.body);
    const user = await this.userService.create(dto);
    this.created(res, { data: user.toObject() });
  });

  public login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    // TODO: Реализовать логику аутентификации
    // Пока возвращаем заглушку
    this.ok(res, {
      token: 'mock-token',
      user: { id: '1', name: 'Test', email: 'test@test.com', userType: 'ordinary' },
    });
  });

  public checkAuth = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    // TODO: Реализовать проверку токена
    // Пока возвращаем заглушку
    this.ok(res, {
      data: { id: '1', name: 'Test', email: 'test@test.com', userType: 'ordinary' },
    });
  });

  public logout = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    // TODO: Реализовать логику выхода
    this.noContent(res);
  });
}

