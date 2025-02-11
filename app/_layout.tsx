import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import store from "../redux/store.js";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet } from "react-native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Provider } from "react-redux";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    pretendard: require("@/assets/fonts/PretendardVariable.ttf"),
    pretendardMedium: require("@/assets/fonts/Pretendard-Medium.ttf"),
    pretendardSemibold: require("@/assets/fonts/Pretendard-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const screenOptions = (param: string): NativeStackNavigationOptions => {
    return {
      title: param,
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
      headerTintColor: "#000",
      headerTitleAlign: "center",
      // headerLeft: () => (
      //   <TouchableOpacity onPress={handleGoBack}>
      //     <ThemedText>back</ThemedText>
      //   </TouchableOpacity>
      // )
    };
  };

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="Login" options={screenOptions("로그인")} />
          <Stack.Screen name="Join" options={screenOptions("회원가입")} />
          <Stack.Screen name="FindId" options={screenOptions("아이디 찾기")} />
          <Stack.Screen
            name="ResetPw"
            options={screenOptions("비밀번호 재설정")}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}
const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#DCD7CB",
  },
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 24,
  },
});
