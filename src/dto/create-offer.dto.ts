import { IsArray, IsBoolean, IsEnum, IsNumber, IsString, IsUrl, Length, Max, Min, ValidateNested, ArrayMinSize, ArrayMaxSize } from 'class-validator';
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

export class CreateOfferDto {
  @IsString()
  @Length(10, 100, { message: 'Title must be between 10 and 100 characters' })
  public title!: string;

  @IsString()
  @Length(20, 1024, { message: 'Description must be between 20 and 1024 characters' })
  public description!: string;

  @IsEnum(City, { message: 'City must be one of: Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf' })
  public city!: City;

  @IsUrl({}, { message: 'PreviewImage must be a valid URL' })
  public previewImage!: string;

  @IsArray()
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  @IsUrl({}, { each: true, message: 'Each image must be a valid URL' })
  public images!: [string, string, string, string, string, string];

  @IsBoolean()
  public isPremium!: boolean;

  @IsNumber()
  @Min(1)
  @Max(5)
  public rating!: number;

  @IsEnum(HousingType, { message: 'HousingType must be one of: apartment, house, room, hotel' })
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
  @IsEnum(['Breakfast', 'Air conditioning', 'Laptop friendly workspace', 'Baby seat', 'Washer', 'Towels', 'Fridge'], { each: true })
  public amenities!: Amenity[];

  @ValidateNested()
  @Type(() => CoordinatesDto)
  public coordinates!: CoordinatesDto;
}

