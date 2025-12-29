import { Router } from 'express';
import { CommentController } from '../controllers/index.js';
import { ValidateObjectIdMiddleware, ValidateDtoMiddleware, AuthMiddleware } from '../middleware/index.js';
import { CreateCommentDto } from '../dto/index.js';

export function createCommentRouter(commentController: CommentController): Router {
  const router = Router();

  const validateOfferId = new ValidateObjectIdMiddleware('offerId');
  const validateCreateComment = new ValidateDtoMiddleware(CreateCommentDto);
  const authMiddleware = new AuthMiddleware();

  router.get(
    '/:offerId/comments',
    validateOfferId.execute.bind(validateOfferId),
    commentController.index
  );

  router.post(
    '/:offerId/comments',
    validateOfferId.execute.bind(validateOfferId),
    authMiddleware.execute.bind(authMiddleware),
    validateCreateComment.execute.bind(validateCreateComment),
    commentController.create
  );

  return router;
}

