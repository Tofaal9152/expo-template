import SearchScreen from "@/features/protected/student/tabs/search";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchIndex() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <SearchScreen />
    </SafeAreaView>
  );
}
