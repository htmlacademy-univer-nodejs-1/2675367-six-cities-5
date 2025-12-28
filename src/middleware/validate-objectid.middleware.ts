import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IMiddleware } from '../core/middleware/index.js';
import { HttpError } from '../core/exception-filter/index.js';

export class ValidateObjectIdMiddleware implements IMiddleware {
  constructor(private paramName: string = 'id') {}

  public execute(req: Request, res: Response, next: NextFunction): void {
    const id = req.params[this.paramName];

    if (!id) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `Parameter ${this.paramName} is required`
      );
    }

    // Проверка формата ObjectID (24 символа, hex)
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    if (!objectIdRegex.test(id)) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `Invalid ${this.paramName} format. Expected ObjectID (24 hex characters)`
      );
    }

    next();
  }
}

