import { Room, Booking } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_LOCAL_API || 'http://192.168.2.13:5000';

export async function fetchRooms(): Promise<Room[]> {
  const res = await fetch(`${API_URL}/api/rooms`);
  if (!res.ok) throw new Error('Failed to fetch rooms');
  return res.json();
}

export async function postBooking(payload: Omit<Booking, 'id' | 'createdAt' | 'nights' | 'total' | 'roomName'> & { roomId: string; name: string; email: string }): Promise<{ success: boolean; booking?: Booking; message?: string }> {
  const res = await fetch(`${API_URL}/api/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function postAdminLogin(email: string, password: string): Promise<{ success: boolean; token?: string; message?: string }> {
  const res = await fetch(`${API_URL}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function fetchBookings() {
  try {
    const token = await AsyncStorage.getItem('adminToken');
    if (!token) throw new Error('No admin token — please log in');

    const res = await fetch(`${API_URL}/api/bookings`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        throw new Error('Unauthorized — Admin login required');
      }
      throw new Error('Failed to fetch bookings');
    }

    return res.json();
  } catch (err) {
    console.error('fetchBookings error:', err);
    throw err;
  }
}
