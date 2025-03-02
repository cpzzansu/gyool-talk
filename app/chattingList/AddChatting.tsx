import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import GeneralAppBar from "@/components/GeneralAppBar";
import { useQuery } from "@tanstack/react-query";
import { fetchFriendListApi } from "@/redux/apis/friend/friendApi";
import { Friend } from "@/types/friend";
import UserListItem from "@/components/UserListItem";

const { width, height } = Dimensions.get("window");

const AddChatting = () => {
  const { data, isLoading, error } = useQuery<Friend[]>({
    queryKey: ["friend"],
    queryFn: fetchFriendListApi,
  });

  return (
    <>
      <GeneralAppBar title={"대화상대 선택"} />
      <ScrollView
        style={{
          backgroundColor: "#DCD7CB",
          padding: width * 0.02,
        }}
      >
        {data &&
          data.length > 0 &&
          data.map((friend: Friend) => (
            <UserListItem
              userProfileImg={friend.userProfileImg}
              friendId={
                friend.friendNickName
                  ? friend.friendNickName
                  : friend.friendUserNickName
              }
              key={friend.id}
            />
          ))}
      </ScrollView>
    </>
  );
};

export default AddChatting;
