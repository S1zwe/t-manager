import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  StatusBar,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useTaskContext } from '../store/TaskContext';
import { useTasks } from '../hooks/useTasks';
import { useQuote } from '../hooks/useQuote';
import { TaskCard } from '../components/TaskCard';
import { QuoteCard } from '../components/QuoteCard';
import { SearchBar } from '../components/SearchBar';
import { FilterTabs } from '../components/FilterTabs';
import { EmptyState } from '../components/EmptyState';
import { FAB } from '../components/FAB';
import { Colors, Spacing, FontSize, FontWeight } from '../utils/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskList'>;

export function TaskListScreen({ navigation }: Props) {
  const { deleteTask, toggleStatus, tasks } = useTaskContext();
  const {
    filteredTasks,
    query,
    setQuery,
    filter,
    setFilter,
    totalCount,
    pendingCount,
    completedCount,
  } = useTasks();
  const { quote, loading: quoteLoading, error: quoteError, refresh } = useQuote();

  function handleDelete(id: string, title: string) {
    Alert.alert(
      'Delete Task',
      `Are you sure you want to delete "${title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTask(id),
        },
      ]
    );
  }

  const isSearching = query.trim().length > 0;
  const isFiltered = filter !== 'all';
  const isEmpty = filteredTasks.length === 0;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tasks</Text>
        <Text style={styles.headerSubtitle}>
          {pendingCount} pending · {completedCount} done
        </Text>
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={isEmpty ? styles.listEmpty : styles.listContent}
        ListHeaderComponent={
          <>
            <QuoteCard
              quote={quote}
              loading={quoteLoading}
              error={quoteError}
              onRefresh={refresh}
            />
            <SearchBar value={query} onChangeText={setQuery} />
            <FilterTabs
              active={filter}
              onChange={setFilter}
              counts={{ all: totalCount, pending: pendingCount, completed: completedCount }}
            />
          </>
        }
        ListEmptyComponent={
          <EmptyState isSearching={isSearching} isFiltered={isFiltered && !isSearching} />
        }
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onToggle={() => toggleStatus(item.id)}
            onDelete={() => handleDelete(item.id, item.title)}
            onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      <FAB onPress={() => navigation.navigate('AddTask')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  headerTitle: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  listContent: {
    paddingBottom: 100,
  },
  listEmpty: {
    flexGrow: 1,
    paddingBottom: 100,
  },
});
