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
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { RootState } from "@/redux/reducer";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { useMutation } from "@tanstack/react-query";
import {
  Chatroom,
  CreateChatting,
  createChattingApi,
} from "@/redux/apis/chattingList/chattingListApi";
import { string } from "prop-types";

// const data = {
//   nickname: "내 아이디",
//   friendsList: [
//     { nickname: "친구아이디1" },
//     { nickname: "친구아이디2" },
//     { nickname: "친구아이디3" },
//     { nickname: "친구아이디4" },
//     { nickname: "친구아이디5" },
//     { nickname: "친구아이디6" },
//   ],
// };

const FirstView = () => {
  const { width } = Dimensions.get("window");
  const token = useSelector((state: RootState) => state.auth.token);
  const { userNickname, userProfileImg } = useSelector(
    (state: any) => state.auth,
  );
  const [friendsList, setFriendsList] = useState<any[]>([]);
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null); // 추가: 선택된 친구 ID
  const router = useRouter();
  const goProfile = () => {
    router.push("/Profile");
  };

  // ActionSheet 열기
  const openActionSheet = (friendId: string) => {
    setSelectedFriendId(friendId); // 친구 ID를 상태에 저장
    SheetManager.show("friendOptions", { friendId: friendId } as any);
  };

  // 채팅방 생성 뮤테이션
  const mutation = useMutation<Chatroom, Error, CreateChatting>({
    mutationFn: createChattingApi,
    onSuccess: (data) => {
      console.log("채팅방 생성 성공:", data);
      //대화하기 닫기
      SheetManager.hide("friendOptions");

      router.push({
        pathname: "/chattingList/ChatRoom",
        params: { chatId: data }, // JSON 문자열로 변환
      });
    },
    onError: (error) => {
      console.error("채팅방 생성 실패:", error);
    },
  });

  // 채팅방 생성 버튼 클릭 시 호출되는 함수
  const handleAddChattingClick = () => {
    if (selectedFriendId) {
      mutation.mutate({ friendId: selectedFriendId }); // 선택된 친구 ID로 채팅방 생성
    }
  };

  useEffect(() => {
    if (token) {
      console.log("친구목록조회");
      axios
        .get("http://localhost:8080/active/getFriends", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // 서버에서 응답 받은 데이터 처리
          console.log("응답 데이터:", response.data);
          setFriendsList(response.data);
        })
        .catch((error) => {
          // 오류 처리
          if (error.response) {
            // 서버가 응답을 반환했지만 오류가 발생한 경우
            console.error("서버 응답 오류:", error.response.data);
          } else if (error.request) {
            // 요청이 서버에 도달했지만 응답이 없을 경우
            console.error("응답 없음:", error.request);
          } else {
            // 요청 설정 중 오류가 발생한 경우
            console.error("요청 설정 오류:", error.message);
          }
        });
    }
  }, [token]); // token이 변경될 때마다 실행

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
              onPress={() => openActionSheet(friend.userId)} // 친구 클릭 시 친구 ID 전달
            >
              <ListItem
                id={friend.userNickName}
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
