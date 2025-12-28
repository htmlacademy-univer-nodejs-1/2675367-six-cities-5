export enum UserType {
  Ordinary = 'ordinary',
  Pro = 'pro'
}

export type City = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';

export type HousingType = 'apartment' | 'house' | 'room' | 'hotel';

export type Amenity = 'Breakfast' | 'Air conditioning' | 'Laptop friendly workspace' | 'Baby seat' | 'Washer' | 'Towels' | 'Fridge';

export interface User {
  name: string;
  email: string;
  avatar: string;
  password: string;
  userType: UserType;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface RentalOffer {
  title: string;
  description: string;
  publicationDate: Date;
  city: City;
  previewImage: string;
  images: [string, string, string, string, string, string];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: HousingType;
  roomCount: number;
  guestCount: number;
  price: number;
  amenities: Amenity[];
  author: User;
  commentCount: number;
  coordinates: Coordinates;
}

export interface MockOffer {
  title: string;
  description: string;
  city: City;
  previewImage: string;
  images: [string, string, string, string, string, string];
  isPremium: boolean;
  rating: number;
  housingType: HousingType;
  roomCount: number;
  guestCount: number;
  price: number;
  amenities: Amenity[];
  authorName: string;
  authorEmail: string;
  authorAvatar: string;
  userType: UserType;
  latitude: number;
  longitude: number;
}

