import SettingScreen from "@/features/protected/student/tabs/settings";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsIndex() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
      edges={["top"]}
    >
      <SettingScreen />
    </SafeAreaView>
  );
}
