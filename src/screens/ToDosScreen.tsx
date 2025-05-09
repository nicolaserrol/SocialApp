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
  TextInput,
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
  const [searchQuery, setSearchQuery] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);
  const [showActive, setShowActive] = useState(true);

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = (todo.completed && showCompleted) || (!todo.completed && showActive);
    return matchesSearch && matchesStatus;
  });

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

  const handleClearFilters = () => {
    setSearchQuery('');
    setShowCompleted(true);
    setShowActive(true);
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

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: theme.colors.error }}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search todos..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={theme.colors.textSecondary}
        />
      </View>

      <View style={styles.filterContainer}>
        <View style={styles.filterButtonsContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              showCompleted && styles.filterButtonActive,
            ]}
            onPress={() => setShowCompleted(!showCompleted)}
          >
            <Text style={[
            styles.filterButtonText,
            showCompleted && styles.filterButtonTextActive
          ]}>Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              showActive && styles.filterButtonActive,
            ]}
            onPress={() => setShowActive(!showActive)}
          >
            <Text style={[
            styles.filterButtonText,
            showActive && styles.filterButtonTextActive
          ]}>Active</Text>
          </TouchableOpacity>
        </View>
        {searchQuery || !showCompleted || !showActive ? (
          <TouchableOpacity
            style={styles.clearFiltersButton}
            onPress={handleClearFilters}
          >
            <Ionicons
              name="trash-outline"
              size={20}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      <FlatList
        data={filteredTodos}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchTodosData}
          />
        }
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchContainer: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  searchInput: {
    height: 40,
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: theme.spacing.md,
    color: theme.colors.textPrimary,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
    backgroundColor: theme.colors.background,
  },
  filterButtonsContainer: {
    flexDirection: 'row',
  },
  filterButton: {
    backgroundColor: theme.colors.cardBackground,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.large,
    marginRight: theme.spacing.sm,
    ...theme.shadows.small,
  },
  filterButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  filterButtonText: {
    color: theme.colors.textPrimary,
  },
  filterButtonTextActive: {
    color: theme.colors.background,
  },
  clearFiltersButton: {
    backgroundColor: theme.colors.cardBackground,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.medium,
  },
  listContainer: {
    flexGrow: 1,
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
});

export default ToDosScreen;
