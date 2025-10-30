import { getModelForClass, prop, modelOptions, Ref } from '@typegoose/typegoose';
import { City, HousingType, Amenity } from '../../types/index.js';
import { UserEntity } from './user.entity.js';

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true
  }
})
export class OfferEntity {
  @prop({ required: true, trim: true })
  public title!: string;

  @prop({ required: true, trim: true })
  public description!: string;

  @prop({ required: true })
  public publicationDate!: Date;

  @prop({ required: true, enum: ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] })
  public city!: City;

  @prop({ required: true })
  public previewImage!: string;

  @prop({ required: true, type: () => [String] })
  public images!: [string, string, string, string, string, string];

  @prop({ required: true, default: false })
  public isPremium!: boolean;

  @prop({ required: true, default: false })
  public isFavorite!: boolean;

  @prop({ required: true, min: 1, max: 5, default: 1 })
  public rating!: number;

  @prop({ required: true, enum: ['apartment', 'house', 'room', 'hotel'] })
  public housingType!: HousingType;

  @prop({ required: true, min: 1 })
  public roomCount!: number;

  @prop({ required: true, min: 1 })
  public guestCount!: number;

  @prop({ required: true, min: 100 })
  public price!: number;

  @prop({ required: true, type: () => [String] })
  public amenities!: Amenity[];

  @prop({ required: true, ref: () => UserEntity })
  public author!: Ref<UserEntity>;

  @prop({ required: true, default: 0 })
  public commentCount!: number;

  @prop({ required: true })
  public coordinates!: {
    latitude: number;
    longitude: number;
  };

  public createdAt?: Date;
  public updatedAt?: Date;
}

export const OfferModel = getModelForClass(OfferEntity);

