import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';

import { FavoritesProvider } from '@/context/FavoritesContext';
import { RecentSearchProvider } from '@/context/RecentSearchContext';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';

function AppInner() {
  const { isDark } = useTheme();

  return (
    <NavThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false, animation: 'none' }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="conjugation" />
        <Stack.Screen name="favorites" />
      </Stack>
      <StatusBar style="auto" />
    </NavThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <RecentSearchProvider>
      <FavoritesProvider>
        <ThemeProvider>
          <AppInner />
        </ThemeProvider>
      </FavoritesProvider>
    </RecentSearchProvider>
  );
}
