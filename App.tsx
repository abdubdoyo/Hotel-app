import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import BookingScreen from './screens/BookingScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import AdminScreen from './screens/AdminScreen';
import AdminLoginScreen from './screens/AdminLoginScreen';

export type RootStackParamList = {
  Home: undefined;
  Booking: { room: any };
  Confirmation: { booking: any };
  Admin: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Ebisa Hotel' }} />
        <Stack.Screen name="Booking" component={BookingScreen} options={{ title: 'Make a Booking' }} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} options={{ title: 'Confirmed' }} />
        <Stack.Screen name="Admin" component={AdminScreen} options={{ title: 'Client Bookings' }} />
        <Stack.Screen name="AdminLogin" component={AdminLoginScreen} options={{ title: 'Admin Login' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
