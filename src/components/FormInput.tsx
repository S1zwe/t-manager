import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { Colors, Spacing, Radius, FontSize, FontWeight } from '../utils/theme';

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string | null;
  required?: boolean;
  charCount?: number;
  maxChars?: number;
}

export function FormInput({
  label,
  error,
  required,
  charCount,
  maxChars,
  ...inputProps
}: FormInputProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
        {maxChars !== undefined && charCount !== undefined && (
          <Text style={[styles.charCount, charCount > maxChars && styles.charCountOver]}>
            {charCount}/{maxChars}
          </Text>
        )}
      </View>
      <TextInput
        style={[
          styles.input,
          inputProps.multiline && styles.inputMultiline,
          error ? styles.inputError : null,
        ]}
        placeholderTextColor={Colors.textMuted}
        {...inputProps}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Spacing.md,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  required: {
    color: Colors.error,
  },
  charCount: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  charCountOver: {
    color: Colors.error,
  },
  input: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputMultiline: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  inputError: {
    borderColor: Colors.error,
  },
  error: {
    fontSize: FontSize.xs,
    color: Colors.error,
    marginTop: 4,
    marginLeft: 2,
  },
});
