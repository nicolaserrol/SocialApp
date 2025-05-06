import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Post } from '@/types';
import Card from '@/components/Card';
import { theme } from '@/theme';

interface PostItemProps {
  item: Post;
  onPress?: () => void;
}

const PostItem: React.FC<PostItemProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.postContainer} onPress={onPress} activeOpacity={0.8}>
      <Card>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    paddingTop: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: '#666',
  },
});

export default PostItem;
