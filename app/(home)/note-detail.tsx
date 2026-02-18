import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Button from "../../src/components/Button";
import TextInput from "../../src/components/TextInput";
import { colors } from "../../src/theme/Colors";
import { radius, spacing } from "../../src/theme/Spacing";
import { typography } from "../../src/theme/Typography";
import { useNotes } from "./NotesContext";

const NoteDetailScreen: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { getNoteById, deleteNote, updateNote } = useNotes();

  const noteId = params.noteId as string;
  const originalNote = getNoteById(noteId);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (originalNote) {
      setTitle(originalNote.title);
      setDescription(originalNote.description);
      setCategory(originalNote.category);
      setDate(originalNote.date);
    }
  }, [originalNote]);

  if (!originalNote) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Note not found</Text>
      </SafeAreaView>
    );
  }

  const handleSave = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      updateNote(noteId, {
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
      });
      setIsEditing(false);
      Alert.alert("Success", "Note updated successfully");
    }, 1500);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${title}\n\n${description}\n\nCategory: ${category}\nDate: ${date}`,
        title: title,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleDelete = () => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          deleteNote(noteId);
          router.back();
        },
        style: "destructive",
      },
    ]);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[4],
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.white,
    },
    headerButton: {
      padding: spacing[2],
    },
    headerButtonText: {
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.semiBold,
      color: colors.primary,
    },
    closeButton: {
      padding: spacing[2],
    },
    closeButtonText: {
      fontSize: typography.fontSize.xl,
      color: colors.textPrimary,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[4],
      paddingBottom: isEditing ? spacing[20] : spacing[4],
    },
    viewSection: {
      marginBottom: spacing[6],
    },
    label: {
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.bold,
      color: colors.textTertiary,
      textTransform: "uppercase",
      marginBottom: spacing[2],
    },
    title: {
      fontSize: typography.fontSize["2xl"],
      fontWeight: typography.fontWeight.bold,
      color: colors.textPrimary,
      marginBottom: spacing[4],
    },
    description: {
      fontSize: typography.fontSize.base,
      lineHeight: 24,
      color: colors.textSecondary,
      marginBottom: spacing[4],
    },
    metaContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: spacing[4],
      borderTopWidth: 1,
      borderTopColor: colors.border,
      marginBottom: spacing[6],
    },
    categoryBadge: {
      backgroundColor: colors.primary,
      paddingHorizontal: spacing[3],
      paddingVertical: spacing[1],
      borderRadius: radius.full,
    },
    categoryText: {
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.bold,
      color: colors.white,
    },
    dateText: {
      fontSize: typography.fontSize.sm,
      color: colors.textTertiary,
    },
    actionButtons: {
      flexDirection: "row",
      gap: spacing[3],
      marginBottom: spacing[6],
    },
    actionButton: {
      flex: 1,
      paddingVertical: spacing[3],
      paddingHorizontal: spacing[4],
      borderRadius: radius.md,
      alignItems: "center",
      justifyContent: "center",
    },
    shareButton: {
      backgroundColor: colors.gray100,
    },
    deleteButton: {
      backgroundColor: colors.gray100,
    },
    actionButtonText: {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.semiBold,
      color: colors.textPrimary,
    },
    footer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[4],
      borderTopWidth: 1,
      borderTopColor: colors.border,
      backgroundColor: colors.white,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => setIsEditing(!isEditing)}
        >
          <Text style={styles.headerButtonText}>
            {isEditing ? "Cancel" : "Edit"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
          scrollEventThrottle={16}
          nestedScrollEnabled={true}
        >
          {isEditing ? (
            <>
              <TextInput
                label="Title"
                value={title}
                onChangeText={setTitle}
                placeholder="Note title"
              />
              <TextInput
                label="Description"
                value={description}
                onChangeText={setDescription}
                placeholder="Note description"
                multiline
                numberOfLines={6}
              />
              <TextInput
                label="Category"
                value={category}
                onChangeText={setCategory}
                placeholder="Category"
              />
            </>
          ) : (
            <>
              <View style={styles.viewSection}>
                <Text style={styles.title}>{title}</Text>
              </View>

              <View style={styles.viewSection}>
                <Text style={styles.label}>Description</Text>
                <Text style={styles.description}>{description}</Text>
              </View>

              <View style={styles.metaContainer}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{category}</Text>
                </View>
                <Text style={styles.dateText}>{date}</Text>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.shareButton]}
                  onPress={handleShare}
                >
                  <Text style={styles.actionButtonText}>📤 Share</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={handleDelete}
                >
                  <Text style={styles.actionButtonText}>🗑️ Delete</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {isEditing && (
        <View style={styles.footer}>
          <Button
            title="Save Changes"
            onPress={handleSave}
            loading={loading}
            fullWidth
            size="large"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default NoteDetailScreen;