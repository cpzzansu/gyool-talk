import {
  Dimensions,
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { FC, ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface IconItem {
  src: ImageSourcePropType;
  onPress: (event: GestureResponderEvent) => void;
}

interface TabsScreenAppBarProps {
  title: string;
  icons: IconItem[];
}

const TabsScreenAppBar: FC<TabsScreenAppBarProps> = ({ title, icons }) => {
  const insets = useSafeAreaInsets();
  const { width } = Dimensions.get("window");
  return (
    <View
      style={{
        backgroundColor: "#DCD7CB",
        paddingTop: insets.top,
        height: width * 0.35,
        paddingLeft: width * 0.045,
        paddingRight: width * 0.045,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <ThemedText type={"tabsScreenTitle"}>{title}</ThemedText>
      <AppBarIconContainer>
        {icons.map((icon, index) => (
          <AppBarIcon src={icon.src} key={index} onPress={icon.onPress} />
        ))}
      </AppBarIconContainer>
    </View>
  );
};

const AppBarIconContainer = ({ children }: { children: ReactNode }) => {
  const { width } = Dimensions.get("window");

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: width * 0.022,
      }}
    >
      {children}
    </View>
  );
};

const AppBarIcon = ({
  src,
  onPress,
}: {
  src: ImageSourcePropType;
  onPress: (event: GestureResponderEvent) => void;
}) => {
  const { width } = Dimensions.get("window");

  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        style={{
          width: width * 0.072,
          height: width * 0.072,
          resizeMode: "contain",
        }}
        source={src}
      />
    </TouchableOpacity>
  );
};

export default TabsScreenAppBar;
