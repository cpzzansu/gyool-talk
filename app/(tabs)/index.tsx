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

  const router = useRouter();
  const goProfile = () => {
    router.push("/Profile");
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
              profileImg={userProfileImg}
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

          {/*친구 목록*/}
          {friendsList.map((friend, index) => (
            <ListItem
              id={friend.userNickName}
              profileImg={friend.userProfileImg}
              marginBottom={0.05}
              key={index}
            />
          ))}
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
        style={{ width: width * 0.1, height: width * 0.109 }}
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
