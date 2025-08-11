const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(BOOKINGS_FILE)) fs.writeFileSync(BOOKINGS_FILE, '[]');

const ROOMS = [
  { id: 'r1', name: 'Deluxe King Room', price: 180, description: 'King bed, city view', image: 'https://picsum.photos/800/400?random=1' },
  { id: 'r2', name: 'Twin Standard Room', price: 120, description: 'Two single beds', image: 'https://picsum.photos/800/400?random=2' },
  { id: 'r3', name: 'Suite with Balcony', price: 280, description: 'Spacious suite', image: 'https://picsum.photos/800/400?random=3' },
];

function readBookings() {
  const raw = fs.readFileSync(BOOKINGS_FILE, 'utf8');
  try { return JSON.parse(raw); } catch (e) { return []; }
}
function writeBookings(arr) { fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(arr, null, 2)); }

app.get('/rooms', (req, res) => {
  res.json(ROOMS);
});

app.get('/bookings', (req, res) => {
  const bookings = readBookings();
  res.json(bookings);
});

function overlaps(aStart, aEnd, bStart, bEnd) {
  return !(aEnd <= bStart || bEnd <= aStart);
}

app.post('/book', (req, res) => {
  const { roomId, name, email, checkIn, checkOut, guests } = req.body;
  if (!roomId || !name || !email || !checkIn || !checkOut) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }
  const room = ROOMS.find(r => r.id === roomId);
  if (!room) return res.status(400).json({ success: false, message: 'Room not found' });

  const bookings = readBookings();
  const conflict = bookings.find(b => b.roomId === roomId && overlaps(b.checkIn, b.checkOut, checkIn, checkOut));
  if (conflict) return res.status(409).json({ success: false, message: 'Room is already booked for these dates' });

  const a = new Date(checkIn);
  const b = new Date(checkOut);
  const nights = Math.round((b - a) / (1000*60*60*24));
  const total = nights * room.price;

  const booking = {
    id: 'b-' + Date.now().toString(36),
    roomId,
    roomName: room.name,
    checkIn,
    checkOut,
    guests: guests || 1,
    name,
    email,
    nights,
    total,
    createdAt: new Date().toISOString(),
  };

  bookings.push(booking);
  writeBookings(bookings);

  res.json({ success: true, booking });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Backend running on http://localhost:' + PORT));
