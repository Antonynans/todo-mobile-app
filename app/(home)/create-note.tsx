import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import Button from "../../src/components/Button";
import TextInput from "../../src/components/TextInput";
import { colors } from "../../src/theme/Colors";
import { radius, spacing } from "../../src/theme/Spacing";
import { typography } from "../../src/theme/Typography";
import { useNotes, Note } from "./NotesContext";

const CATEGORIES = ["Concept", "Idea", "Todo", "Important", "Review"];

const CreateNoteScreen: React.FC = () => {
  const router = useRouter();
  const { addNote } = useNotes();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Concept");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const getCurrentDate = (): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date().toLocaleDateString("en-US", options);
  };

  const handleSave = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      const newNote: Note = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        category: selectedCategory,
        date: getCurrentDate(),
      };

      addNote(newNote);
      
      Alert.alert("Success", "Note created successfully", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    }, 1500);
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
    },
    headerTitle: {
      fontSize: typography.fontSize.xl,
      fontWeight: typography.fontWeight.bold,
      color: colors.textPrimary,
    },
    closeButton: {
      padding: spacing[2],
    },
    closeButtonText: {
      fontSize: typography.fontSize.xl,
      color: colors.textPrimary,
    },
    content: {
      padding: spacing[4],
    },
    inputWrapper: {
      marginBottom: spacing[4],
    },
    label: {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.semiBold,
      color: colors.textPrimary,
      marginBottom: spacing[2],
    },
    categoryContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: spacing[3],
      paddingVertical: spacing[3],
      borderWidth: 1.5,
      borderColor: colors.border,
      borderRadius: radius.md,
      marginBottom: spacing[4],
    },
    categoryText: {
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.semiBold,
      color: colors.textPrimary,
    },
    categoryChevron: {
      fontSize: typography.fontSize.lg,
      color: colors.textSecondary,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: colors.overlay,
      justifyContent: "flex-end",
    },
    modalContent: {
      backgroundColor: colors.white,
      borderTopLeftRadius: radius.xl,
      borderTopRightRadius: radius.xl,
      paddingTop: spacing[4],
      maxHeight: "70%",
    },
    modalHeader: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.bold,
      color: colors.textPrimary,
      paddingHorizontal: spacing[4],
      marginBottom: spacing[4],
    },
    categoryOption: {
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[3],
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    categoryOptionText: {
      fontSize: typography.fontSize.base,
      color: colors.textPrimary,
    },
    selectedIndicator: {
      width: 8,
      height: 8,
      borderRadius: radius.full,
      backgroundColor: colors.primary,
    },
    footer: {
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[4],
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Note</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            placeholder="Enter note title"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Category</Text>
          <TouchableOpacity
            style={styles.categoryContainer}
            onPress={() => setShowCategoryModal(true)}
          >
            <Text style={styles.categoryText}>{selectedCategory}</Text>
            <Text style={styles.categoryChevron}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            placeholder="Enter your note description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={6}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Save"
          onPress={handleSave}
          loading={loading}
          fullWidth
          size="large"
        />
      </View>

      <Modal
        visible={showCategoryModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select Category</Text>
            <FlatList
              data={CATEGORIES}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.categoryOption}
                  onPress={() => {
                    setSelectedCategory(item);
                    setShowCategoryModal(false);
                  }}
                >
                  <Text style={styles.categoryOptionText}>{item}</Text>
                  {selectedCategory === item && (
                    <View style={styles.selectedIndicator} />
                  )}
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
              scrollEnabled={false}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CreateNoteScreen;