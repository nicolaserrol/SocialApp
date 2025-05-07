import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@react-native-vector-icons/ionicons';
import { theme } from '@/theme';
import HomeScreen from '@/screens/HomeScreen';
import PostsScreen from '@/screens/PostsScreen';
import PostDetailScreen from '@/screens/PostDetailScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import AlbumPhotosScreen from '@/screens/AlbumPhotosScreen';
import SinglePhotoScreen from '@/screens/SinglePhotoScreen';
import AlbumsScreen from '@/screens/AlbumsScreen';
import ToDosScreen from '@/screens/ToDosScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: theme.colors.cardBackground,
        }}
      >
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen
          name="PostDetail"
          component={PostDetailScreen}
          options={{ title: 'Post Details' }}
        />
        <Stack.Screen
          name="AlbumPhotos"
          component={AlbumPhotosScreen}
          options={{ title: 'Album Photos' }}
        />
        <Stack.Screen
          name="SinglePhoto"
          component={SinglePhotoScreen}
          options={{ title: 'Single Photo' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTitleStyle: {
            color: theme.colors.cardBackground,
          },
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="ToDos"
        component={ToDosScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTitleStyle: {
            color: theme.colors.cardBackground,
          },
          title: 'ToDos',
          tabBarIcon: ({ color, size }) => <Ionicons name="checkmark-done" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTitleStyle: {
            color: theme.colors.cardBackground,
          },
          title: 'Posts',
          tabBarIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Albums"
        component={AlbumsScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTitleStyle: {
            color: theme.colors.cardBackground,
          },
          title: 'Albums',
          tabBarIcon: ({ color, size }) => <Ionicons name="albums" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTitleStyle: {
            color: theme.colors.cardBackground,
          },
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
