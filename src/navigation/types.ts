import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Album, Post, Photo, Comment } from '@/types';

export type RootStackParamList = {
  Dashboard: undefined;
  PostDetail: { post: Post };
  SinglePhoto: { photo: Photo };
  Posts: undefined;
  AlbumPhotos: { album: Album };
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;
export type PostDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'PostDetail'>;
export type AlbumPhotosScreenProps = NativeStackScreenProps<RootStackParamList, 'AlbumPhotos'>;
