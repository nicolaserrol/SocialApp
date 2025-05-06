import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Album, Photo } from '@/types';
import { RootStackParamList } from '@/navigation/types';
import { getPhotos } from '@/services/api';
import { theme } from '@/theme';

const getRandomImage = () => {
  return `https://picsum.photos/300/300?random`;
};

interface AlbumCollageProps {
  album: Album;
}

const AlbumCollage: React.FC<AlbumCollageProps> = ({ album }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photosData = await getPhotos(album.id);
        setPhotos(photosData.slice(0, 6)); // Get first 6 photos
      } catch (error) {
        console.error('Error fetching album photos:', error);
        setPhotos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [album.id]);

  const renderThumbnail = ({ item }: { item: Photo }) => (
    <View style={styles.thumbnailContainer}>
      <Image
        source={{ uri: getRandomImage() }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
    </View>
  );

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => navigation.navigate('AlbumPhotos', { album })}
    >
      <Text style={styles.title}>{album.title}</Text>
      <View style={styles.collageContainer}>
        {loading ? (
          <ActivityIndicator size="small" color={theme.colors.secondary} />
        ) : (
          <FlatList
            data={photos}
            renderItem={renderThumbnail}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.collageContent}
            scrollEnabled={false}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    margin: theme.spacing.sm,
    elevation: 2,
    shadowColor: theme.colors.secondary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 300,
  },
  title: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: 'bold' as const,
    marginBottom: theme.spacing.md,
    color: theme.colors.textPrimary,
  },
  collageContainer: {
    flex: 1,
  },
  collageContent: {
    paddingBottom: theme.spacing.md,
  },
  thumbnailContainer: {
    flex: 1,
    margin: theme.spacing.sm,
  },
  thumbnail: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.sm,
  },
});

export default AlbumCollage;
