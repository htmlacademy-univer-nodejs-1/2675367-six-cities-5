import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Controller } from '../core/controller/controller.js';
import { OfferService } from '../services/index.js';
import { AuthRequest } from '../middleware/index.js';

export class FavoriteController extends Controller {
  constructor(private readonly offerService: OfferService) {
    super();
  }

  public index = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;
    if (!userId) {
      this.unauthorized(res, 'Not authenticated');
      return;
    }
    const offers = await this.offerService.findFavoritesByUserId(userId);
    this.ok(res, {
      data: offers.map((offer) => offer.toObject()),
    });
  });

  public create = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    const { offerId } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      this.unauthorized(res, 'Not authenticated');
      return;
    }
    await this.offerService.addToFavorites(offerId, userId);
    this.created(res, { message: 'Предложение добавлено в избранное' });
  });

  public delete = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    const { offerId } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      this.unauthorized(res, 'Not authenticated');
      return;
    }
    await this.offerService.removeFromFavorites(offerId, userId);
    this.noContent(res);
  });
}
