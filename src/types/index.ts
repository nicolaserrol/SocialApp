export interface Album {
  id: number;
  title: string;
  userId: number;
  thumbnails: string[];
  photos?: Photo[];
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface Photo {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}
