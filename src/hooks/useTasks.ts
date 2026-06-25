import { useMemo, useState, useCallback } from 'react';
import { Task, TaskStatus } from '../types';
import { useTaskContext } from '../store/TaskContext';

export type FilterOption = 'all' | TaskStatus;

interface UseTasksResult {
  filteredTasks: Task[];
  query: string;
  setQuery: (q: string) => void;
  filter: FilterOption;
  setFilter: (f: FilterOption) => void;
  totalCount: number;
  pendingCount: number;
  completedCount: number;
}

export function useTasks(): UseTasksResult {
  const { tasks } = useTaskContext();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterOption>('all');

  const filteredTasks = useMemo(() => {
    let result = tasks;

    if (filter !== 'all') {
      result = result.filter((t) => t.status === filter);
    }

    if (query.trim()) {
      const lower = query.toLowerCase();
      result = result.filter((t) => t.title.toLowerCase().includes(lower));
    }

    return result;
  }, [tasks, query, filter]);

  const totalCount = tasks.length;
  const pendingCount = tasks.filter((t) => t.status === 'pending').length;
  const completedCount = tasks.filter((t) => t.status === 'completed').length;

  return {
    filteredTasks,
    query,
    setQuery: useCallback((q: string) => setQuery(q), []),
    filter,
    setFilter: useCallback((f: FilterOption) => setFilter(f), []),
    totalCount,
    pendingCount,
    completedCount,
  };
}
