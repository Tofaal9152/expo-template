import ProfileScreen from "@/features/protected/student/stack/profile";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileIndex = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <ProfileScreen />
    </SafeAreaView>
  );
};

export default ProfileIndex;
