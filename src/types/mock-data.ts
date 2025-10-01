export interface MockServerOfferSeed {
  title: string;
  description: string;
  city: 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';
  previewImage: string;
  images: [string, string, string, string, string, string];
  isPremium: boolean;
  rating: number;
  housingType: 'apartment' | 'house' | 'room' | 'hotel';
  roomCount: number;
  guestCount: number;
  price: number;
  amenities: string[];
  authorName: string;
  authorEmail: string;
  authorAvatar: string;
  userType: 'regular' | 'pro';
  latitude: number;
  longitude: number;
}
