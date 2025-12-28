import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import asyncHandler from 'express-async-handler';
import { IMiddleware } from '../core/middleware/index.js';
import { HttpError } from '../core/exception-filter/index.js';

export class ValidateDtoMiddleware implements IMiddleware {
  constructor(private dtoClass: new (...args: any[]) => object) {}

  public execute = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dto = plainToInstance(this.dtoClass, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const errorMessages = this.formatErrors(errors);
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Validation failed',
        errorMessages
      );
    }

    req.body = dto;
    next();
  });

  private formatErrors(errors: ValidationError[]): Array<{ field: string; message: string }> {
    return errors.map((error) => {
      const messages = error.constraints
        ? Object.values(error.constraints)
        : ['Validation failed'];
      return {
        field: error.property,
        message: messages.join(', '),
      };
    });
  }
}

