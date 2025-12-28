import { CommentEntity } from '../entities/comment.entity.js';
import { CreateCommentDto } from '../dto/index.js';

export interface ICommentModel {
  create(dto: CreateCommentDto, authorId: string, offerId: string): Promise<CommentEntity>;
  findById(id: string): Promise<CommentEntity | null>;
  findByOfferId(offerId: string, limit?: number): Promise<CommentEntity[]>;
  delete(id: string): Promise<void>;
  countByOfferId(offerId: string): Promise<number>;
  getAverageRatingByOfferId(offerId: string): Promise<number>;
}

export abstract class CommentModel implements ICommentModel {
  abstract create(dto: CreateCommentDto, authorId: string, offerId: string): Promise<CommentEntity>;
  abstract findById(id: string): Promise<CommentEntity | null>;
  abstract findByOfferId(offerId: string, limit?: number): Promise<CommentEntity[]>;
  abstract delete(id: string): Promise<void>;
  abstract countByOfferId(offerId: string): Promise<number>;
  abstract getAverageRatingByOfferId(offerId: string): Promise<number>;
}

