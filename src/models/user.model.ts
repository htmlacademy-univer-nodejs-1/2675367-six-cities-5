import { UserEntity } from '../entities/user.entity.js';
import { CreateUserDto, UpdateUserDto } from '../dto/index.js';

export interface IUserModel {
  create(dto: CreateUserDto): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  update(id: string, dto: UpdateUserDto): Promise<UserEntity | null>;
  delete(id: string): Promise<void>;
}

export abstract class UserModel implements IUserModel {
  abstract create(dto: CreateUserDto): Promise<UserEntity>;
  abstract findById(id: string): Promise<UserEntity | null>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract update(id: string, dto: UpdateUserDto): Promise<UserEntity | null>;
  abstract delete(id: string): Promise<void>;
}

