import { Request, Response, NextFunction } from 'express';
import { jwtVerify } from 'jose';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../core/exception-filter/index.js';
import { IMiddleware } from '../core/middleware/index.js';
import { Config } from '../config/config.js';

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export class AuthMiddleware implements IMiddleware {
  public async execute(req: AuthRequest, _res: Response, next: NextFunction): Promise<void> {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Missing or invalid authorization header');
    }

    const token = authHeader.slice(7);

    try {
      const secret = new TextEncoder().encode(Config.SALT);
      const { payload } = await jwtVerify(token, secret);

      req.user = {
        id: payload.sub as string,
      };

      return next();
    } catch (_error) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Invalid token');
    }
  }
}
