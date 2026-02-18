import React, { useState } from "react";
import {
  TextInput as RNTextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../theme/Colors";
import { radius, spacing } from "../theme/Spacing";
import { typography } from "../theme/Typography";

interface TextInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  error?: string;
  secureTextEntry?: boolean;
  editable?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  style?: ViewStyle;
  inputStyle?: any;
}

const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  value,
  onChangeText,
  label,
  error,
  secureTextEntry = false,
  editable = true,
  multiline = false,
  numberOfLines,
  icon,
  rightIcon,
  onRightIconPress,
  style,
  inputStyle,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing[4],
    },
    label: {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.semiBold,
      color: colors.textPrimary,
      marginBottom: spacing[2],
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: multiline ? "flex-start" : "center",
      borderWidth: 1.5,
      borderColor: isFocused ? colors.primary : colors.border,
      borderRadius: radius.md,
      paddingHorizontal: spacing[3],
      paddingVertical: multiline ? spacing[3] : 0,
      backgroundColor: editable ? colors.white : colors.gray100,
      minHeight: multiline ? 100 : 48,
    },
    input: {
      flex: 1,
      fontSize: typography.fontSize.base,
      color: colors.textPrimary,
      paddingVertical: multiline ? 0 : spacing[3],
      marginLeft: icon ? spacing[2] : 0,
      fontFamily: typography.fontFamily.regular,
    },
    errorText: {
      fontSize: typography.fontSize.xs,
      color: colors.error,
      marginTop: spacing[1],
    },
    iconContainer: {
      marginRight: spacing[2],
    },
    rightIconButton: {
      padding: spacing[2],
      marginLeft: spacing[2],
    },
  });

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputContainer}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}

        <RNTextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {rightIcon && (
          <TouchableOpacity
            style={styles.rightIconButton}
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default TextInput;
