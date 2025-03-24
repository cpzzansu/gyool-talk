import { Tabs, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Platform, Image, Dimensions } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/reducer";

import Login from "../Login";
import { jwtDecode } from "jwt-decode";
import { clearAuth } from "@/redux/slices/auth/authSlice";

export default function TabLayout() {
  const { width } = Dimensions.get("window");

  const dispatch = useDispatch();

  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (typeof token !== "string") return;

    const decoded = jwtDecode(token);
    const currentTime = Date.now();
    const tokenExpirationTime = decoded.exp! * 1000;
    const delay = tokenExpirationTime - currentTime;

    if (delay <= 0) {
      dispatch(clearAuth());
    } else {
      const timer = setTimeout(() => {
        dispatch(clearAuth());
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [token]);

  if (typeof token !== "string") {
    return <Login />;
  }
  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  if (decoded.exp! < currentTime) {
    dispatch(clearAuth());
    return <Login />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#ffffff",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: undefined,
        tabBarStyle: [
          { backgroundColor: "#C7BEA6", height: width * 0.25 },
          Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
            },
            default: {},
          }),
        ],
        tabBarLabelStyle: {
          fontSize: width * 0.031,
          fontWeight: "600",
          marginTop: width * 0.08,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "친구",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/images/icon/friend.png")} // 자신이 준비한 이미지 경로
              style={{
                width: width * 0.132,
                height: width * 0.132,
                marginTop: width * 0.08,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ChattingList"
        options={{
          title: "채팅",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/images/icon/chat.png")} // 자신이 준비한 이미지 경로
              style={{
                width: width * 0.132,
                height: width * 0.132,
                marginTop: width * 0.08,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="SearchScreen"
        options={{
          title: "검색",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/images/icon/search.png")} // 자신이 준비한 이미지 경로
              style={{
                width: width * 0.132,
                height: width * 0.132,
                marginTop: width * 0.08,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="SettingPage"
        options={{
          title: "설정",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/images/icon/setting.png")} // 자신이 준비한 이미지 경로
              style={{
                width: width * 0.132,
                height: width * 0.132,
                marginTop: width * 0.08,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
}
