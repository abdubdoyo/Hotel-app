import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { fetchBookings } from '../services/api';

export default function AdminScreen() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchBookings();
        if (mounted) setBookings(data);
      } catch (e: any) {
        if (mounted) setError(e.message || 'Failed to load bookings');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>Client — Bookings</Text>
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        {loading ? <ActivityIndicator /> : error ? <Text style={{ color: 'red' }}>{error}</Text> : (
          <FlatList
            data={bookings}
            keyExtractor={(b) => b.id}
            renderItem={({ item }) => (
              <View style={{ backgroundColor: '#fff', marginBottom: 10, padding: 12, borderRadius: 8 }}>
                <Text style={{ fontWeight: '700' }}>{item.roomName}</Text>
                <Text style={{ marginTop: 6 }}>{item.checkIn} → {item.checkOut} ({item.nights} nights)</Text>
                <Text style={{ marginTop: 6 }}>{item.name} • {item.email}</Text>
                <Text style={{ marginTop: 6, fontWeight: '700' }}>${item.total}</Text>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
