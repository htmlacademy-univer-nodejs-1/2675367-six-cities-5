import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IExceptionFilter } from './exception-filter.interface.js';

export class ExceptionFilter implements IExceptionFilter {
  public catch(error: Error, req: Request, res: Response, next: NextFunction): void {
    // Логирование ошибок
    console.error(`[Exception Filter] ${error.message}`);
    if (error.stack) {
      console.error(error.stack);
    }

    // Разделяем ошибки сервера и HTTP-ошибки
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({
        error: error.message,
        ...(error.details && { details: error.details }),
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Internal Server Error',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      });
    }
  }
}

export class HttpError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

