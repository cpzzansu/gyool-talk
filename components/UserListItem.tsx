import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { ReactNode } from "react";
const { width, height } = Dimensions.get("window");

const UserListItem = ({
  userProfileImg,
  friendId,
}: {
  userProfileImg: string;
  friendId: string;
}) => {
  return (
    <ItemContainer>
      <UserProfileContainer>
        <UserProfile userProfileImg={userProfileImg} />
        {/* 아이디 (왼쪽) */}
        <UserNickName friendId={friendId} />
      </UserProfileContainer>
      <AddChattingButton onPress={() => {}} />
    </ItemContainer>
  );
};

const AddChattingButton = ({ onPress }: { onPress: Function }) => {
  return (
    <TouchableOpacity onPress={() => {}}>
      <View
        style={{
          width: width * 0.2,
          height: width * 0.08,
          backgroundColor: "#EF7417",
          borderRadius: width * 0.006,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: width * 0.035, color: "#ffffff" }}>
          대화하기
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const UserProfile = ({ userProfileImg }: { userProfileImg: string }) => {
  return (
    <Image
      source={
        userProfileImg
          ? { uri: userProfileImg }
          : require("@/assets/images/gyoolTalk.png")
      }
      style={{
        width: width * 0.1,
        height: width * 0.1,
        resizeMode: "contain", // 원본 비율 유지
      }}
    />
  );
};

const UserNickName = ({ friendId }: { friendId: string }) => {
  return (
    <View>
      <Text
        style={{
          fontSize: width * 0.04,
          color: "#333333",
        }}
      >
        {friendId}
      </Text>
    </View>
  );
};

const UserProfileContainer = ({ children }: { children: ReactNode }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: width * 0.03,
      }}
    >
      {children}
    </View>
  );
};

const ItemContainer = ({ children }: { children: ReactNode }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: width * 0.02,
      }}
    >
      {children}
    </View>
  );
};

export default UserListItem;
