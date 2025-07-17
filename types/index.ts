export interface Location {
  latitude: number;
  longitude: number;
}

export interface Driver {
  id: string;
  name: string;
  rating: number;
  vehicle: {
    make: string;
    model: string;
    color: string;
    licensePlate: string;
  };
  location: Location;
  eta: number; // in minutes
  profileImage?: string;
}

export interface RideRequest {
  id: string;
  pickup: Location;
  destination?: Location;
  status: RideStatus;
  driver?: Driver;
  estimatedFare?: number;
  createdAt: Date;
}

export type RideStatus = 'IDLE' | 'SEARCHING' | 'DRIVER_FOUND' | 'IN_RIDE' | 'COMPLETED' | 'CANCELLED';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isVerified: boolean;
  university?: string;
}

export interface NavigationParams {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  FindingDriver: { rideRequest: RideRequest };
  DriverFound: { rideRequest: RideRequest; driver: Driver };
  RideInProgress: { rideRequest: RideRequest; driver: Driver };
}