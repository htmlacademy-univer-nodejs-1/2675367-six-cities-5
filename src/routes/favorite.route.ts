import { Router } from 'express';
import { FavoriteController } from '../controllers/index.js';
import { ValidateObjectIdMiddleware } from '../middleware/index.js';

export function createFavoriteRouter(favoriteController: FavoriteController): Router {
  const router = Router();

  const validateOfferId = new ValidateObjectIdMiddleware('offerId');

  router.get('/', favoriteController.index);

  router.post(
    '/:offerId',
    validateOfferId.execute.bind(validateOfferId),
    favoriteController.create
  );

  router.delete(
    '/:offerId',
    validateOfferId.execute.bind(validateOfferId),
    favoriteController.delete
  );

  return router;
}
