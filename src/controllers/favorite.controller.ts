import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Controller } from '../core/controller/controller.js';
import { OfferService } from '../services/index.js';

export class FavoriteController extends Controller {
  constructor(private readonly offerService: OfferService) {
    super();
  }

  public index = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    // TODO: Получить userId из токена
    const userId = 'mock-user-id';
    const offers = await this.offerService.findFavoritesByUserId(userId);
    this.ok(res, {
      data: offers.map((offer) => offer.toObject()),
    });
  });

  public create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { offerId } = req.params;
    // TODO: Получить userId из токена
    const userId = 'mock-user-id';
    await this.offerService.addToFavorites(offerId, userId);
    this.created(res, { message: 'Предложение добавлено в избранное' });
  });

  public delete = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { offerId } = req.params;
    // TODO: Получить userId из токена
    const userId = 'mock-user-id';
    await this.offerService.removeFromFavorites(offerId, userId);
    this.noContent(res);
  });
}

