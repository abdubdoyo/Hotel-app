import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, ActivityIndicator, FlatList, Button } from 'react-native';
import RoomCard from '../components/RoomCard';
import { fetchRooms } from '../services/api';

export default function HomeScreen({ navigation }: any) {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchRooms();
        if (mounted) setRooms(data);
      } catch (e: any) {
        setError(e.message || 'Could not load rooms. Is backend running at http://localhost:4000?');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
      <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>Ebisa Hotel</Text>
        <Button title="Admin" onPress={() => navigation.navigate('Admin')} />
      </View>

      <View style={{ paddingHorizontal: 16, paddingBottom: 12 }}>
        {loading ? <ActivityIndicator /> : error ? (
          <View style={{ padding: 12, backgroundColor: '#fee2e2', borderRadius: 8 }}>
            <Text style={{ color: '#b91c1c' }}>{error}</Text>
            <Text style={{ marginTop: 6, color: '#374151' }}>
              Quick tips: run the backend with `node backend/server.js` and ensure CORS is enabled.
            </Text>
          </View>
        ) : (
          <FlatList
            data={rooms}
            keyExtractor={(r) => r.id}
            renderItem={({ item }) => <RoomCard room={item} onBook={() => navigation.navigate('Booking', { room: item })} />}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            contentContainerStyle={{ paddingTop: 8, paddingBottom: 48, paddingHorizontal: 8 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
