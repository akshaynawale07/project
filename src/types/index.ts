export type UserRole = 'admin' | 'resident' | 'tourist';

export interface User {
  id: string;
  role: UserRole;
  name: string;
  preferences: {
    darkMode: boolean;
    language: string;
    favoriteLocations: string[];
    notifications: {
      weather: boolean;
      traffic: boolean;
      events: boolean;
      airQuality: boolean;
    };
  };
  gamification: {
    points: number;
    badges: string[];
    level: number;
    ecoActions: {
      publicTransport: number;
      recycling: number;
      energySaving: number;
    };
  };
}

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

export interface AirQualityData {
  aqi: number;
  pollutants: {
    pm25: number;
    pm10: number;
    no2: number;
  };
}

export interface TrafficData {
  congestionLevel: number;
  incidents: Array<{
    id: string;
    type: string;
    location: [number, number];
    description: string;
  }>;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: {
    name: string;
    coordinates: [number, number];
  };
  category: string;
  attendees: number;
  rsvpStatus?: 'going' | 'maybe' | 'not-going';
  isBookmarked?: boolean;
}

export interface MapFilter {
  id: string;
  name: string;
  category: 'landmark' | 'parking' | 'transport' | 'eco' | 'tourist';
  isActive: boolean;
}

export interface MapPoint {
  id: string;
  name: string;
  description: string;
  category: MapFilter['category'];
  coordinates: [number, number];
  icon?: string;
}