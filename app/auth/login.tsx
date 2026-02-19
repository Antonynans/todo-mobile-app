import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../src/components/Button";
import TextInput from "../../src/components/TextInput";
import { colors } from "../../src/theme/Colors";
import { spacing } from "../../src/theme/Spacing";
import { typography } from "../../src/theme/Typography";

const LogInScreen: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogIn = async () => {
    setErrors({ email: "", password: "" });

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

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await AsyncStorage.setItem(
        "userToken",
        JSON.stringify({
          email,
          token: "sample-token-" + Date.now(),
        }),
      );

      router.replace("/(home)");
    } catch (error) {
      Alert.alert("Login Error", "Failed to log in. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    scrollView: {
      flexGrow: 1,
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[6],
    },
    header: {
      alignItems: "center",
      marginBottom: spacing[8],
    },
    logo: {
      width: 40,
      height: 40,
      marginBottom: spacing[4],
    },
    illustration: {
      width: "100%",
      height: 100,
      resizeMode: "contain",
      marginBottom: spacing[6],
    },
    title: {
      fontSize: typography.fontSize["3xl"],
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
      paddingBottom: spacing[4],
    },
    footerRow: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: spacing[2],
    },
    footerText: {
      fontSize: typography.fontSize.sm,
      color: colors.textSecondary,
      marginBottom: spacing[2],
    },
    linkText: {
      color: colors.primary,
      fontWeight: typography.fontWeight.semiBold,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
      >
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
          />
        </View>

        <Image
          source={require("../../assets/images/login-illustration.png")}
          style={styles.illustration}
        />

        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Log in to your account to continue</Text>

        <View style={styles.formContainer}>
          <TextInput
            label="Email address"
            placeholder="your@email.com"
            value={email}
            onChangeText={setEmail}
            editable={!loading}
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

          <Button
            title={loading ? "Logging in..." : "Log in"}
            onPress={handleLogIn}
            loading={loading}
            fullWidth
            size="large"
            style={{ marginTop: spacing[6] }}
            disabled={loading}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.footer}>
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Don&apos;t have an account? </Text>
            <Text
              style={[styles.footerText, styles.linkText]}
              onPress={() => router.push("/auth/signUp")}
            >
              Sign up here
            </Text>
          </View>
          <Text
            style={[styles.footerText, styles.linkText]}
            onPress={() => console.log("TODO: Implement forgot password")}
          >
            Forgot password?
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LogInScreen;