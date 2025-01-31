import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Image, Dimensions } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { width } = Dimensions.get('window');

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#ffffff',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: undefined,
        tabBarStyle: [
            {backgroundColor: '#C7BEA6', height: width * 0.25,},
            Platform.select({
                ios: {
                    // Use a transparent background on iOS to show the blur effect
                    position: 'absolute',
                },
                default: {},
            }),
        ],
        tabBarLabelStyle: {
          fontSize: width * 0.031,
          fontWeight: '600',
          marginTop: width * 0.08,
        }
       }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '친구',
          tabBarIcon: ({ color }) => <Image
              source={require('@/assets/images/icon/friend.png')} // 자신이 준비한 이미지 경로
              style={{ width: width * 0.132, height: width * 0.132, marginTop: width * 0.08 }}
              resizeMode="contain"
          />,
        }}
      />
      <Tabs.Screen
          name="explore"
          options={{
            title: '채팅',
            tabBarIcon: ({ color }) => <Image
                source={require('@/assets/images/icon/chat.png')} // 자신이 준비한 이미지 경로
                style={{ width: width * 0.132, height: width * 0.132, marginTop: width * 0.08 }}
                resizeMode="contain"
            />,
          }}
      />
      <Tabs.Screen
          name="search_screen"
          options={{
            title: '검색',
            tabBarIcon: ({ color }) => <Image
                source={require('@/assets/images/icon/search.png')} // 자신이 준비한 이미지 경로
                style={{ width: width * 0.132, height: width * 0.132, marginTop: width * 0.08 }}
                resizeMode="contain"
            />,
          }}
      />
      <Tabs.Screen
          name="setting_page"
          options={{
            title: '설정',
            tabBarIcon: ({ color }) => <Image
                source={require('@/assets/images/icon/setting.png')} // 자신이 준비한 이미지 경로
                style={{ width: width * 0.132, height: width * 0.132, marginTop: width * 0.08 }}
                resizeMode="contain"
            />,
          }}
      />
    </Tabs>
  );
}
