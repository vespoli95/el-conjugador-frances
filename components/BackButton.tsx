import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

type BackButtonProps = {
  onPress: () => void;
  bottom?: number;
};

export function BackButton({ onPress, bottom = 24 }: BackButtonProps) {
  return (
    <Pressable
      style={[styles.button, { bottom }]}
      onPress={onPress}
    >
      <FontAwesome name="arrow-left" color="#fff" size={22} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 24,
    height: 56,
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    backgroundColor: '#1e40af',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
