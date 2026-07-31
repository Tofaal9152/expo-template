import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Fragment, ReactNode } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import QueryProvider from "./query-provider";

export default function AppProviders({ children }: { children: ReactNode }) {
  const colorScheme = useColorScheme();
  return (
    <Fragment>
      <QueryProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <SafeAreaProvider>
            {/* <SafeAreaView style={safeAreaStyle}> */}
            <KeyboardProvider>{children}</KeyboardProvider>
            <StatusBar style="auto" animated />
            <Toast />
            {/* </SafeAreaView> */}
          </SafeAreaProvider>
        </ThemeProvider>
      </QueryProvider>
    </Fragment>
  );
}
