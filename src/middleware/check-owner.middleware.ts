import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../core/exception-filter/index.js';
import { AuthRequest } from './index.js';

export type OfferOwnerProvider = {
  getAuthorId(offerId: string): Promise<string | null>;
};

export class CheckOwnerMiddleware {
  constructor(private readonly provider: OfferOwnerProvider) {}

  public async execute(
    req: AuthRequest,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    const { offerId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Not authenticated');
    }

    const authorId = await this.provider.getAuthorId(offerId);
    if (!authorId) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Offer not found');
    }

    if (authorId !== userId) {
      throw new HttpError(StatusCodes.FORBIDDEN, 'You can only edit your own offers');
    }

    return next();
  }
}
