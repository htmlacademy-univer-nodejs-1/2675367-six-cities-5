import { UserType } from '../types/index.js';

export class UserEntity {
  public id?: string;
  public name: string;
  public email: string;
  public avatar?: string;
  public passwordHash: string;
  public userType: UserType;

  constructor(data: UserEntity) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.avatar = data.avatar;
    this.passwordHash = data.passwordHash;
    this.userType = data.userType;
  }

  public toObject() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      avatar: this.avatar,
      userType: this.userType,
    };
  }
}

