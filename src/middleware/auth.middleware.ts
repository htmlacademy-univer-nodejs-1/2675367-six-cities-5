import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { jwtVerify } from 'jose';
import { HttpError } from '../core/exception-filter/index.js';
import { config } from '../core/config/config.js';

export interface AuthRequest extends Request {
  user?: { id: string };
}

export class AuthMiddleware {
  public async execute(req: AuthRequest, _res: Response, next: NextFunction): Promise<void> {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Authorization required');
    }

    const token = authHeader.substring(7);
    try {
      const secret = new TextEncoder().encode(config.get('security.jwtSecret'));
      const { payload } = await jwtVerify(token, secret);
      req.user = { id: payload.userId as string };
      return next();
    } catch (error) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Invalid token');
    }
  }
}
