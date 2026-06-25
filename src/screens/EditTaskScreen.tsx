import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useTaskContext } from '../store/TaskContext';
import { FormInput } from '../components/FormInput';
import { Colors, Spacing, Radius, FontSize, FontWeight } from '../utils/theme';
import { validateTitle, validateDescription } from '../utils/helpers';

type Props = NativeStackScreenProps<RootStackParamList, 'EditTask'>;

export function EditTaskScreen({ navigation, route }: Props) {
  const { taskId } = route.params;
  const { tasks, updateTask } = useTaskContext();
  const task = tasks.find((t) => t.id === taskId);

  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');
  const [titleError, setTitleError] = useState<string | null>(null);
  const [descError, setDescError] = useState<string | null>(null);

  useEffect(() => {
    if (!task) navigation.goBack();
  }, [task]);

  if (!task) return null;

  function handleSave() {
    const tErr = validateTitle(title);
    const dErr = validateDescription(description);
    setTitleError(tErr);
    setDescError(dErr);
    if (tErr || dErr) return;

    updateTask({
      ...task!,
      title: title.trim(),
      description: description.trim(),
    });
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.heading}>Edit Task</Text>
          <Text style={styles.subheading}>Make your changes below</Text>

          <View style={styles.form}>
            <FormInput
              label="Title"
              required
              value={title}
              onChangeText={(t) => {
                setTitle(t);
                if (titleError) setTitleError(validateTitle(t));
              }}
              placeholder="e.g. Review pull request"
              error={titleError}
              charCount={title.length}
              maxChars={80}
              returnKeyType="next"
              autoFocus
            />

            <FormInput
              label="Description"
              value={description}
              onChangeText={(d) => {
                setDescription(d);
                if (descError) setDescError(validateDescription(d));
              }}
              placeholder="Optional — add some detail..."
              error={descError}
              multiline
              charCount={description.length}
              maxChars={300}
            />
          </View>
        </ScrollView>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleSave}
            activeOpacity={0.85}
          >
            <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  heading: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 4,
    marginTop: Spacing.sm,
  },
  subheading: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },
  form: {
    gap: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    padding: Spacing.md,
    paddingBottom: Platform.OS === 'ios' ? Spacing.lg : Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  cancelBtn: {
    flex: 1,
    height: 50,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cancelText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
  },
  saveBtn: {
    flex: 2,
    height: 50,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  saveText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
});
