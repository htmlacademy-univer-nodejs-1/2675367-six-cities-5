import { Router } from 'express';
import { FavoriteController } from '../controllers/index.js';
import { ValidateObjectIdMiddleware, AuthMiddleware } from '../middleware/index.js';

export function createFavoriteRouter(favoriteController: FavoriteController): Router {
  const router = Router();
  const authMiddleware = new AuthMiddleware();
  const validateOfferId = new ValidateObjectIdMiddleware('offerId');

  router.get('/', authMiddleware.execute.bind(authMiddleware), favoriteController.index);
  router.post('/:offerId', validateOfferId.execute.bind(validateOfferId), authMiddleware.execute.bind(authMiddleware), favoriteController.create);
  router.delete('/:offerId', validateOfferId.execute.bind(validateOfferId), authMiddleware.execute.bind(authMiddleware), favoriteController.delete);

  return router;
}
