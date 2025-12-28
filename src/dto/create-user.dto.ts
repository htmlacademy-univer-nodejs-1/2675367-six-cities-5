import { IsEmail, IsEnum, IsOptional, IsString, Length, Matches } from 'class-validator';
import { UserType } from '../types/index.js';

export class CreateUserDto {
  @IsString()
  @Length(1, 15, { message: 'Name must be between 1 and 15 characters' })
  public name!: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  public email!: string;

  @IsOptional()
  @IsString()
  public avatar?: string;

  @IsString()
  @Length(6, 12, { message: 'Password must be between 6 and 12 characters' })
  public password!: string;

  @IsEnum(UserType, { message: 'UserType must be either ordinary or pro' })
  public userType!: UserType;
}

