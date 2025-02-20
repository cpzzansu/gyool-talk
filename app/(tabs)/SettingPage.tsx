import TabsScreenAppBar from "@/components/TabsScreenAppBar";
import { ScrollView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import SettingAppBar from "@/components/SettingAppBar";

export default function TabFourScreen() {
  return (
    <>
      <SettingAppBar title={"설정"} />
      <ScrollView style={{ backgroundColor: "#DCD7CB" }}></ScrollView>
    </>
  );
}
