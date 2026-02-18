import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signUp" options={{ title: 'Sign Up' }} />
      <Stack.Screen name="login" options={{ title: 'Log In' }} />
    </Stack>
  );
}