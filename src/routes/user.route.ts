import { Router } from 'express';
import { UserController } from '../controllers/index.js';

export function createUserRouter(userController: UserController): Router {
  const router = Router();

  router.post('/register', userController.register);
  router.post('/login', userController.login);
  router.get('/login', userController.checkAuth);
  router.delete('/logout', userController.logout);

  return router;
}

