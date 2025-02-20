import { Dimensions, View } from "react-native";
import WebView from "react-native-webview";

export default function TabThreeScreen() {
  const { width } = Dimensions.get("window");
  return (
    <View
      style={{ flex: 1, paddingTop: width * 0.15, backgroundColor: "#fff" }}
    >
      <WebView source={{ uri: "https://www.google.com" }} style={{ flex: 1 }} />
    </View>
  );
}
