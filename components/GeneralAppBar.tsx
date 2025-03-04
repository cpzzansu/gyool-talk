import {
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { FC, ReactNode } from "react";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface GeneralAppBarProps {
  title: string;
}

const GeneralAppBar: FC<GeneralAppBarProps> = ({ title }) => {
  const { width } = Dimensions.get("window");

  const insets = useSafeAreaInsets();

  const router = useRouter();
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#DCD7CB",
        paddingTop: insets.top,
        height: width * 0.3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ marginLeft: width * 0.045 }}
      >
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
      <Image style={{ width: width * 0.072, marginRight: width * 0.045 }} />
    </SafeAreaView>
  );
};

export default GeneralAppBar;
