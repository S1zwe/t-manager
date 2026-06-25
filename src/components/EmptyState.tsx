import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, FontSize, FontWeight } from '../utils/theme';

interface EmptyStateProps {
  isSearching?: boolean;
  isFiltered?: boolean;
}

export function EmptyState({ isSearching, isFiltered }: EmptyStateProps) {
  const title = isSearching
    ? 'No results found'
    : isFiltered
    ? 'Nothing here'
    : 'No tasks yet';

  const subtitle = isSearching
    ? 'Try a different search term'
    : isFiltered
    ? 'No tasks match this filter'
    : 'Tap the + button to create your first task';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxl,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
