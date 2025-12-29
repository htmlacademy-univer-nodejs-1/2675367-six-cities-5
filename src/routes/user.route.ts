import { Router } from 'express';
import { UserController } from '../controllers/index.js';
import { ValidateDtoMiddleware, AuthMiddleware } from '../middleware/index.js';
import { CreateUserDto, LoginDto } from '../dto/index.js';

export function createUserRouter(userController: UserController): Router {
  const router = Router();
  const authMiddleware = new AuthMiddleware();
  const validateCreateUser = new ValidateDtoMiddleware(CreateUserDto);
  const validateLogin = new ValidateDtoMiddleware(LoginDto);

  router.post('/register', validateCreateUser.execute.bind(validateCreateUser), userController.register);
  router.post('/login', validateLogin.execute.bind(validateLogin), userController.login);
  router.get('/login', authMiddleware.execute.bind(authMiddleware), userController.checkAuth);
  router.delete('/logout', authMiddleware.execute.bind(authMiddleware), userController.logout);

  return router;
}
