import { IsString, MinLength, MaxLength, IsEnum, IsBoolean, IsNumber, Min, Max, IsArray, ArrayMinSize, ArrayMaxSize, ValidateNested, IsUrl, IsOptional, Type } from 'class-validator';
import { City, HousingType, Amenity, Coordinates } from '../types/index.js';

export class UpdateOfferDto {
  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'Title must be at least 10 characters' })
  @MaxLength(100, { message: 'Title must not exceed 100 characters' })
  public title?: string;

  @IsOptional()
  @IsString()
  @MinLength(20, { message: 'Description must be at least 20 characters' })
  @MaxLength(1024, { message: 'Description must not exceed 1024 characters' })
  public description?: string;

  @IsOptional()
  @IsEnum(City)
  public city?: City;

  @IsOptional()
  @IsUrl()
  public previewImage?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  public images?: [string, string, string, string, string, string];

  @IsOptional()
  @IsBoolean()
  public isPremium?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  public rating?: number;

  @IsOptional()
  @IsEnum(HousingType)
  public housingType?: HousingType;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(8)
  public roomCount?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  public guestCount?: number;

  @IsOptional()
  @IsNumber()
  @Min(100)
  @Max(100000)
  public price?: number;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  public amenities?: Amenity[];

  @IsOptional()
  @ValidateNested()
  @Type(() => Object)
  public coordinates?: Coordinates;
}

