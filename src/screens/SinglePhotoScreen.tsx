import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Photo } from '@/types';
import { RootStackParamList } from '@/navigation/types';

const SinglePhotoScreen: React.FC = () => {
  const route = useRoute();
  const { photo } = route.params as { photo: Photo };
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: photo.url }}
        style={styles.photo}
        resizeMode="contain"
      />
      <View style={styles.content}>
        <Text style={styles.title}>{photo.title}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  photo: {
    width: '100%',
    height: 400,
    marginVertical: 16,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
});

export default SinglePhotoScreen;
