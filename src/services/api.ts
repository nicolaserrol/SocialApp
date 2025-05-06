import axios from 'axios';
import { Post, Comment, Album, Photo, Todo } from '@/types';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

// Add request interceptor
api.interceptors.request.use((config) => {
  console.log('API Base URL:', config.baseURL);
  return config;
}, (error) => {
  console.error('Request error:', error);
  return Promise.reject(error);
});

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

// Todo API functions
export const getTodos = async (): Promise<Todo[]> => {
  const response = await api.get<Todo[]>('/todos');
  return response.data;
};

export const getTodo = async (todoId: number): Promise<Todo> => {
  const response = await api.get<Todo>(`/todos/${todoId}`);
  return response.data;
};

export const createTodo = async (todo: Partial<Todo>): Promise<Todo> => {
  const response = await api.post<Todo>('/todos', todo);
  return response.data;
};

export const updateTodo = async (todoId: number, todo: Partial<Todo>): Promise<Todo> => {
  const response = await api.put<Todo>(`/todos/${todoId}`, todo);
  return response.data;
};

export const deleteTodo = async (todoId: number): Promise<void> => {
  await api.delete(`/todos/${todoId}`);
};

export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>('/posts');
  return response.data;
};

export const getPost = async (postId: number): Promise<Post> => {
  const response = await api.get<Post>(`/posts/${postId}`);
  return response.data;
};

export const getComments = async (postId: number): Promise<Comment[]> => {
  const response = await api.get<Comment[]>(`/comments?postId=${postId}`);
  return response.data;
};

export const getAlbums = async (): Promise<Album[]> => {
  const response = await api.get<Album[]>('/albums');
  return response.data;
};

export const getAlbum = async (albumId: number): Promise<Album> => {
  const response = await api.get<Album>(`/albums/${albumId}`);
  return response.data;
};

export const getPhotos = async (albumId: number): Promise<Photo[]> => {
  const response = await api.get<Photo[]>(`/photos?albumId=${albumId}`);
  return response.data;
};

export const getRandomPhotos = async (count: number): Promise<Photo[]> => {
  const response = await api.get<Photo[]>(`/photos?_limit=${count}`);
  return response.data.map(photo => ({
    ...photo,
    thumbnailUrl: `https://picsum.photos/200/200?random`,
    url: `https://picsum.photos/400/400?random`
  }));
};

export default api;