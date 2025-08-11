const API_URL = process.env.EXPO_LOCAL_API || 'http://localhost:4000';

export async function fetchRooms() {
  const res = await fetch(`${API_URL}/rooms`);
  if (!res.ok) throw new Error('Failed to fetch rooms');
  return res.json();
}

export async function postBooking(payload: any) {
  const res = await fetch(`${API_URL}/book`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function fetchBookings() {
  const res = await fetch(`${API_URL}/bookings`);
  if (!res.ok) throw new Error('Failed to fetch bookings');
  return res.json();
}
