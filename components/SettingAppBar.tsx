import { Dimensions, Image, Text, View } from "react-native";

import { FC, ReactNode } from "react";

interface SettingAppBarProps {
  title: string;
}

const SettingAppBar: FC<SettingAppBarProps> = ({ title }) => {
  const { width } = Dimensions.get("window");
  return (
    <View
      style={{
        backgroundColor: "#DCD7CB",
        paddingTop: width * 0.2,
        paddingBottom: width * 0.05,
        paddingLeft: width * 0.045,
        paddingRight: width * 0.045,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Image
        style={{
          width: width * 0.072,
          height: width * 0.05,
          objectFit: "contain",
        }}
        source={require("@/assets/images/icon/left-arrow.png")}
      />
      <Text
        style={{
          fontSize: width * 0.05,
          fontFamily: "pretendardSemibold",
        }}
      >
        설정
      </Text>
      <Image style={{ width: width * 0.072 }} />
    </View>
  );
};

export default SettingAppBar;
