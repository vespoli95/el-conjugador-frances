import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const FAV_PREFIX = '@ecf_fav_';

type FavoritesContextType = {
  addFavorite: (val: string) => Promise<void>;
  favorites: string[];
  isFavorite: (val: string) => boolean;
  removeFavorite: (val: string) => Promise<void>;
  toggleFavorite: (val: string) => Promise<void>;
};

const noop = async () => {};

const FavoritesContext = createContext<FavoritesContextType>({
  addFavorite: noop,
  favorites: [],
  isFavorite: () => false,
  removeFavorite: noop,
  toggleFavorite: noop,
});

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    void (async () => {
      const allKeys = await AsyncStorage.getAllKeys();
      const keys = allKeys.filter(k => k.startsWith(FAV_PREFIX));
      const values = (await AsyncStorage.multiGet(keys)).map(pair => pair[1] as string);
      setFavorites(values);
    })();
  }, []);

  const addFavorite = useCallback(
    async (val: string) => {
      if (favorites.includes(val)) return;
      await AsyncStorage.setItem(`${FAV_PREFIX}${val}`, val);
      setFavorites(prev => [...prev, val]);
    },
    [favorites]
  );

  const removeFavorite = useCallback(async (val: string) => {
    await AsyncStorage.removeItem(`${FAV_PREFIX}${val}`);
    setFavorites(prev => prev.filter(v => v !== val));
  }, []);

  const isFavorite = useCallback(
    (val: string) => favorites.includes(val),
    [favorites]
  );

  const toggleFavorite = useCallback(
    async (val: string) => {
      if (favorites.includes(val)) {
        await removeFavorite(val);
      } else {
        await addFavorite(val);
      }
    },
    [favorites, addFavorite, removeFavorite]
  );

  return (
    <FavoritesContext.Provider value={{ addFavorite, favorites, isFavorite, removeFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
