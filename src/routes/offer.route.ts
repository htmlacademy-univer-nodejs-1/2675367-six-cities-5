import { Router } from 'express';
import { OfferController } from '../controllers/index.js';
import { ValidateObjectIdMiddleware } from '../middleware/index.js';

export function createOfferRouter(offerController: OfferController): Router {
  const router = Router();

  router.get('/', offerController.index);
  router.post('/', offerController.create);
  router.get('/premium/:city', offerController.getPremiumByCity);
  const validateOfferId = new ValidateObjectIdMiddleware('offerId');

  router.get('/:offerId', validateOfferId.execute.bind(validateOfferId), offerController.show);
  router.patch('/:offerId', validateOfferId.execute.bind(validateOfferId), offerController.update);
  router.delete('/:offerId', validateOfferId.execute.bind(validateOfferId), offerController.delete);

  return router;
}
