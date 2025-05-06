import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getPosts, getAlbums, getPhotos } from '@/services/api';
import { theme } from '@/theme';

import { RootStackParamList } from '@/navigation/types';
import { Post, Photo, Album } from '@/types';
import AlbumCollage from '@/components/AlbumCollage';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [postsData, albumsData] = await Promise.all([
          getPosts(),
          getAlbums()
        ]);
        const albums = albumsData.slice(0, 3);
        const photosPromises = albums.map(async (album: Album) => {
          const albumPhotos = await getPhotos(album.id);
          return albumPhotos[0];
        });
        const photos = await Promise.all(photosPromises);
        
        setPosts(postsData.slice(0, 3));
        setPhotos(photos);
        setAlbums(albums);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#f4511e" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Latest Posts</Text>
        {posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postBody} numberOfLines={2}>{post.body}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Photos</Text>
        <FlatList
          data={photos}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item: Photo) => item.id.toString()}
          renderItem={({ item }: { item: Photo }) => (
            <TouchableOpacity
              style={styles.photoCard}
              onPress={() => navigation.navigate('SinglePhoto', { photo: item })}
            >
              <Image
                source={{ uri: 'https://picsum.photos/150/150?random' }}
                style={styles.photo}
                resizeMode="cover"
              />
              <Text numberOfLines={2} style={styles.photoTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Albums</Text>
        <FlatList
          data={albums}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <AlbumCollage
              album={item}
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  section: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    marginVertical: theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: 'bold' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  postCard: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.md,
    elevation: 2,
    shadowColor: theme.colors.secondary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  postTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: 'bold' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  postBody: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  photoCard: {
    margin: theme.spacing.sm,
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    elevation: 2,
    shadowColor: theme.colors.secondary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 150,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: theme.borderRadius.medium,
  },
  photoTitle: {
    padding: theme.spacing.sm,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
  },
  albumsList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
