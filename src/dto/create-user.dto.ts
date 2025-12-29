import { IsString, MinLength, MaxLength, IsEmail, IsOptional, IsEnum, Matches } from 'class-validator';
import { UserType } from '../types/index.js';

export class CreateUserDto {
  @IsString()
  @MinLength(1, { message: 'Name must be at least 1 character' })
  @MaxLength(15, { message: 'Name must not exceed 15 characters' })
  public name!: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  public email!: string;

  @IsOptional()
  @IsString()
  public avatar?: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(12, { message: 'Password must not exceed 12 characters' })
  public password!: string;

  @IsEnum(UserType)
  public userType!: UserType;
}
