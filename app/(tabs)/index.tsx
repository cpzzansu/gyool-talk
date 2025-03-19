import {
  Image,
  View,
  Text,
  Dimensions,
  AppState,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import TabsScreenAppBar from "@/components/TabsScreenAppBar";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { RootState } from "@/redux/reducer";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Chatroom,
  CreateChatting,
  createChattingApi,
} from "@/redux/apis/chattingList/chattingListApi";
import { login } from "@/redux/slices/auth/authThunk";
import { fetchFriendList } from "@/redux/slices/friend/friendThunk";
import { AppDispatch } from "@/redux/store";
import { Friend } from "@/types/friend";
import { fetchFriendListApi } from "@/redux/apis/friend/friendApi";

const FirstView = () => {
  const { width } = Dimensions.get("window");
  const { userNickname, userProfileImg } = useSelector(
    (state: any) => state.auth,
  );
  const [friendsList, setFriendsList] = useState<any[]>([]);
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null); // 추가: 선택된 친구 ID
  const [selectedFriendNickname, setSelectedFriendNickname] =
    useState<string>(""); //선택된 친구 닉네임
  const router = useRouter();
  const goProfile = () => {
    router.push("/Profile");
  };

  // useQuery로 친구 목록 불러오기
  const { data, isLoading, error } = useQuery<Friend[]>({
    queryKey: ["friend"],
    queryFn: fetchFriendListApi,
  });

  // friendsList 상태 업데이트
  useEffect(() => {
    if (data) {
      setFriendsList(data); // data가 존재하면 friendsList 업데이트
    }
  }, [data]);

  // ActionSheet 열기
  const openActionSheet = (
    friendId: string,
    friendNickname: string,
    friendProfileImg: string,
  ) => {
    setSelectedFriendId(friendId); // 친구 ID를 상태에 저장
    setSelectedFriendNickname(friendNickname); // 친구 닉네임를 상태에 저장
    SheetManager.show("friendOptions", {
      friendId: friendId,
      friendNickName: friendNickname,
    } as any);
  };

  // 채팅방 생성 뮤테이션
  const mutation = useMutation<Chatroom, Error, CreateChatting>({
    mutationFn: createChattingApi,
    onSuccess: (data) => {
      console.log("채팅방 생성 성공:", data);
      // 대화하기 닫기
      SheetManager.hide("friendOptions");

      // profileImg를 params에 포함시켜서 채팅방 화면으로 이동
      router.push({
        pathname: "/chattingList/ChatRoom",
        params: {
          chatId: data,
        },
      });
    },
    onError: (error) => {
      console.error("채팅방 생성 실패:", error);
    },
  });

  // 채팅방 생성 버튼 클릭 시 호출되는 함수
  const handleAddChattingClick = () => {
    if (selectedFriendId) {
      mutation.mutate({
        friendId: selectedFriendId,
        friendNickname: selectedFriendNickname,
        userNickname: userNickname,
      });
    }
  };

  return (
    <>
      <TabsScreenAppBar
        title={"친구"}
        icons={[
          {
            src: require("@/assets/images/icon/search-icon.png"),
            onPress: () => {},
          },
          {
            src: require("@/assets/images/icon/add-friend-icon.png"),
            onPress: () => {
              router.push("/AddFriend");
            },
          },
        ]}
      />
      <ScrollView style={{ backgroundColor: "#DCD7CB" }}>
        {/*Tabs Screen App Bar*/}
        <ThemedView
          style={{
            backgroundColor: "#DCD7CB",
            paddingTop: width * 0.06,
            paddingLeft: width * 0.045,
            paddingRight: width * 0.045,
            height: "100%",
          }}
        >
          {/*내 프로필 아이템*/}
          <TouchableOpacity onPress={goProfile}>
            <ListItem
              id={userNickname}
              profileImg={
                userProfileImg
                  ? `http://localhost:8080/images/profile/${userProfileImg}`
                  : ""
              }
              marginBottom={0.063}
            />
          </TouchableOpacity>
          {/*구분선*/}
          <View
            style={{ borderBottomWidth: 1, borderBottomColor: "#e4e4e4" }}
          />
          {/*친구 수*/}
          <View style={{ marginTop: width * 0.034 }}>
            <Text
              style={{
                fontSize: width * 0.03,
                marginBottom: width * 0.013,
                fontFamily: "pretendardMedium",
              }}
            >
              친구 {friendsList.length}
            </Text>
          </View>

          {/* 친구 목록 */}
          {friendsList.map((friend) => (
            <TouchableOpacity
              key={friend.userId}
              onPress={() =>
                openActionSheet(
                  friend.userId,
                  friend.friendNickName,
                  friend.userProfileImg,
                )
              }
            >
              <ListItem
                id={friend.friendNickName} // 기본값 추가
                profileImg={
                  friend.userProfileImg
                    ? `http://localhost:8080/images/profile/${friend.userProfileImg}`
                    : ""
                }
                marginBottom={0.05}
              />
            </TouchableOpacity>
          ))}

          <ActionSheet id="friendOptions">
            <View style={{ padding: 20 }}>
              <TouchableOpacity onPress={handleAddChattingClick}>
                <Text style={{ fontSize: 18 }}>대화하기</Text>
              </TouchableOpacity>
            </View>
          </ActionSheet>
        </ThemedView>
      </ScrollView>
    </>
  );
};

// 친구 목록 아이템 컴포넌트
const ListItem = ({
  id,
  profileImg,
  marginBottom,
}: {
  id: string;
  profileImg: string;
  marginBottom: number;
}) => {
  const { width } = Dimensions.get("window");

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: width * 0.022,
        marginBottom: width * marginBottom,
      }}
    >
      <Image
        style={{ width: width * 0.1, height: width * 0.109, borderRadius: 100 }}
        source={
          profileImg
            ? { uri: profileImg }
            : require("@/assets/images/icon/friends-list-profile.png")
        }
      />
      <Text style={{ fontSize: width * 0.036, fontFamily: "pretendardMedium" }}>
        {id}
      </Text>
    </View>
  );
};

export default FirstView;
