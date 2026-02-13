import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { FrenchVerbData } from '@/assets/types/Conjugation';
import { VerbName } from '@/assets/types/Search';
import { BackButton } from '@/components/BackButton';
import ConjugationTable from '@/components/ConjugationTable';
import Search from '@/components/Search';
import { useFavorites } from '@/context/FavoritesContext';
import { useRecentSearches } from '@/context/RecentSearchContext';
import { useTheme } from '@/context/ThemeContext';
import { readJSONFile } from '@/lib/parseJson';
import { findVerbs, getInitialFrenchVerbsList } from '@/lib/utils';

export default function ConjugationScreen() {
  const { verb } = useLocalSearchParams<{ verb: string }>();
  const [verbData, setVerbData] = useState<FrenchVerbData | null>(null);
  const [frenchVerbs, setFrenchVerbs] = useState<VerbName[]>([]);
  const { addRecentSearch } = useRecentSearches();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isDark } = useTheme();
  const router = useRouter();

  const fetchConjugations = useCallback(async (v: string) => {
    return await readJSONFile(v);
  }, []);

  useEffect(() => {
    if (verb) {
      void (async () => {
        setVerbData(await fetchConjugations(verb));
      })();
    }
  }, [fetchConjugations, verb]);

  const handleOnChangeText = (val: string) => {
    if (val) {
      const verbs = findVerbs(val).filter(v => v?.displayName && v?.frenchVerb);
      const uniqueVerbs = verbs && Array.from(new Set(verbs.map(v => JSON.stringify(v)))).map(v => JSON.parse(v));
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

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#0f172a' : '#f8fafc' }]}>
      <Search
        handleOnChangeText={handleOnChangeText}
        onSelectedChange={handleOnSelectedChange}
        onFocus={handleOnFocus}
        items={
          frenchVerbs &&
          frenchVerbs.map((v, i) => ({
            id: i,
            displayName: v.displayName,
            frenchVerb: v.frenchVerb,
          }))
        }
      />
      <View style={styles.verbHeader}>
        <Text style={[styles.verbTitle, { color: isDark ? '#93c5fd' : '#1e3a8a' }]}>
          {verb?.toUpperCase()}
        </Text>
        <Pressable style={styles.starBtn} onPress={() => verb && void toggleFavorite(verb)}>
          <FontAwesome name={verb && isFavorite(verb) ? 'star' : 'star-o'} color="#d4a017" size={24} />
        </Pressable>
      </View>
      {verbData ? (
        <ConjugationTable verbData={verbData} />
      ) : (
        <ActivityIndicator style={styles.loading} size="large" color="#2563eb" />
      )}
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
  verbHeader: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verbTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  starBtn: {
    marginLeft: 8,
  },
  loading: {
    marginTop: 40,
  },
});
