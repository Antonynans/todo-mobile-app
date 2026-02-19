import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView} from "react-native-safe-area-context"
import Button from "../../src/components/Button";
import TextInput from "../../src/components/TextInput";
import { colors } from "../../src/theme/Colors";
import { spacing } from "../../src/theme/Spacing";
import { typography } from "../../src/theme/Typography";

const SignUpScreen: React.FC = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    setErrors({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    if (!fullName.trim()) {
      setErrors((prev) => ({ ...prev, fullName: "Full name is required" }));
      return;
    }

    if (!email.trim()) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      return;
    }

    if (!validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email" }));
      return;
    }

    if (!password.trim()) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      return;
    }

    if (password.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters",
      }));
      return;
    }

    if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await AsyncStorage.setItem(
        "userToken",
        JSON.stringify({
          email,
          fullName,
          token: "sample-token-" + Date.now(),
        }),
      );

      Alert.alert("Success", "Account created successfully!");

      router.replace("/(home)");
    } catch (error) {
      Alert.alert(
        "Sign Up Error",
        "Failed to create account. Please try again.",
      );
      console.error("Sign up error:", error);
    } finally {
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[6],
    },
    header: {
      alignItems: "center",
      marginBottom: spacing[6],
    },
    logo: {
      width: 40,
      height: 40,
      marginBottom: spacing[3],
    },
    title: {
      fontSize: typography.fontSize["2xl"],
      fontWeight: typography.fontWeight.bold,
      color: colors.textPrimary,
      textAlign: "center",
      marginBottom: spacing[2],
    },
    subtitle: {
      fontSize: typography.fontSize.sm,
      color: colors.textSecondary,
      textAlign: "center",
      marginBottom: spacing[6],
    },
    formContainer: {
      marginBottom: spacing[6],
    },
    errorText: {
      color: colors.error || "#ef4444",
      fontSize: typography.fontSize.xs,
      marginTop: spacing[1],
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: spacing[6],
    },
    footer: {
      alignItems: "center",
    },
    footerText: {
      fontSize: typography.fontSize.sm,
      color: colors.textSecondary,
    },
    linkText: {
      color: colors.primary,
      fontWeight: typography.fontWeight.semiBold,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
          />
        </View>

        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join us to get started</Text>

        <View style={styles.formContainer}>
          <TextInput
            label="Full Name"
            placeholder="John Doe"
            value={fullName}
            onChangeText={setFullName}
            editable={!loading}
          />
          {errors.fullName && (
            <Text style={styles.errorText}>{errors.fullName}</Text>
          )}

          <TextInput
            label="Email address"
            placeholder="your@email.com"
            value={email}
            onChangeText={setEmail}
            editable={!loading}
            style={{ marginTop: spacing[4] }}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <TextInput
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
            style={{ marginTop: spacing[4] }}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <TextInput
            label="Confirm Password"
            placeholder="••••••••"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            editable={!loading}
            style={{ marginTop: spacing[4] }}
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}

          <Button
            title={loading ? "Creating account..." : "Create Account"}
            onPress={handleSignUp}
            loading={loading}
            fullWidth
            size="large"
            style={{ marginTop: spacing[6] }}
            disabled={loading}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account?{" "}
            <Text
              style={styles.linkText}
              onPress={() => router.push("/auth/login")}
            >
              Log in here
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
