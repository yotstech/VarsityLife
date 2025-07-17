import { Driver, Location } from '../types';

// Mock drivers around Nelspruit/Mbombela area
const MOCK_DRIVERS: Driver[] = [
  {
    id: 'driver_1',
    name: 'Thabo Mthembu',
    rating: 4.8,
    vehicle: {
      make: 'Toyota',
      model: 'Corolla',
      color: 'White',
      licensePlate: 'MP 123 ABC',
    },
    location: {
      latitude: -25.4703,
      longitude: 30.9748,
    },
    eta: 5,
  },
  {
    id: 'driver_2',
    name: 'Sarah Nkomo',
    rating: 4.9,
    vehicle: {
      make: 'Nissan',
      model: 'Almera',
      color: 'Silver',
      licensePlate: 'MP 456 DEF',
    },
    location: {
      latitude: -25.4803,
      longitude: 30.9648,
    },
    eta: 3,
  },
  {
    id: 'driver_3',
    name: 'John Mahlangu',
    rating: 4.7,
    vehicle: {
      make: 'Volkswagen',
      model: 'Polo',
      color: 'Blue',
      licensePlate: 'MP 789 GHI',
    },
    location: {
      latitude: -25.4653,
      longitude: 30.9798,
    },
    eta: 7,
  },
];

class MockDriverService {
  async findNearbyDriver(userLocation: Location): Promise<Driver | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find closest driver (simplified distance calculation)
    const driversWithDistance = MOCK_DRIVERS.map(driver => ({
      ...driver,
      distance: this.calculateDistance(userLocation, driver.location),
    }));

    const sortedDrivers = driversWithDistance
      .filter(driver => driver.distance < 10) // Within 10km
      .sort((a, b) => a.distance - b.distance);

    if (sortedDrivers.length === 0) {
      return null;
    }

    const selectedDriver = sortedDrivers[0];
    
    // Update ETA based on distance
    selectedDriver.eta = Math.max(2, Math.ceil(selectedDriver.distance * 2));

    return selectedDriver;
  }

  getAllDrivers(): Driver[] {
    return MOCK_DRIVERS;
  }

  private calculateDistance(loc1: Location, loc2: Location): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.deg2rad(loc2.latitude - loc1.latitude);
    const dLon = this.deg2rad(loc2.longitude - loc1.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(loc1.latitude)) *
        Math.cos(this.deg2rad(loc2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}

export const mockDriverService = new MockDriverService();