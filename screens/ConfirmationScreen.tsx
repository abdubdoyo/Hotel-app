import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';

export default function ConfirmationScreen({ route, navigation }: any) {
  const { booking } = route.params;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', padding: 16, justifyContent: 'center' }}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 22, fontWeight: '700' }}>Booking Confirmed!</Text>
        <Text style={{ marginTop: 8 }}>{booking.name}, your reservation is set.</Text>

        <View style={{ marginTop: 12, backgroundColor: '#f3f4f6', padding: 12, borderRadius: 8, width: '100%' }}>
          <Text style={{ fontWeight: '700' }}>{booking.roomName}</Text>
          <Text style={{ marginTop: 6 }}>{booking.checkIn} → {booking.checkOut} ({booking.nights} nights)</Text>
          <Text style={{ marginTop: 6 }}>Guests: {booking.guests}</Text>
          <Text style={{ marginTop: 6, fontWeight: '700' }}>Total: ${booking.total}</Text>
          <Text style={{ marginTop: 6, fontSize: 12, color: '#6b7280' }}>ID: {booking.id}</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginTop: 20, backgroundColor: '#2563eb', padding: 10, borderRadius: 8 }}>
          <Text style={{ color: '#fff' }}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
