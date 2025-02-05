import { Dimensions, Image, ImageSourcePropType, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { FC, ReactNode } from "react";

interface IconItem {
  src: ImageSourcePropType;
}

interface TabsScreenAppBarProps {
  title: string;
  icons: IconItem[];
}

const TabsScreenAppBar: FC<TabsScreenAppBarProps> = ({ title, icons }) => {
  return (
    <View
      style={{
        paddingTop: "20%",
        paddingBottom: "11%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <ThemedText type={"tabsScreenTitle"}>{title}</ThemedText>
      <AppBarIconContainer>
        {icons.map((icon) => (
          <AppBarIcon src={icon.src} />
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

const AppBarIcon = ({ src }: { src: ImageSourcePropType }) => {
  const { width } = Dimensions.get("window");

  return (
    <Image
      style={{
        width: width * 0.072,
        height: width * 0.072,
        resizeMode: "contain",
      }}
      source={src}
    />
  );
};

export default TabsScreenAppBar;
