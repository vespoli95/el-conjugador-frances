import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

type ConjTypeMenuProps = {
  currentTense: string;
  setCurrentTense: (tense: string) => void;
  tenses: string[];
};

const ConjTypeMenu: React.FC<ConjTypeMenuProps> = ({ currentTense, setCurrentTense, tenses }) => {
  return (
    <View style={styles.container}>
      {tenses?.map(tense => (
        <TouchableHighlight key={tense} onPress={() => setCurrentTense(tense)}>
          <Text
            style={[
              styles.tab,
              currentTense === tense ? styles.tabActive : styles.tabInactive,
            ]}
          >
            {tense}
          </Text>
        </TouchableHighlight>
      ))}
    </View>
  );
};

export default ConjTypeMenu;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 12,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#fff',
    overflow: 'hidden',
  },
  tabActive: {
    backgroundColor: '#2563eb',
  },
  tabInactive: {
    backgroundColor: '#1e3a8a',
  },
});
