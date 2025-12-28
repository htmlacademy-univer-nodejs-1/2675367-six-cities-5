import { OfferEntity } from '../entities/offer.entity.js';
import { CreateOfferDto, UpdateOfferDto } from '../dto/index.js';
import { City } from '../types/index.js';

export interface IOfferModel {
  create(dto: CreateOfferDto, authorId: string): Promise<OfferEntity>;
  findById(id: string): Promise<OfferEntity | null>;
  find(limit?: number): Promise<OfferEntity[]>;
  findPremiumByCity(city: City, limit?: number): Promise<OfferEntity[]>;
  findFavoritesByUserId(userId: string): Promise<OfferEntity[]>;
  update(id: string, dto: UpdateOfferDto): Promise<OfferEntity | null>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  updateCommentCount(offerId: string, count: number): Promise<void>;
  updateRating(offerId: string, rating: number): Promise<void>;
  addToFavorites(offerId: string, userId: string): Promise<void>;
  removeFromFavorites(offerId: string, userId: string): Promise<void>;
  isFavorite(offerId: string, userId: string): Promise<boolean>;
}

export abstract class OfferModel implements IOfferModel {
  abstract create(dto: CreateOfferDto, authorId: string): Promise<OfferEntity>;
  abstract findById(id: string): Promise<OfferEntity | null>;
  abstract find(limit?: number): Promise<OfferEntity[]>;
  abstract findPremiumByCity(city: City, limit?: number): Promise<OfferEntity[]>;
  abstract findFavoritesByUserId(userId: string): Promise<OfferEntity[]>;
  abstract update(id: string, dto: UpdateOfferDto): Promise<OfferEntity | null>;
  abstract delete(id: string): Promise<void>;
  abstract exists(id: string): Promise<boolean>;
  abstract updateCommentCount(offerId: string, count: number): Promise<void>;
  abstract updateRating(offerId: string, rating: number): Promise<void>;
  abstract addToFavorites(offerId: string, userId: string): Promise<void>;
  abstract removeFromFavorites(offerId: string, userId: string): Promise<void>;
  abstract isFavorite(offerId: string, userId: string): Promise<boolean>;
}

