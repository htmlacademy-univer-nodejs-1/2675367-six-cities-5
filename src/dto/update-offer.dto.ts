import { City, HousingType, Amenity, Coordinates } from '../types/index.js';

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public city?: City;
  public previewImage?: string;
  public images?: [string, string, string, string, string, string];
  public isPremium?: boolean;
  public rating?: number;
  public housingType?: HousingType;
  public roomCount?: number;
  public guestCount?: number;
  public price?: number;
  public amenities?: Amenity[];
  public coordinates?: Coordinates;
}

