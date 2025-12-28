import { OfferEntity } from '../../models/index.js';

export interface IOfferService {
  create(offerData: Partial<OfferEntity>): Promise<OfferEntity>;
  findById(offerId: string): Promise<OfferEntity | null>;
}

