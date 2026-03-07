import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { VerbName } from '@/assets/types/Search';
import BannerAdViewComponent from '@/components/BannerAd';
import Search from '@/components/Search';
import { useRecentSearches } from '@/context/RecentSearchContext';
import { useTheme } from '@/context/ThemeContext';
import { findVerbs, getInitialFrenchVerbsList, getSpanishTranslation } from '@/lib/utils';

export default function HomeScreen() {
  const [frenchVerbs, setFrenchVerbs] = useState<VerbName[]>([]);
  const { addRecentSearch, recentSearches, removeRecentSearch } = useRecentSearches();
  const { isDark, toggleTheme } = useTheme();
  const router = useRouter();

  const handleOnChangeText = (val: string) => {
    if (val) {
      const verbs = findVerbs(val).filter(verb => verb?.displayName && verb?.frenchVerb);
      const uniqueVerbs =
        verbs && Array.from(new Set(verbs.map(verb => JSON.stringify(verb)))).map(verb => JSON.parse(verb));
      setFrenchVerbs(uniqueVerbs);
    } else {
      setFrenchVerbs(getInitialFrenchVerbsList());
    }
  };

  const handleOnSelectedChange = async (frenchVerb: string) => {
    void addRecentSearch(frenchVerb);
    setFrenchVerbs([]);
    router.push({ pathname: '/conjugation', params: { verb: frenchVerb } });
  };

  const handleOnFocus = () => {
    if (frenchVerbs.length === 0) {
      setFrenchVerbs(getInitialFrenchVerbsList());
    }
  };

  const handleOnHistorySelectChange = (frenchVerb: string) => {
    router.push({ pathname: '/conjugation', params: { verb: frenchVerb } });
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#0f172a' : '#f8fafc' }]}>
      <View style={styles.topBar}>
        <Pressable style={styles.themeToggle} onPress={toggleTheme}>
          <FontAwesome name={isDark ? 'sun-o' : 'moon-o'} color={isDark ? '#facc15' : '#6b7280'} size={22} />
        </Pressable>
      </View>
      <BannerAdViewComponent />
      <View style={styles.content}>
        <Search
          handleOnChangeText={handleOnChangeText}
          onSelectedChange={handleOnSelectedChange}
          onFocus={handleOnFocus}
          items={
            frenchVerbs &&
            frenchVerbs.map((verb, i) => ({
              id: i,
              displayName: verb.displayName,
              frenchVerb: verb.frenchVerb,
            }))
          }
        />
        <View>
          <Text
            style={[styles.welcome, { color: isDark ? '#93c5fd' : '#1e3a8a' }]}
          >
            {'\u00a1'}Bienvenido al conjugador franc{'\u00e9'}s!
          </Text>
          <View style={styles.flagRow}>
            <Image style={styles.flag} source={require('@/assets/images/flag-of-spain.png')} />
            <Image style={styles.flag} source={require('@/assets/images/flag-of-France.png')} />
          </View>
          <View style={styles.recentSection}>
            {recentSearches?.length > 0 && (
              <Text style={[styles.recentLabel, { color: isDark ? '#60a5fa' : '#1d4ed8' }]}>
                <FontAwesome name="search" color={isDark ? '#60a5fa' : '#1d4ed8'} size={14} /> B{'\u00fa'}squedas recientes
              </Text>
            )}
            {recentSearches?.map(verb => (
              <TouchableOpacity
                style={[styles.recentItem, {
                  backgroundColor: isDark ? '#1e293b' : '#e2e8f0',
                  borderColor: isDark ? '#475569' : '#94a3b8',
                }]}
                key={verb}
                onPress={() => handleOnHistorySelectChange(verb)}
              >
                <View style={styles.recentItemContent}>
                  <Text style={[styles.recentItemText, { color: isDark ? '#f1f5f9' : '#000' }]}>
                    <Text style={{ fontWeight: '600' }}>{verb}</Text>
                    {getSpanishTranslation(verb) ? ` (${getSpanishTranslation(verb)})` : ''}
                  </Text>
                </View>
                <Pressable style={styles.removeBtn} onPress={() => removeRecentSearch(verb)}>
                  <FontAwesome name="remove" color={isDark ? '#aaa' : '#444'} size={18} />
                </Pressable>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.favSection}>
            <TouchableOpacity
              style={[styles.favButton, { backgroundColor: isDark ? '#172554' : '#eff6ff' }]}
              onPress={() => router.push('/favorites')}
            >
              <FontAwesome name="star" color="#d4a017" size={18} />
              <Text style={[styles.favButtonText, { color: isDark ? '#60a5fa' : '#1d4ed8' }]}>Favoritos</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <BannerAdViewComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    marginTop: 40,
    paddingHorizontal: 8,
  },
  themeToggle: {
    alignItems: 'flex-end',
    padding: 8,
    marginTop: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  welcome: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  flagRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  flag: {
    width: 36,
    height: 20,
    margin: 8,
  },
  recentSection: {
    marginTop: 24,
  },
  recentLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  recentItem: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 6,
    padding: 16,
    marginBottom: 8,
  },
  recentItemContent: {
    flexGrow: 1,
  },
  recentItemText: {
    textAlign: 'center',
  },
  removeBtn: {
    marginLeft: 'auto',
  },
  favSection: {
    marginTop: 24,
  },
  favButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    padding: 16,
  },
  favButtonText: {
    marginLeft: 8,
    fontWeight: 'bold',
  },
});
