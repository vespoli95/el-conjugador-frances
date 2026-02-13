import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const RECENT_PREFIX = '@ecf_recent_';

type RecentSearchContextType = {
  addRecentSearch: (val: string) => Promise<void>;
  recentSearches: string[];
  removeRecentSearch: (val: string) => Promise<void>;
};

const noop = async () => {};

const RecentSearchContext = createContext<RecentSearchContextType>({
  addRecentSearch: noop,
  recentSearches: [],
  removeRecentSearch: noop,
});

export function RecentSearchProvider({ children }: { children: React.ReactNode }) {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    void (async () => {
      const allKeys = await AsyncStorage.getAllKeys();
      const keys = allKeys.filter(k => k.startsWith(RECENT_PREFIX));
      const values = (await AsyncStorage.multiGet(keys)).map(pair => pair[1] as string);
      setRecentSearches(values);
    })();
  }, []);

  const addRecentSearch = useCallback(
    async (val: string) => {
      if (recentSearches.includes(val)) return;

      await AsyncStorage.setItem(`${RECENT_PREFIX}${val}`, val);
      if (recentSearches.length === 3) {
        const oldest = recentSearches[0];
        await AsyncStorage.removeItem(`${RECENT_PREFIX}${oldest}`);
        setRecentSearches(prev => [...prev.slice(1), val]);
      } else {
        setRecentSearches(prev => [...prev, val]);
      }
    },
    [recentSearches]
  );

  const removeRecentSearch = useCallback(async (val: string) => {
    await AsyncStorage.removeItem(`${RECENT_PREFIX}${val}`);
    setRecentSearches(prev => prev.filter(v => v !== val));
  }, []);

  return (
    <RecentSearchContext.Provider value={{ addRecentSearch, recentSearches, removeRecentSearch }}>
      {children}
    </RecentSearchContext.Provider>
  );
}

export function useRecentSearches() {
  return useContext(RecentSearchContext);
}
