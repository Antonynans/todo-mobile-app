import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../theme/Colors";
import { radius, spacing } from "../theme/Spacing";
import { typography } from "../theme/Typography";

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  style,
  textStyle,
  fullWidth = false,
}) => {
  const sizeStyles = {
    small: {
      paddingHorizontal: spacing[3],
      paddingVertical: spacing[2],
      minHeight: 36,
    },
    medium: {
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[3],
      minHeight: 48,
    },
    large: {
      paddingHorizontal: spacing[6],
      paddingVertical: spacing[4],
      minHeight: 56,
    },
  };

  const variantStyles = {
    primary: {
      backgroundColor: colors.primary,
      borderWidth: 0,
    },
    secondary: {
      backgroundColor: colors.gray200,
      borderWidth: 0,
    },
    outline: {
      backgroundColor: colors.white,
      borderWidth: 1.5,
      borderColor: colors.primary,
    },
    ghost: {
      backgroundColor: "transparent",
      borderWidth: 0,
    },
  };

  const textColorByVariant = {
    primary: colors.white,
    secondary: colors.textPrimary,
    outline: colors.primary,
    ghost: colors.primary,
  };

  const fontSizeBySize = {
    small: typography.fontSize.sm,
    medium: typography.fontSize.base,
    large: typography.fontSize.lg,
  };

  const styles = StyleSheet.create({
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: radius.md,
      ...sizeStyles[size],
      ...variantStyles[variant],
      opacity: disabled ? 0.6 : 1,
      width: fullWidth ? "100%" : "auto",
    },
    text: {
      fontSize: fontSizeBySize[size],
      fontWeight: typography.fontWeight.semiBold,
      color: textColorByVariant[variant],
      marginHorizontal: icon ? spacing[2] : 0,
    },
    content: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[styles.button, style]}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={textColorByVariant[variant]}
            style={{ marginRight: spacing[2] }}
          />
        ) : iconPosition === "left" && icon ? (
          <View style={{ marginRight: spacing[2] }}>{icon}</View>
        ) : null}

        <Text style={[styles.text, textStyle]}>{title}</Text>

        {!loading && iconPosition === "right" && icon ? (
          <View style={{ marginLeft: spacing[2] }}>{icon}</View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
