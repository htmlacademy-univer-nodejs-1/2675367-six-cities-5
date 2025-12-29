import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Controller } from '../core/controller/controller.js';
import { CreateCommentDto } from '../dto/index.js';
import { CommentService } from '../services/index.js';

export class CommentController extends Controller {
  constructor(private readonly commentService: CommentService) {
    super();
  }

  public index = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { offerId } = req.params;
    const comments = await this.commentService.findByOfferId(offerId);
    this.ok(res, {
      data: comments.map((comment) => comment.toObject()),
    });
  });

  public create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { offerId } = req.params;
    const dto = req.body as CreateCommentDto;
    const authorId = 'mock-author-id';
    const comment = await this.commentService.create(dto, authorId, offerId);
    this.created(res, { data: comment.toObject() });
  });
}

