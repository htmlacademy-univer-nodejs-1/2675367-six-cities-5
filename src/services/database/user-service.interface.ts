import { UserEntity } from '../../models/index.js';

export interface IUserService {
  findById(userId: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  create(userData: Partial<UserEntity>): Promise<UserEntity>;
}

