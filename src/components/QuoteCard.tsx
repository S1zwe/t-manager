import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Quote } from '../types';
import { Colors, Spacing, Radius, FontSize, FontWeight } from '../utils/theme';

interface QuoteCardProps {
  quote: Quote | null;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

export function QuoteCard({ quote, loading, error, onRefresh }: QuoteCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Daily Motivation</Text>
        <TouchableOpacity onPress={onRefresh} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.refreshIcon}>↻</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator color={Colors.primary} style={{ marginVertical: 8 }} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : quote ? (
        <>
          <Text style={styles.quoteText}>"{quote.content}"</Text>
          <Text style={styles.author}>— {quote.author}</Text>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  label: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.primaryLight,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  refreshIcon: {
    fontSize: 18,
    color: Colors.textSecondary,
  },
  quoteText: {
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
    lineHeight: 20,
    fontStyle: 'italic',
    marginBottom: 6,
  },
  author: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    textAlign: 'right',
  },
  error: {
    fontSize: FontSize.sm,
    color: Colors.error,
    textAlign: 'center',
    paddingVertical: 4,
  },
});
