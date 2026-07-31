import { Stack } from "expo-router";

export default function StudentStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="doctor/[id]/index"
        options={{
          headerShown: true,
          title: "Consultation",
          headerStyle: { backgroundColor: "#233B4D" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "600" },
        }}
      />
      <Stack.Screen
        name="chat/index"
        options={{
          headerShown: true,
          title: "Chat",
          headerStyle: { backgroundColor: "#233B4D" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "600" },
        }}
      />
      <Stack.Screen
        name="call/index"
        options={{
          headerShown: true,
          title: "Video Call",
          headerStyle: { backgroundColor: "#233B4D" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "600" },
        }}
      />
    </Stack>
  );
}
