import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, ActivityIndicator, Button } from 'react-native';
import { fetchBookings } from '../services/api';

export default function AdminScreen({ navigation }: any) {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBookings(); // Will grab token from localStorage if not passed
      setBookings(data);
    } catch (e: any) {
      setError(e.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>Admin — Bookings</Text>
        <Button title="Refresh" onPress={loadBookings} />
      </View>

      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} />
      ) : error ? (
        <View style={{ padding: 16 }}>
          <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>
          {error.includes('Unauthorized') && (
            <Button title="Go to Admin Login" onPress={() => navigation.navigate('AdminLogin')} />
          )}
        </View>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(b) => b._id} // Use MongoDB's _id field
          renderItem={({ item }) => (
            <View style={{ backgroundColor: '#fff', marginBottom: 10, padding: 12, borderRadius: 8, marginHorizontal: 16 }}>
              <Text style={{ fontWeight: '700' }}>{item.roomName}</Text>
              <Text style={{ marginTop: 6 }}>{item.checkIn} → {item.checkOut} ({item.nights} nights)</Text>
              <Text style={{ marginTop: 6 }}>{item.name} • {item.email}</Text>
              <Text style={{ marginTop: 6, fontWeight: '700' }}>${item.total}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
    </SafeAreaView>
  );
}
