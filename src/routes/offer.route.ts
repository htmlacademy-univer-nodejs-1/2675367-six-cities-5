import { Router } from 'express';
import { OfferController } from '../controllers/index.js';
import { ValidateObjectIdMiddleware, ValidateDtoMiddleware } from '../middleware/index.js';
import { CreateOfferDto, UpdateOfferDto } from '../dto/index.js';

export function createOfferRouter(offerController: OfferController): Router {
  const router = Router();

  const validateOfferId = new ValidateObjectIdMiddleware('offerId');
  const validateCreateOffer = new ValidateDtoMiddleware(CreateOfferDto);
  const validateUpdateOffer = new ValidateDtoMiddleware(UpdateOfferDto);

  router.get('/', offerController.index);

  router.post(
    '/',
    validateCreateOffer.execute.bind(validateCreateOffer),
    offerController.create
  );

  router.get(
    '/premium/:city',
    offerController.getPremiumByCity
  );

  router.get(
    '/:offerId',
    validateOfferId.execute.bind(validateOfferId),
    offerController.show
  );

  router.patch(
    '/:offerId',
    validateOfferId.execute.bind(validateOfferId),
    validateUpdateOffer.execute.bind(validateUpdateOffer),
    offerController.update
  );

  router.delete(
    '/:offerId',
    validateOfferId.execute.bind(validateOfferId),
    offerController.delete
  );

  return router;
}
