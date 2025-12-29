import { CommentEntity } from '../entities/comment.entity.js';
import { CreateCommentDto } from '../dto/index.js';
import { ICommentModel } from '../models/index.js';
import { OfferService } from './offer.service.js';

export class CommentService {
  constructor(
    private readonly commentModel: ICommentModel,
    private readonly offerService: OfferService
  ) {}

  public async create(
    dto: CreateCommentDto,
    authorId: string,
    offerId: string
  ): Promise<CommentEntity> {
    // Проверяем существование предложения
    const offerExists = await this.offerService.exists(offerId);
    if (!offerExists) {
      throw new Error(`Offer with id ${offerId} not found`);
    }

    // Создаем комментарий
    const comment = await this.commentModel.create(dto, authorId, offerId);

    // Обновляем количество комментариев для предложения
    await this.offerService.refreshCommentCount(offerId);

    // Обновляем рейтинг предложения на основе всех комментариев
    await this.offerService.updateRating(offerId);

    return comment;
  }

  public async findById(id: string): Promise<CommentEntity | null> {
    return this.commentModel.findById(id);
  }

  public async findByOfferId(offerId: string, limit = 50): Promise<CommentEntity[]> {
    return this.commentModel.findByOfferId(offerId, limit);
  }

  public async delete(id: string): Promise<void> {
    const comment = await this.commentModel.findById(id);

    if (comment) {
      const offerId = comment.offerId;

      // Удаляем комментарий
      await this.commentModel.delete(id);

      // Обновляем количество комментариев для предложения
      await this.offerService.refreshCommentCount(offerId);

      // Обновляем рейтинг предложения на основе оставшихся комментариев
      await this.offerService.updateRating(offerId);
    }
  }

  public async countByOfferId(offerId: string): Promise<number> {
    return this.commentModel.countByOfferId(offerId);
  }

  public async getAverageRatingByOfferId(offerId: string): Promise<number> {
    return this.commentModel.getAverageRatingByOfferId(offerId);
  }
}

