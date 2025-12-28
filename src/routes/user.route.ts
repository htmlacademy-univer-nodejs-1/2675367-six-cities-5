import { Router } from 'express';
import { UserController } from '../controllers/index.js';
import { ValidateDtoMiddleware } from '../middleware/index.js';
import { CreateUserDto, LoginDto } from '../dto/index.js';

export function createUserRouter(userController: UserController): Router {
  const router = Router();

  router.post(
    '/register',
    new ValidateDtoMiddleware(CreateUserDto).execute.bind(new ValidateDtoMiddleware(CreateUserDto)),
    userController.register
  );

  router.post(
    '/login',
    new ValidateDtoMiddleware(LoginDto).execute.bind(new ValidateDtoMiddleware(LoginDto)),
    userController.login
  );

  router.get('/login', userController.checkAuth);
  router.delete('/logout', userController.logout);

  return router;
}
