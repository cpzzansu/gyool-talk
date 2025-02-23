import {
  Image,
  View,
  Text,
  Dimensions,
  AppState,
  ScrollView,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import TabsScreenAppBar from "@/components/TabsScreenAppBar";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";

const data = {
  nickname: "내 아이디",
  friendsList: [
    { nickname: "친구아이디1" },
    { nickname: "친구아이디2" },
    { nickname: "친구아이디3" },
    { nickname: "친구아이디4" },
    { nickname: "친구아이디5" },
    { nickname: "친구아이디6" },
  ],
};

const FirstView = () => {
  const { width } = Dimensions.get("window");

  const { userNickname } = useSelector((state: any) => state.auth);

  const router = useRouter();

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
          <ListItem id={userNickname} marginBottom={0.063} />

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
              친구 {data.friendsList.length}
            </Text>
          </View>

          {/*친구 목록*/}
          {data.friendsList.map((friend, index) => (
            <ListItem id={friend.nickname} marginBottom={0.05} key={index} />
          ))}
        </ThemedView>
      </ScrollView>
    </>
  );
};

// 친구 목록 아이템 컴포넌트
const ListItem = ({
  id,
  marginBottom,
}: {
  id: string;
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
        source={require("@/assets/images/icon/friends-list-profile.png")}
      />
      <Text style={{ fontSize: width * 0.036, fontFamily: "pretendardMedium" }}>
        {id}
      </Text>
    </View>
  );
};

export default FirstView;
