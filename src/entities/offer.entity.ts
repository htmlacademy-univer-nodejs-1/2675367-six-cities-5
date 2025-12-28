import { City, HousingType, Amenity, Coordinates } from '../types/index.js';

export class OfferEntity {
  public id?: string;
  public title: string;
  public description: string;
  public publicationDate: Date;
  public city: City;
  public previewImage: string;
  public images: [string, string, string, string, string, string];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public housingType: HousingType;
  public roomCount: number;
  public guestCount: number;
  public price: number;
  public amenities: Amenity[];
  public authorId: string;
  public commentCount: number;
  public coordinates: Coordinates;

  constructor(data: OfferEntity) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.publicationDate = data.publicationDate;
    this.city = data.city;
    this.previewImage = data.previewImage;
    this.images = data.images;
    this.isPremium = data.isPremium;
    this.isFavorite = data.isFavorite;
    this.rating = data.rating;
    this.housingType = data.housingType;
    this.roomCount = data.roomCount;
    this.guestCount = data.guestCount;
    this.price = data.price;
    this.amenities = data.amenities;
    this.authorId = data.authorId;
    this.commentCount = data.commentCount;
    this.coordinates = data.coordinates;
  }

  public toObject() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      publicationDate: this.publicationDate,
      city: this.city,
      previewImage: this.previewImage,
      images: this.images,
      isPremium: this.isPremium,
      isFavorite: this.isFavorite,
      rating: this.rating,
      housingType: this.housingType,
      roomCount: this.roomCount,
      guestCount: this.guestCount,
      price: this.price,
      amenities: this.amenities,
      authorId: this.authorId,
      commentCount: this.commentCount,
      coordinates: this.coordinates,
    };
  }
}

