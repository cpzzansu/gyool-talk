import {
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import GeneralAppBar from "@/components/SettingAppBar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import React from "react";
import { clearAuth } from "@/redux/slices/auth/authSlice";

export default function TabFourScreen() {
  const dispatch = useDispatch<AppDispatch>();

  const { width } = Dimensions.get("window");
  return (
    <>
      <GeneralAppBar title={"설정"} />
      <ScrollView style={{ backgroundColor: "#DCD7CB" }}>
        <View
          style={{
            flex: 1,
            paddingTop: width * 0.06,
            paddingLeft: width * 0.045,
            paddingRight: width * 0.045,
          }}
        >
          <TouchableOpacity onPress={() => dispatch(clearAuth())}>
            <Text style={{ fontSize: width * 0.045, fontWeight: 600 }}>
              로그아웃
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
