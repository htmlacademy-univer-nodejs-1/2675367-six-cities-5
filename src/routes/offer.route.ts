import { Router } from 'express';
import { OfferController } from '../controllers/index.js';

export function createOfferRouter(offerController: OfferController): Router {
  const router = Router();

  router.get('/', offerController.index);
  router.post('/', offerController.create);
  router.get('/premium/:city', offerController.getPremiumByCity);
  router.get('/:offerId', offerController.show);
  router.patch('/:offerId', offerController.update);
  router.delete('/:offerId', offerController.delete);

  return router;
}

