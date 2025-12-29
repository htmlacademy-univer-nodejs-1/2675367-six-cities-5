import { OfferEntity } from '../entities/offer.entity.js';
import { CreateOfferDto, UpdateOfferDto } from '../dto/index.js';
import { IOfferModel, ICommentModel } from '../models/index.js';
import { City } from '../types/index.js';

export class OfferService {
  constructor(
    private readonly offerModel: IOfferModel,
    private readonly commentModel: ICommentModel
  ) {}

  public async create(dto: CreateOfferDto, authorId: string): Promise<OfferEntity> {
    return this.offerModel.create(dto, authorId);
  }

  public async findById(id: string): Promise<OfferEntity | null> {
    const offer = await this.offerModel.findById(id);
    if (offer) {
      await this.updateCommentCount(offer.id!);
      return this.offerModel.findById(id);
    }
    return null;
  }

  public async find(limit?: number): Promise<OfferEntity[]> {
    return this.offerModel.find(limit);
  }

  public async findPremiumByCity(city: City, limit: number = 3): Promise<OfferEntity[]> {
    return this.offerModel.findPremiumByCity(city, limit);
  }

  public async findFavoritesByUserId(userId: string): Promise<OfferEntity[]> {
    return this.offerModel.findFavoritesByUserId(userId);
  }

  public async update(id: string, dto: UpdateOfferDto): Promise<OfferEntity | null> {
    return this.offerModel.update(id, dto);
  }

  public async delete(id: string): Promise<void> {
    await this.offerModel.delete(id);
  }

  public async exists(id: string): Promise<boolean> {
    return this.offerModel.exists(id);
  }

  private async updateCommentCount(offerId: string): Promise<void> {
    const count = await this.commentModel.countByOfferId(offerId);
    await this.offerModel.updateCommentCount(offerId, count);
  }

  public async updateRating(offerId: string): Promise<void> {
    const averageRating = await this.commentModel.getAverageRatingByOfferId(offerId);
    await this.offerModel.updateRating(offerId, averageRating);
  }

  public async refreshCommentCount(offerId: string): Promise<void> {
    await this.updateCommentCount(offerId);
  }

  public async addToFavorites(offerId: string, userId: string): Promise<void> {
    const exists = await this.exists(offerId);
    if (!exists) {
      throw new Error(`Offer with id ${offerId} not found`);
    }
    await this.offerModel.addToFavorites(offerId, userId);
  }

  public async removeFromFavorites(offerId: string, userId: string): Promise<void> {
    const exists = await this.exists(offerId);
    if (!exists) {
      throw new Error(`Offer with id ${offerId} not found`);
    }
    await this.offerModel.removeFromFavorites(offerId, userId);
  }

  public async isFavorite(offerId: string, userId: string): Promise<boolean> {
    return this.offerModel.isFavorite(offerId, userId);
  }
}

