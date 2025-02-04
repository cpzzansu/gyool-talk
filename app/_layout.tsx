import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import {StyleSheet} from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const screenOptions = (param: string) => {
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
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="Login" options={screenOptions('로그인')} />
        <Stack.Screen name="Join" options={screenOptions('회원가입')} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#DCD7CB',
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 24,
  }
});