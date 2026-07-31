import { useAuthStore } from "@/store/auth-store";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function ProtectedLayout() {
  const role = useAuthStore((state) => state.role);

  const isStudent = role === "STUDENT";
  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Protected guard={isStudent}>
          <Stack.Screen name="(student)" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
});
