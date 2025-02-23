import { ScrollView } from "react-native";
import GeneralAppBar from "@/components/SettingAppBar";

export default function TabFourScreen() {
  return (
    <>
      <GeneralAppBar title={"설정"} />
      <ScrollView style={{ backgroundColor: "#DCD7CB" }}></ScrollView>
    </>
  );
}
