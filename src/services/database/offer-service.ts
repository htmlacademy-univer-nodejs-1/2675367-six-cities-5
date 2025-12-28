import { injectable } from 'inversify';
import { OfferModel, OfferEntity } from '../../models/index.js';
import { IOfferService } from './offer-service.interface.js';

@injectable()
export class OfferService implements IOfferService {
  public async create(offerData: Partial<OfferEntity>): Promise<OfferEntity> {
    const offer = await OfferModel.create(offerData);
    return offer;
  }

  public async findById(offerId: string): Promise<OfferEntity | null> {
    return OfferModel.findById(offerId).exec();
  }
}

