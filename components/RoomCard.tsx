import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

interface RoomCardProps {
  room: Room;
  onBook: () => void;
}

export default function RoomCard({ room, onBook }: RoomCardProps) {
  return (
    <View style={styles.card}>
      {room.image && <Image source={{ uri: room.image }} style={styles.image} />}
      <View style={styles.content}>
        <Text style={styles.title}>{room.name}</Text>
        <Text style={styles.description}>{room.description}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>${room.price}/night</Text>
          <TouchableOpacity onPress={onBook} style={styles.bookButton}>
            <Text style={styles.bookText}>Book</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 12, backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden', elevation: 1 },
  image: { height: 160, width: '100%' },
  content: { padding: 12 },
  title: { fontSize: 18, fontWeight: '600' },
  description: { marginTop: 6, color: '#666' },
  footer: { marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontWeight: '700' },
  bookButton: { backgroundColor: '#2563eb', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 },
  bookText: { color: '#fff' },
});
