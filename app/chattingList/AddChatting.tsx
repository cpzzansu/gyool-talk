import { View, Text, StyleSheet, ScrollView } from "react-native";
import GeneralAppBar from "@/components/GeneralAppBar";
import { useQuery } from "@tanstack/react-query";
import { fetchFriendListApi } from "@/redux/apis/friend/friendApi";
import { Friend } from "@/types/friend";

const AddChatting = () => {
  const { data, isLoading, error } = useQuery<Friend[]>({
    queryKey: ["friend"],
    queryFn: fetchFriendListApi,
  });

  return (
    <>
      <GeneralAppBar title={"대화상대 선택"} />
      <ScrollView style={styles.container}></ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#DCD7CB" },
});

export default AddChatting;
