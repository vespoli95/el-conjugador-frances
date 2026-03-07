import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { BackButton } from '@/components/BackButton';
import BannerAdViewComponent from '@/components/BannerAd';
import { useFavorites } from '@/context/FavoritesContext';
import { useTheme } from '@/context/ThemeContext';
import { getSpanishTranslation } from '@/lib/utils';

export default function FavoritesScreen() {
  const { favorites, removeFavorite } = useFavorites();
  const { isDark } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#0f172a' : '#f8fafc' }]}>
      <View style={styles.header}>
        <FontAwesome name="star" color="#d4a017" size={22} />
        <Text style={[styles.headerText, { color: isDark ? '#60a5fa' : '#1d4ed8' }]}>
          Favoritos
        </Text>
      </View>
      <ScrollView style={styles.list}>
        {favorites.length === 0 ? (
          <Text style={[styles.emptyText, { color: isDark ? '#6b7280' : '#9ca3af' }]}>
            Ning{'\u00fa'}n favorito por el momento
          </Text>
        ) : (
          favorites.map(verb => (
            <TouchableOpacity
              style={[styles.favItem, {
                backgroundColor: isDark ? '#172554' : '#eff6ff',
                borderColor: isDark ? '#1d4ed8' : '#93c5fd',
              }]}
              key={verb}
              onPress={() => router.push({ pathname: '/conjugation', params: { verb } })}
            >
              <View style={styles.favItemContent}>
                <Text style={[styles.favItemText, { color: isDark ? '#f1f5f9' : '#000' }]}>
                  <Text style={{ fontWeight: '600' }}>{verb}</Text>
                  {getSpanishTranslation(verb) ? ` (${getSpanishTranslation(verb)})` : ''}
                </Text>
              </View>
              <Pressable style={styles.removeBtn} onPress={() => void removeFavorite(verb)}>
                <FontAwesome name="remove" color={isDark ? '#aaa' : '#444'} size={18} />
              </Pressable>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      <BannerAdViewComponent />
      <BackButton bottom={24} onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    paddingTop: 48,
  },
  header: {
    marginTop: 32,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    marginLeft: 8,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  emptyText: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 18,
  },
  favItem: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 6,
    padding: 16,
    marginBottom: 8,
  },
  favItemContent: {
    flexGrow: 1,
  },
  favItemText: {
    textAlign: 'center',
  },
  removeBtn: {
    marginLeft: 'auto',
  },
});
