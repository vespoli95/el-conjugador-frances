import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { SearchItem } from '@/assets/types/Search';
import { useTheme } from '@/context/ThemeContext';

type SearchProps = {
  handleOnChangeText: (val: string) => void;
  items: SearchItem[];
  onSelectedChange: (frenchVerb: string) => void;
  onFocus?: () => void;
};

const Search: React.FC<SearchProps> = ({ handleOnChangeText, items, onSelectedChange, onFocus }) => {
  const { isDark } = useTheme();
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const iconColor = isDark ? '#aaa' : '#444';

  const onChange = (text: string) => {
    setQuery(text);
    handleOnChangeText(text);
    setShowDropdown(true);
  };

  const onSelect = (item: SearchItem) => {
    setQuery(item.displayName);
    setShowDropdown(false);
    onSelectedChange(item.frenchVerb);
  };

  const handleFocus = () => {
    setShowDropdown(true);
    onFocus?.();
  };

  return (
    <View style={styles.wrapper}>
      <View style={[styles.inputContainer, {
        backgroundColor: isDark ? '#1e293b' : '#fff',
        borderColor: isDark ? '#475569' : '#cbd5e1',
      }]}>
        <TextInput
          style={[styles.input, { color: isDark ? '#e2e8f0' : '#0f172a' }]}
          placeholder="Ingrese un verbo en español o francés..."
          placeholderTextColor={isDark ? '#94a3b8' : '#94a3b8'}
          value={query}
          onChangeText={onChange}
          onFocus={handleFocus}
          autoCorrect={false}
        />
        <FontAwesome name="search" color={iconColor} size={18} />
      </View>
      {showDropdown && items && items.length > 0 && (
        <View style={[styles.dropdown, {
          backgroundColor: isDark ? '#1e293b' : '#fff',
          borderColor: isDark ? '#475569' : '#cbd5e1',
        }]}>
          <FlatList
            data={items.slice(0, 50)}
            keyExtractor={(item) => `${item.id}_${item.frenchVerb}`}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => {
              const match = item.displayName.match(/^(.+?)(\s*\(.+\))$/);
              return (
                <Pressable
                  style={[styles.dropdownItem, {
                    borderBottomColor: isDark ? '#334155' : '#e2e8f0',
                  }]}
                  onPress={() => onSelect(item)}
                >
                  <Text style={{ color: isDark ? '#e2e8f0' : '#0f172a' }}>
                    <Text style={{ fontWeight: '600' }}>{match ? match[1] : item.displayName}</Text>
                    {match ? match[2] : ''}
                  </Text>
                </Pressable>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 40,
    zIndex: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
  },
  dropdown: {
    maxHeight: 250,
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
});
