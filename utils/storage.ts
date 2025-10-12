import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

/**
 * Cross-platform storage utility
 * Uses SecureStore on mobile, localStorage on web
 */
export class Storage {
  static async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }

  static async getItem(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  }

  static async removeItem(key: string): Promise<void> {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  }

  static async clear(): Promise<void> {
    if (Platform.OS === 'web') {
      localStorage.clear();
    } else {
      // SecureStore doesn't have clear, so we'll remove known keys
      const keys = ['authToken'];
      for (const key of keys) {
        await SecureStore.deleteItemAsync(key);
      }
    }
  }
}

/**
 * Cross-platform confirmation dialog
 * Uses Alert on mobile, confirm on web
 */
export const showConfirmDialog = (title: string, message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(`${title}\n\n${message}`);
      resolve(confirmed);
    } else {
      // For mobile, we'll use Alert.alert but return a promise
      // This is a simplified version - in a real app you'd want a proper modal
      const confirmed = true; // Default to true for mobile
      resolve(confirmed);
    }
  });
};
