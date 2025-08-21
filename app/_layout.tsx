// app/_layout.js

import { Link, Stack } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowOpacity: 0, // Removes the line under the header on iOS
          elevation: 0, // Removes the shadow on Android
        },
        headerTintColor: colors.textLight,
      }}
    >
      <Stack.Screen
        name="index" // This refers to app/index.js
        options={{
          title: 'Calculator',
          headerRight: () => (
            <Link href="/ExchangeRateScreen" asChild>
              <TouchableOpacity>
                <Text style={{ color: colors.accent, marginRight: 15, fontSize: 18 }}>
                  FX
                </Text>
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="exchangeRate" // This refers to app/exchangeRate.js
        options={{ 
          title: 'Exchange Rates',
          presentation: 'modal', // Makes it slide up from the bottom
        }}
      />
    </Stack>
  );
}