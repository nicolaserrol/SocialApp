import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const ProfileScreen = () => {
  const profileData = {
    name: 'John Doe',
    username: '@johndoe',
    bio: 'Software Developer | Tech Enthusiast | Building amazing things',
    stats: {
      posts: 123,
      followers: 2456,
      following: 789,
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  headerContent: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  bio: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
    maxWidth: 250,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  postsContainer: {
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
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
