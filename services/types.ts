export interface Room {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface Booking {
  id: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  name: string;
  email: string;
  nights: number;
  total: number;
  createdAt: string;
}