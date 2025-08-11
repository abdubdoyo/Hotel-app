import React from 'react';
import { Platform, TextInput } from 'react-native';

export default function DateSelector({ value, onChange }: { value: string; onChange: (iso: string) => void }) {
  if (Platform.OS === 'web') {
    return (
      // eslint-disable-next-line jsx-a11y/no-redundant-roles
      <input
        role="date"
        type="date"
        value={value}
        onChange={(e: any) => onChange(e.target.value)}
        style={{ padding: 8, borderWidth: 1, borderColor: '#ddd', borderRadius: 6 }}
      />
    );
  }
  return (
    <TextInput
      placeholder="YYYY-MM-DD"
      value={value}
      onChangeText={onChange}
      style={{ padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 6 }}
    />
  );
}
