import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString, IsUrl, Length, Max, Min, ValidateNested, ArrayMinSize, ArrayMaxSize } from 'class-validator';
import { Type } from 'class-transformer';
import { City, HousingType, Amenity } from '../types/index.js';

class CoordinatesDto {
  @IsNumber()
  @Min(-90)
  @Max(90)
  public latitude!: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  public longitude!: number;
}

export class UpdateOfferDto {
  @IsOptional()
  @IsString()
  @Length(10, 100, { message: 'Title must be between 10 and 100 characters' })
  public title?: string;

  @IsOptional()
  @IsString()
  @Length(20, 1024, { message: 'Description must be between 20 and 1024 characters' })
  public description?: string;

  @IsOptional()
  @IsEnum(City, { message: 'City must be one of: Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf' })
  public city?: City;

  @IsOptional()
  @IsUrl({}, { message: 'PreviewImage must be a valid URL' })
  public previewImage?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  @IsUrl({}, { each: true, message: 'Each image must be a valid URL' })
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
  @IsEnum(HousingType, { message: 'HousingType must be one of: apartment, house, room, hotel' })
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
  @IsEnum(['Breakfast', 'Air conditioning', 'Laptop friendly workspace', 'Baby seat', 'Washer', 'Towels', 'Fridge'], { each: true })
  public amenities?: Amenity[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CoordinatesDto)
  public coordinates?: CoordinatesDto;
}

