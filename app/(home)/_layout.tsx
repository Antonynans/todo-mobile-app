import { Stack } from 'expo-router';
import { NotesProvider } from './NotesContext';

export default function HomeLayout() {
  return (
    <NotesProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen 
          name="create-note" 
          options={{ 
            presentation: 'modal',
            title: 'Create Note' 
          }} 
        />
        <Stack.Screen 
          name="note-detail" 
          options={{ 
            title: 'Note Details' 
          }} 
        />
      </Stack>
    </NotesProvider>
  );
}