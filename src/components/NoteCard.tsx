import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../theme/Colors";
import { radius, shadows, spacing } from "../theme/Spacing";
import { typography } from "../theme/Typography";

interface NoteCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  onPress?: () => void;
  onDelete?: () => void;
  onMore?: () => void;
  style?: ViewStyle;
}

const NoteCard: React.FC<NoteCardProps> = ({
  id,
  title,
  description,
  category,
  date,
  onPress,
  onDelete,
  onMore,
  style,
}) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      borderRadius: radius.lg,
      padding: spacing[4],
      marginBottom: spacing[3],
      ...shadows.base,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: spacing[3],
    },
    titleContainer: {
      flex: 1,
      marginRight: spacing[3],
    },
    title: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.bold,
      color: colors.textPrimary,
      marginBottom: spacing[2],
    },
    description: {
      fontSize: typography.fontSize.sm,
      color: colors.textSecondary,
      lineHeight: 20,
      marginBottom: spacing[3],
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: spacing[3],
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    categoryBadge: {
      backgroundColor: colors.primary,
      paddingHorizontal: spacing[3],
      paddingVertical: spacing[1],
      borderRadius: radius.full,
    },
    categoryText: {
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.semiBold,
      color: colors.white,
    },
    dateText: {
      fontSize: typography.fontSize.xs,
      color: colors.textTertiary,
    },
    moreButton: {
      padding: spacing[2],
      marginLeft: spacing[2],
    },
    moreButtonText: {
      fontSize: typography.fontSize.lg,
      color: colors.textSecondary,
    },
  });

  const handleMore = () => {
    if (onMore) {
      onMore();
    } else {
      Alert.alert("Options", "What would you like to do?", [
        {
          text: "Delete",
          onPress: onDelete,
          style: "destructive",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.container, style]}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
        </View>
        <TouchableOpacity style={styles.moreButton} onPress={handleMore}>
          <Text style={styles.moreButtonText}>⋮</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.description} numberOfLines={3}>
        {description}
      </Text>

      <View style={styles.footer}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
        <Text style={styles.dateText}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NoteCard;
