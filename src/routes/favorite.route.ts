import { Router } from 'express';
import { FavoriteController } from '../controllers/index.js';
import { ValidateObjectIdMiddleware, AuthMiddleware } from '../middleware/index.js';

export function createFavoriteRouter(favoriteController: FavoriteController): Router {
  const router = Router();
  const authMiddleware = new AuthMiddleware();

  router.get('/', authMiddleware.execute.bind(authMiddleware), favoriteController.index);
  const validateOfferId = new ValidateObjectIdMiddleware('offerId');

  router.post('/:offerId', authMiddleware.execute.bind(authMiddleware), validateOfferId.execute.bind(validateOfferId), favoriteController.create);
  router.delete('/:offerId', authMiddleware.execute.bind(authMiddleware), validateOfferId.execute.bind(validateOfferId), favoriteController.delete);

  return router;
}
