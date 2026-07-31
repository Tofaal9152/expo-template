import HomeScreen from "@/features/protected/student/tabs/home";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StudentHomeLayout() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
      edges={["top"]}
    >
      <HomeScreen />
    </SafeAreaView>
  );
}
