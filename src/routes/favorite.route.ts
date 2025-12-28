import { Router } from 'express';
import { FavoriteController } from '../controllers/index.js';

export function createFavoriteRouter(favoriteController: FavoriteController): Router {
  const router = Router();

  router.get('/', favoriteController.index);
  router.post('/:offerId', favoriteController.create);
  router.delete('/:offerId', favoriteController.delete);

  return router;
}

