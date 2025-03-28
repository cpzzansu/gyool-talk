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
import store, { persistor } from "../redux/store";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet } from "react-native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Constants from "expo-constants";
import NaverLogin from "@react-native-seoul/naver-login";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const {
    EXPO_PUBLIC_NAVER_CLIENT_ID,
    EXPO_PUBLIC_NAVER_CLIENT_SECRET,
    EXPO_PUBLIC_NAVER_APP_NAME,
    EXPO_PUBLIC_APP_BUNDLE_IDENTIFIER,
  } = Constants.expoConfig!.extra as {
    EXPO_PUBLIC_NAVER_CLIENT_ID: string;
    EXPO_PUBLIC_NAVER_CLIENT_SECRET: string;
    EXPO_PUBLIC_NAVER_APP_NAME: string;
    EXPO_PUBLIC_APP_BUNDLE_IDENTIFIER: string;
  };

  const appName = EXPO_PUBLIC_NAVER_APP_NAME;
  const consumerKey = EXPO_PUBLIC_NAVER_CLIENT_ID;
  const consumerSecret = EXPO_PUBLIC_NAVER_CLIENT_SECRET;
  const serviceUrlSchemeIOS = EXPO_PUBLIC_APP_BUNDLE_IDENTIFIER;

  useEffect(() => {
    const initNaver = async () => {
      try {
        NaverLogin.initialize({
          appName,
          consumerKey,
          consumerSecret,
          serviceUrlSchemeIOS,
          disableNaverAppAuthIOS: true,
        });
      } catch (error) {
        console.error("NaverLogin 초기화 실패", error);
      }
    };
    initNaver();
  }, []);

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

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 3, // 3회 재시도
        staleTime: 5 * 60 * 1000, // 5분 마다 데이터 갱신
        refetchOnWindowFocus: true,
      },
    },
  });

  return (
    <Provider store={store}>
      <PersistGate loading={false} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="(views)/Profile"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(views)/Nickname"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Login" options={screenOptions("로그인")} />
              <Stack.Screen name="Join" options={screenOptions("회원가입")} />
              <Stack.Screen
                name="FindId"
                options={screenOptions("아이디 찾기")}
              />
              <Stack.Screen
                name="ResetPw"
                options={screenOptions("비밀번호 재설정")}
              />
              <Stack.Screen
                name={"AddFriend"}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={"chattingList/AddChatting"}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={"chattingList/ChatRoom"}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </QueryClientProvider>
      </PersistGate>
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
