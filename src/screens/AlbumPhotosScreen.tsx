import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/types';
import { Album, Photo } from '@/types';
import { getPhotos } from '@/services/api';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

interface AlbumPhotosScreenRouteProp extends RouteProp<RootStackParamList, 'AlbumPhotos'> {
  params: {
    album: Album;
  };
}

const AlbumPhotosScreen: React.FC = () => {
  const route = useRoute<AlbumPhotosScreenRouteProp>();
  const { album } = route.params;
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photosData = await getPhotos(album.id);
        setPhotos(photosData);
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [album.id]);

  const renderPhoto = ({ item }: { item: Photo }) => {
    const _item = {
      ...item,
      url: 'https://picsum.photos/200/200?random',
    };
    return (
      <TouchableOpacity
        style={styles.photoContainer}
        onPress={() => navigation.navigate('SinglePhoto', { photo: _item })}
      >
        <Image
          source={{ uri: _item.url }}
          style={styles.photo}
          resizeMode="cover"
        />
      </TouchableOpacity>
    )
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{album.title}</Text>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPhoto}
        numColumns={3}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    color: '#333',
  },
  listContainer: {
    padding: 8,
  },
  photoContainer: {
    margin: 4,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flex: 1,
  },
  photo: {
    flex: 1,
    borderRadius: 8,
    width: '100%',
    height: 150,
  },
  photoTitle: {
    padding: 4,
    fontSize: 12,
    color: '#333',
  },
});

export default AlbumPhotosScreen;
