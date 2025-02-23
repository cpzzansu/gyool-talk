import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";

import { FC, ReactNode } from "react";
import { useRouter } from "expo-router";

interface GeneralAppBarProps {
  title: string;
}

const GeneralAppBar: FC<GeneralAppBarProps> = ({ title }) => {
  const { width } = Dimensions.get("window");

  const router = useRouter();
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
      <TouchableOpacity onPress={() => router.back()}>
        <Image
          style={{
            width: width * 0.072,
            height: width * 0.05,
            objectFit: "contain",
          }}
          source={require("@/assets/images/icon/left-arrow.png")}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: width * 0.05,
          fontFamily: "pretendardSemibold",
        }}
      >
        {title}
      </Text>
      <Image style={{ width: width * 0.072 }} />
    </View>
  );
};

export default GeneralAppBar;
