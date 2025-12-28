import { injectable } from 'inversify';
import { UserModel, UserEntity } from '../../models/index.js';
import { IUserService } from './user-service.interface.js';

@injectable()
export class UserService implements IUserService {
  public async findById(userId: string): Promise<UserEntity | null> {
    return UserModel.findById(userId).exec();
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    return UserModel.findOne({ email }).exec();
  }

  public async create(userData: Partial<UserEntity>): Promise<UserEntity> {
    const user = await UserModel.create(userData);
    return user;
  }
}

