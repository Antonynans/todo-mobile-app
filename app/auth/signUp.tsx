import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Button from "../../src/components/Button";
import TextInput from "../../src/components/TextInput";
import { colors } from "../../src/theme/Colors";
import { spacing } from "../../src/theme/Spacing";
import { typography } from "../../src/theme/Typography";

const SignUpScreen: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/auth/login");
    }, 2000);
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
      marginBottom: spacing[8],
    },
    logo: {
      width: 80,
      height: 80,
      marginBottom: spacing[4],
    },
    illustration: {
      width: "100%",
      height: 200,
      resizeMode: "contain",
      marginBottom: spacing[6],
    },
    title: {
      fontSize: typography.fontSize["3xl"],
      fontWeight: typography.fontWeight.bold,
      color: colors.textPrimary,
      textAlign: "center",
    },
    formContainer: {
      marginBottom: spacing[6],
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
      marginBottom: spacing[2],
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

        <Image
          source={require("../../assets/images/login-illustration.png")}
          style={styles.illustration}
        />

        <Text style={styles.title}>Sign up</Text>

        <View style={styles.formContainer}>
          <TextInput
            label="Email address"
            placeholder="Email address"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            label="Password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button
            title="Sign up"
            onPress={handleSignUp}
            loading={loading}
            fullWidth
            size="large"
            style={{ marginTop: spacing[6] }}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Registered?{" "}
            <Text
              style={styles.linkText}
              onPress={() => router.push("/auth/login")}
            >
              Login here
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;