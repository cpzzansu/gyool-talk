import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import React, { ReactNode } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChattingApi } from "@/redux/apis/chattingList/chattingListApi";
import {
  CreateChatting,
  Chatroom,
} from "@/redux/apis/chattingList/chattingListApi";
const { width, height } = Dimensions.get("window");

const UserListItem = ({
  userProfileImg,
  friendId,
}: {
  userProfileImg: string;
  friendId: string;
}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Chatroom, Error, CreateChatting>({
    mutationFn: createChattingApi,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const handleAddChattingClick = () => {
    mutation.mutate({ friendId });
  };

  return (
    <ItemContainer>
      <UserProfileContainer>
        <UserProfile userProfileImg={userProfileImg} />
        {/* 아이디 (왼쪽) */}
        <UserNickName friendId={friendId} />
      </UserProfileContainer>
      <AddChattingButton onPress={handleAddChattingClick} />
    </ItemContainer>
  );
};

const AddChattingButton = ({ onPress }: { onPress: Function }) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={styles.addChattingButton}>
        <Text style={styles.addChattingButtonText}>대화하기</Text>
      </View>
    </TouchableOpacity>
  );
};

const UserProfile = React.memo(
  ({ userProfileImg }: { userProfileImg: string }) => {
    return (
      <Image
        source={
          userProfileImg
            ? { uri: userProfileImg }
            : require("@/assets/images/gyoolTalk.png")
        }
        style={styles.userProfile}
      />
    );
  },
);

const UserNickName = ({ friendId }: { friendId: string }) => {
  return (
    <View>
      <Text style={styles.userNickName}>{friendId}</Text>
    </View>
  );
};

const UserProfileContainer = ({ children }: { children: ReactNode }) => {
  return <View style={styles.userProfileContainer}>{children}</View>;
};

const ItemContainer = ({ children }: { children: ReactNode }) => {
  return <View style={styles.itemContainer}>{children}</View>;
};

const styles = StyleSheet.create({
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: width * 0.02,
  },
  userProfileContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: width * 0.03,
  },
  userProfile: {
    width: width * 0.1,
    height: width * 0.1,
    resizeMode: "contain", // 원본 비율 유지
  },
  userNickName: {
    fontSize: width * 0.04,
    color: "#333333",
  },
  addChattingButton: {
    width: width * 0.2,
    height: width * 0.08,
    backgroundColor: "#EF7417",
    borderRadius: width * 0.006,
    justifyContent: "center",
    alignItems: "center",
  },
  addChattingButtonText: { fontSize: width * 0.035, color: "#ffffff" },
});

export default UserListItem;
