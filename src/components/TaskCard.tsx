import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated
} from "react-native";
import { Task } from "../types";
import { Colors, Spacing, Radius, FontSize, FontWeight } from "../utils/theme";
import { formatDate } from "../utils/helpers";

interface TaskCardProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onPress: () => void;
}

export function TaskCard({ task, onToggle, onDelete, onPress }: TaskCardProps) {
  const isCompleted = task.status === "completed";

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={[styles.indicator, isCompleted && styles.indicatorDone]} />

      <View style={styles.body}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={onToggle}
            style={[styles.checkbox, isCompleted && styles.checkboxDone]}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            {isCompleted && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>

          <View style={styles.content}>
            <Text
              style={[styles.title, isCompleted && styles.titleDone]}
              numberOfLines={1}
            >
              {task.title}
            </Text>
            {task.description ? (
              <Text style={styles.description} numberOfLines={2}>
                {task.description}
              </Text>
            ) : null}
            <Text style={styles.date}>{formatDate(task.createdAt)}</Text>
          </View>

          <TouchableOpacity
            onPress={onDelete}
            style={styles.deleteBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.deleteIcon}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.badgeRow}>
          <View
            style={[
              styles.badge,
              isCompleted ? styles.badgeDone : styles.badgePending
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                isCompleted ? styles.badgeTextDone : styles.badgeTextPending
              ]}
            >
              {isCompleted ? "Completed" : "Pending"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.xs,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border
  },
  indicator: {
    width: 4,
    backgroundColor: Colors.warning
  },
  indicatorDone: {
    backgroundColor: Colors.success
  },
  body: {
    flex: 1,
    padding: Spacing.md
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: Radius.sm,
    borderWidth: 2,
    borderColor: Colors.textMuted,
    marginRight: Spacing.sm,
    marginTop: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  checkboxDone: {
    backgroundColor: Colors.success,
    borderColor: Colors.success
  },
  checkmark: {
    color: Colors.background,
    fontSize: 13,
    fontWeight: FontWeight.bold
  },
  content: {
    flex: 1
  },
  title: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: 2
  },
  titleDone: {
    color: Colors.textMuted,
    textDecorationLine: "line-through"
  },
  description: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 4
  },
  date: {
    fontSize: FontSize.xs,
    color: Colors.textMuted
  },
  deleteBtn: {
    marginLeft: Spacing.sm,
    padding: 4
  },
  deleteIcon: {
    fontSize: 14,
    color: Colors.textMuted
  },
  badgeRow: {
    marginTop: Spacing.sm,
    flexDirection: "row"
  },
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.full
  },
  badgePending: {
    backgroundColor: "rgba(251,191,36,0.15)"
  },
  badgeDone: {
    backgroundColor: "rgba(74,222,128,0.15)"
  },
  badgeText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold
  },
  badgeTextPending: {
    color: Colors.warning
  },
  badgeTextDone: {
    color: Colors.success
  }
});
