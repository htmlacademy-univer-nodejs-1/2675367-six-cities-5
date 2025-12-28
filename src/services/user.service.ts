import { UserEntity } from '../entities/user.entity.js';
import { CreateUserDto, UpdateUserDto } from '../dto/index.js';
import { IUserModel } from '../models/index.js';

export class UserService {
  constructor(private readonly userModel: IUserModel) {}

  public async create(dto: CreateUserDto): Promise<UserEntity> {
    return this.userModel.create(dto);
  }

  public async findById(id: string): Promise<UserEntity | null> {
    return this.userModel.findById(id);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userModel.findByEmail(email);
  }

  public async update(id: string, dto: UpdateUserDto): Promise<UserEntity | null> {
    return this.userModel.update(id, dto);
  }

  public async delete(id: string): Promise<void> {
    return this.userModel.delete(id);
  }
}

