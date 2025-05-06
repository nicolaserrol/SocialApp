import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { theme } from '@/theme';
import Ionicons from '@react-native-vector-icons/ionicons';
import Card from '@/components/Card';

import { getTodos } from '@/services/api';
import { Todo } from '@/types';

const ToDosScreen: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodosData = async () => {
    setLoading(true);
    try {
      const data = await getTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodosData();
  }, []);


  const toggleTodo = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const renderTodo = ({ item }: { item: Todo }) => {
    return (
      <TouchableOpacity
        onPress={() => toggleTodo(item.id)}
        style={styles.todoItem}
        activeOpacity={0.8}
      >
        <Card style={styles.todoContent}>
          <View style={styles.todoCheckbox}>
            <Ionicons
              name={item.completed ? 'checkmark-circle' : 'radio-button-off-outline'}
              size={24}
              color={theme.colors.primary}
            />
          </View>
          <Text style={styles.todoTitle}>{item.title}</Text>
        </Card>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </SafeAreaView>
    );
  }


  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: theme.colors.error }}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchTodosData}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  todoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todoItem: {
    paddingTop: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  todoCheckbox: {
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  todoTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: 'bold' as const,
    color: theme.colors.textPrimary,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  todoStatus: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
});

export default ToDosScreen;
