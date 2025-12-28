import { getModelForClass, prop, modelOptions } from '@typegoose/typegoose';
import { UserType } from '../../types/index.js';

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true
  }
})
export class UserEntity {
  @prop({ required: true, trim: true })
  public name!: string;

  @prop({ required: true, unique: true, lowercase: true, trim: true })
  public email!: string;

  @prop({ trim: true })
  public avatar?: string;

  @prop({ required: true })
  public password!: string;

  @prop({ required: true, enum: ['regular', 'pro'], default: 'regular' })
  public userType!: UserType;

  public createdAt?: Date;
  public updatedAt?: Date;
}

export const UserModel = getModelForClass(UserEntity);

