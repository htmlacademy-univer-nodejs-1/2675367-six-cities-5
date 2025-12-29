import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../core/exception-filter/index.js';

type ExistenceChecker = {
  exists?: (id: string) => Promise<boolean> | boolean;
  findById?: (id: string) => Promise<unknown> | unknown;
};

export class ValidateExistsMiddleware {
  constructor(private readonly service: ExistenceChecker, private readonly paramName = 'id') {}

  public async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const id = req.params[this.paramName];
    if (!id) {
      throw new HttpError(StatusCodes.BAD_REQUEST, `Missing param ${this.paramName}`);
    }

    let exists = false;
    if (typeof this.service.exists === 'function') {
      exists = await this.service.exists(id);
    } else if (typeof this.service.findById === 'function') {
      const doc = await this.service.findById(id);
      exists = !!doc;
    } else {
      throw new Error('Service must implement exists(id) or findById(id)');
    }

    if (!exists) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Resource not found');
    }

    next();
  }
}
