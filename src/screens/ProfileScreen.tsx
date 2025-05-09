import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { theme } from '@/theme';
import { User } from '@/types';

const ProfileScreen = () => {
  const user = useSelector((state: { user: User }) => state.user);
  const profileData = {
    name: user.name,
    username: `@${user.username}`,
    bio: user.company.catchPhrase,
    stats: {
      posts: 0,
      followers: 0,
      following: 0,
    },
    profilePicture: 'https://picsum.photos/150/150?random',
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            source={{uri: profileData.profilePicture}}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{profileData.name}</Text>
          <Text style={styles.username}>{profileData.username}</Text>
          <Text style={styles.bio}>{profileData.bio}</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{profileData.stats.posts}</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{profileData.stats.followers}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{profileData.stats.following}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      {/* Posts Grid */}
      <View style={styles.postsContainer}>
        <Text style={styles.sectionTitle}>Posts</Text>
        <View style={styles.postsGrid}>
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <TouchableOpacity key={index} style={styles.postItem}>
              <Image
                source={{uri: 'https://picsum.photos/150/150?random'}}
                style={styles.postImage}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.cardBackground,
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerContent: {
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: theme.spacing.md,
  },
  name: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: 'bold' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  username: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  bio: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold' as const,
    color: theme.colors.textPrimary,
  },
  statLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  postsContainer: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.cardBackground,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: 'bold' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  postItem: {
    width: '32%',
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
});

export default ProfileScreen;
