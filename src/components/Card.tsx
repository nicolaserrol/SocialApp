import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: any;
}

const Card: React.FC<CardProps> = ({ children, style }) => {
  return (
    <View style={styles.shadow}>
      <View style={[styles.card, style]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
});

export default Card;
