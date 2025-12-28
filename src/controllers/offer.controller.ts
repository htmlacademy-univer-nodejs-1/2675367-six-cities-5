import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Controller } from '../core/controller/controller.js';
import { CreateOfferDto, UpdateOfferDto } from '../dto/index.js';
import { OfferService } from '../services/index.js';
import { plainToInstance } from 'class-transformer';

export class OfferController extends Controller {
  constructor(private readonly offerService: OfferService) {
    super();
  }

  public index = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
    const offers = await this.offerService.find(limit);
    this.ok(res, {
      data: offers.map((offer) => offer.toObject()),
      total: offers.length,
    });
  });

  public create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const dto = plainToInstance(CreateOfferDto, req.body);
    // TODO: Получить authorId из токена
    const authorId = 'mock-author-id';
    const offer = await this.offerService.create(dto, authorId);
    this.created(res, { data: offer.toObject() });
  });

  public show = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { offerId } = req.params;
    const offer = await this.offerService.findById(offerId);
    if (!offer) {
      this.notFound(res, { error: `Offer with id ${offerId} not found` });
      return;
    }
    this.ok(res, { data: offer.toObject() });
  });

  public update = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { offerId } = req.params;
    const dto = plainToInstance(UpdateOfferDto, req.body);
    const offer = await this.offerService.update(offerId, dto);
    if (!offer) {
      this.notFound(res, { error: `Offer with id ${offerId} not found` });
      return;
    }
    this.ok(res, { data: offer.toObject() });
  });

  public delete = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { offerId } = req.params;
    await this.offerService.delete(offerId);
    this.noContent(res);
  });

  public getPremiumByCity = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { city } = req.params;
    const offers = await this.offerService.findPremiumByCity(city as any, 3);
    this.ok(res, {
      data: offers.map((offer) => offer.toObject()),
    });
  });
}

