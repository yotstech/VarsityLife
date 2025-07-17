import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

const STORAGE_KEY = '@varlife_user';

class AuthService {
  async login(email: string, password: string): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    if (!email.includes('@')) {
      throw new Error('Please enter a valid email address');
    }

    // Mock user data
    const user: User = {
      id: 'user_123',
      name: 'John Doe',
      email,
      phone: '+27 12 345 6789',
      isVerified: email.includes('ump.ac.za') || email.includes('edu'),
      university: email.includes('ump.ac.za') ? 'University of Mpumalanga' : undefined,
    };

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  }

  async signup(userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock validation
    if (!userData.name || !userData.email || !userData.phone || !userData.password) {
      throw new Error('All fields are required');
    }

    if (!userData.email.includes('@')) {
      throw new Error('Please enter a valid email address');
    }

    const user: User = {
      id: `user_${Date.now()}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      isVerified: userData.email.includes('ump.ac.za') || userData.email.includes('edu'),
      university: userData.email.includes('ump.ac.za') ? 'University of Mpumalanga' : undefined,
    };

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
}

export const authService = new AuthService();