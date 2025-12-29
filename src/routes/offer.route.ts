import { Router } from 'express';
import { OfferController } from '../controllers/index.js';
import { ValidateObjectIdMiddleware, AuthMiddleware, ValidateDtoMiddleware, CheckOwnerMiddleware, type OfferOwnerProvider } from '../middleware/index.js';
import { CreateOfferDto, UpdateOfferDto } from '../dto/index.js';

export function createOfferRouter(offerController: OfferController, ownerProvider?: OfferOwnerProvider): Router {
  const router = Router();
  const authMiddleware = new AuthMiddleware();
  const validateOfferId = new ValidateObjectIdMiddleware('offerId');
  const validateCreateOffer = new ValidateDtoMiddleware(CreateOfferDto);
  const validateUpdateOffer = new ValidateDtoMiddleware(UpdateOfferDto);
  const checkOwner = ownerProvider ? new CheckOwnerMiddleware(ownerProvider) : null;

  router.get('/', offerController.index);
  router.post('/', authMiddleware.execute.bind(authMiddleware), validateCreateOffer.execute.bind(validateCreateOffer), offerController.create);
  router.get('/premium/:city', offerController.getPremiumByCity);

  router.get('/:offerId', validateOfferId.execute.bind(validateOfferId), offerController.show);
  router.patch('/:offerId', validateOfferId.execute.bind(validateOfferId), authMiddleware.execute.bind(authMiddleware), validateUpdateOffer.execute.bind(validateUpdateOffer), checkOwner ? checkOwner.execute.bind(checkOwner) : (_req, _res, next) => next(), offerController.update);
  router.delete('/:offerId', validateOfferId.execute.bind(validateOfferId), authMiddleware.execute.bind(authMiddleware), checkOwner ? checkOwner.execute.bind(checkOwner) : (_req, _res, next) => next(), offerController.delete);

  return router;
}
