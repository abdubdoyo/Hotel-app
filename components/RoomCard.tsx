import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
export default function RoomCard({ room, onBook }: { room: any; onBook: () => void }) {
  return (
    <View style={{ flex: 1, margin: 6, backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden', elevation: 1 }}>
      {room.image ? <Image source={{ uri: room.image }} style={{ height: 100, width: '100%' }} /> : null}
      <View style={{ padding: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: '600' }}>{room.name}</Text>
        <Text numberOfLines={2} style={{ color: '#666', fontSize: 12 }}>{room.description}</Text>
        <View style={{ marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontWeight: '700', fontSize: 12 }}>${room.price}</Text>
          <TouchableOpacity onPress={onBook} style={{ backgroundColor: '#2563eb', paddingVertical: 6, paddingHorizontal: 8, borderRadius: 6 }}>
            <Text style={{ color: '#fff', fontSize: 12 }}>Book</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}