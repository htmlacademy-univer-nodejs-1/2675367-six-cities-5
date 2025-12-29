import { Router } from 'express';
import { UserController } from '../controllers/index.js';
import { ValidateObjectIdMiddleware, UploadMiddleware } from '../middleware/index.js';
import { Config } from '../config/config.js';

export function createUserRouter(userController: UserController): Router {
  const router = Router();
  const uploadMiddleware = new UploadMiddleware(Config.UPLOAD_DIR);
  const validateObjectId = new ValidateObjectIdMiddleware('userId');

  router.post('/register', userController.register);
  router.post('/login', userController.login);
  router.get('/login', authMiddleware.execute.bind(authMiddleware), userController.checkAuth);
  router.delete('/logout', userController.logout);

  router.post('/:userId/avatar', validateObjectId.execute.bind(validateObjectId), uploadMiddleware.single('avatar'), userController.uploadAvatar);

  return router;
}
