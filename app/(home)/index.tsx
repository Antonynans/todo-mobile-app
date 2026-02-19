import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import NoteCard from "../../src/components/NoteCard";
import TextInput from "../../src/components/TextInput";
import { colors } from "../../src/theme/Colors";
import { radius, spacing } from "../../src/theme/Spacing";
import { typography } from "../../src/theme/Typography";
import { useNotes } from "./NotesContext";

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const { notes, deleteNote } = useNotes();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const handleAddNote = () => {
    router.push("/(home)/create-note");
  };

  const handleNotePress = (noteId: string) => {
    router.push(`/(home)/note-detail?noteId=${noteId}`);
  };

  const handleDeleteNote = (noteId: string) => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          deleteNote(noteId);
        },
        style: "destructive",
      },
    ]);
  };

  const handleMoreOptions = (noteId: string) => {
    Alert.alert("Options", "What would you like to do?", [
      {
        text: "Delete",
        onPress: () => handleDeleteNote(noteId),
        style: "destructive",
      },
      {
        text: "Lock",
        onPress: () => {
          Alert.alert("Info", "Note locked");
        },
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        onPress: () => {
          router.replace("/auth/login");
        },
        style: "destructive",
      },
    ]);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    header: {
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[4],
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing[4],
    },
    headerTitle: {
      fontSize: typography.fontSize["2xl"],
      fontWeight: typography.fontWeight.bold,
      color: colors.textPrimary,
    },
    signOutButton: {
      paddingHorizontal: spacing[3],
      paddingVertical: spacing[2],
      backgroundColor: colors.primary,
      borderRadius: radius.md,
    },
    signOutButtonText: {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.semiBold,
      color: colors.white,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1.5,
      borderColor: colors.border,
      borderRadius: radius.md,
      paddingHorizontal: spacing[3],
      backgroundColor: colors.white,
    },
    searchInput: {
      flex: 1,
      paddingVertical: spacing[2],
      fontSize: typography.fontSize.base,
      color: colors.textPrimary,
    },
    content: {
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[4],
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: spacing[4],
    },
    emptyImage: {
      width: 120,
      height: 120,
      marginBottom: spacing[4],
      opacity: 0.5,
    },
    emptyText: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.semiBold,
      color: colors.textPrimary,
      marginBottom: spacing[2],
    },
    emptySubText: {
      fontSize: typography.fontSize.base,
      color: colors.textSecondary,
      textAlign: "center",
    },
    fab: {
      position: "absolute",
      bottom: spacing[6],
      right: spacing[6],
      width: 56,
      height: 56,
      borderRadius: radius.full,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    fabText: {
      fontSize: typography.fontSize["2xl"],
      color: colors.white,
      fontWeight: typography.fontWeight.bold,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Notes by Anthony</Text>
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignOut}
          >
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <Text style={{ color: colors.textTertiary, marginRight: spacing[2] }}>
            🔍
          </Text>
          <TextInput
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{ flex: 1, marginBottom: 0 }}
            inputStyle={styles.searchInput}
          />
        </View>
      </View>

      {filteredNotes.length > 0 ? (
        <FlatList
          style={{ flex: 1 }}
          data={filteredNotes}
          renderItem={({ item }) => (
            <NoteCard
              id={item.id}
              title={item.title}
              description={item.description}
              category={item.category}
              date={item.date}
              onPress={() => handleNotePress(item.id)}
              onDelete={() => handleDeleteNote(item.id)}
              onMore={() => handleMoreOptions(item.id)}
              style={{
                marginHorizontal: spacing[4],
                marginVertical: spacing[2],
              }}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.content,
            { flexGrow: 1, paddingBottom: spacing[12] },
          ]}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator
          scrollEventThrottle={16}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No items to display</Text>
          <Text style={styles.emptySubText}>
            Create your first note to get started
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddNote}
        activeOpacity={0.7}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
