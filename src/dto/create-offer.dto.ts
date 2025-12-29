import { IsString, MinLength, MaxLength, IsEnum, IsBoolean, IsNumber, Min, Max, IsArray, ArrayMinSize, ArrayMaxSize, ValidateNested, IsUrl, Type } from 'class-validator';
import { City, HousingType, Amenity, Coordinates } from '../types/index.js';

export class CreateOfferDto {
  @IsString()
  @MinLength(10, { message: 'Title must be at least 10 characters' })
  @MaxLength(100, { message: 'Title must not exceed 100 characters' })
  public title!: string;

  @IsString()
  @MinLength(20, { message: 'Description must be at least 20 characters' })
  @MaxLength(1024, { message: 'Description must not exceed 1024 characters' })
  public description!: string;

  @IsEnum(City)
  public city!: City;

  @IsUrl()
  public previewImage!: string;

  @IsArray()
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  public images!: [string, string, string, string, string, string];

  @IsBoolean()
  public isPremium!: boolean;

  @IsNumber()
  @Min(1)
  @Max(5)
  public rating!: number;

  @IsEnum(HousingType)
  public housingType!: HousingType;

  @IsNumber()
  @Min(1)
  @Max(8)
  public roomCount!: number;

  @IsNumber()
  @Min(1)
  @Max(10)
  public guestCount!: number;

  @IsNumber()
  @Min(100)
  @Max(100000)
  public price!: number;

  @IsArray()
  @ArrayMinSize(1)
  public amenities!: Amenity[];

  @ValidateNested()
  @Type(() => Object)
  public coordinates!: Coordinates;
}
