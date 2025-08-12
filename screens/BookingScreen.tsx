import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import DateSelector from '../components/DateSelector';
import { Room, Booking } from '../services/types';
import { postBooking } from '../services/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


// Navigation param list (include other screens if needed)
type RootStackParamList = {
  Booking: { room: Room };
  Confirmation: { booking: Booking };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Booking'>;

function diffDaysISO(startISO: string, endISO: string): number {
  const a = new Date(startISO);
  const b = new Date(endISO);
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((b.getTime() - a.getTime()) / msPerDay);
}

export default function BookingScreen({ route, navigation }: Props) {
  const { room } = route.params;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const today = new Date().toISOString().slice(0, 10);
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(today);
  const [guests, setGuests] = useState('1');
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    if (!name || !email || !checkIn || !checkOut) {
      Alert.alert('Missing info', 'Please fill all fields.');
      return;
    }

    const nights = diffDaysISO(checkIn, checkOut);
    if (nights <= 0) {
      Alert.alert('Invalid dates', 'Check-out must be after check-in.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        roomId: room.id,
        roomName: room.name,
        roomPrice: room.price,  
        name,
        email,
        checkIn,
        checkOut,
        guests: parseInt(guests, 10) || 1,
      };
      const result = await postBooking(payload);

      if (result.booking) {
        navigation.replace('Confirmation', { booking: result.booking });
      } else {
        Alert.alert('Booking failed', result.message || 'Unknown error');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to book');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      <ScrollView>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>Book — {room.name}</Text>
        <Text style={{ marginTop: 8, color: '#374151' }}>{room.description}</Text>

        <View style={{ marginTop: 12 }}>
          <Text style={{ marginBottom: 6 }}>Full name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            style={{ padding: 10, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 6 }}
          />
        </View>

        <View style={{ marginTop: 12 }}>
          <Text style={{ marginBottom: 6 }}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            style={{ padding: 10, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 6 }}
          />
        </View>

        <View style={{ marginTop: 12 }}>
          <Text style={{ marginBottom: 6 }}>Check-in</Text>
          <DateSelector value={checkIn} onChange={setCheckIn} />
        </View>

        <View style={{ marginTop: 12 }}>
          <Text style={{ marginBottom: 6 }}>Check-out</Text>
          <DateSelector value={checkOut} onChange={setCheckOut} />
        </View>

        <View style={{ marginTop: 12 }}>
          <Text style={{ marginBottom: 6 }}>Guests</Text>
          <TextInput
            value={guests}
            onChangeText={setGuests}
            keyboardType="number-pad"
            style={{ padding: 10, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 6 }}
          />
        </View>

        <View style={{ marginTop: 16 }}>
          <Text style={{ fontWeight: '700' }}>Price per night: ${room.price}</Text>
          <Text style={{ marginTop: 6 }}>Estimated nights: {Math.max(0, diffDaysISO(checkIn, checkOut))}</Text>
          <Text style={{ marginTop: 6, fontSize: 16, fontWeight: '600' }}>
            Estimated total: ${Math.max(0, diffDaysISO(checkIn, checkOut) * room.price)}
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            onPress={handleConfirm}
            style={{ backgroundColor: '#059669', padding: 12, borderRadius: 8, alignItems: 'center' }}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ color: '#fff', fontWeight: '700' }}>Confirm Booking</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
