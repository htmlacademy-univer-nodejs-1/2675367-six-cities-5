export class CommentEntity {
  public id?: string;
  public text: string;
  public publicationDate: Date;
  public rating: number;
  public authorId: string;
  public offerId: string;

  constructor(data: CommentEntity) {
    this.id = data.id;
    this.text = data.text;
    this.publicationDate = data.publicationDate;
    this.rating = data.rating;
    this.authorId = data.authorId;
    this.offerId = data.offerId;
  }

  public toObject() {
    return {
      id: this.id,
      text: this.text,
      publicationDate: this.publicationDate,
      rating: this.rating,
      authorId: this.authorId,
      offerId: this.offerId,
    };
  }
}

