import { Router } from 'express';
import { CommentController } from '../controllers/index.js';
import { ValidateObjectIdMiddleware, ValidateDtoMiddleware } from '../middleware/index.js';
import { CreateCommentDto } from '../dto/index.js';

export function createCommentRouter(commentController: CommentController): Router {
  const router = Router();

  const validateOfferId = new ValidateObjectIdMiddleware('offerId');
  const validateCreateComment = new ValidateDtoMiddleware(CreateCommentDto);

  router.get(
    '/:offerId/comments',
    validateOfferId.execute.bind(validateOfferId),
    commentController.index
  );

  router.post(
    '/:offerId/comments',
    validateOfferId.execute.bind(validateOfferId),
    validateCreateComment.execute.bind(validateCreateComment),
    commentController.create
  );

  return router;
}

