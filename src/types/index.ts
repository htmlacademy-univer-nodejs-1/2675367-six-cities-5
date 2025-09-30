export type City = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';

export type HousingType = 'apartment' | 'house' | 'room' | 'hotel';

export type UserType = 'regular' | 'pro';

export type Amenity = 'Breakfast' | 'Air conditioning' | 'Laptop friendly workspace' | 'Baby seat' | 'Washer' | 'Towels' | 'Fridge';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  userType: UserType;
}

export interface RentalOffer {
  title: string;
  description: string;
  publicationDate: Date;
  city: City;
  previewImage: string;
  images: [string, string, string, string, string, string]; // Always 6 photos
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

export interface Comment {
  text: string;
  publicationDate: Date;
  rating: number;
  author: User;
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

export const CITIES_COORDINATES: Record<City, Coordinates> = {
  'Paris': { latitude: 48.85661, longitude: 2.351499 },
  'Cologne': { latitude: 50.938361, longitude: 6.959974 },
  'Brussels': { latitude: 50.846557, longitude: 4.351697 },
  'Amsterdam': { latitude: 52.370216, longitude: 4.895168 },
  'Hamburg': { latitude: 53.550341, longitude: 10.000654 },
  'Dusseldorf': { latitude: 51.225402, longitude: 6.776314 }
};
