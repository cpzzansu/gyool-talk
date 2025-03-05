import {
  StyleSheet,
  Image,
  Platform,
  Dimensions,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { ThemedView } from "@/components/ThemedView";
import TabsScreenAppBar from "@/components/TabsScreenAppBar";
import { useRouter } from "expo-router";
import {
  Chatroom,
  fetchChatroomApi,
} from "@/redux/apis/chattingList/chattingListApi";
import { useQuery } from "@tanstack/react-query";

const { width } = Dimensions.get("window");
export default function TabTwoScreen() {
  const { data, isLoading, error } = useQuery<Chatroom[]>({
    queryKey: ["chatroom"],
    queryFn: fetchChatroomApi,
  });

  const router = useRouter();

  return (
    <>
      <TabsScreenAppBar
        title={"채팅"}
        icons={[
          {
            src: require("@/assets/images/icon/chatting-search-icon.png"),
            onPress: () => {},
          },
          {
            src: require("@/assets/images/icon/add-chatting.png"),
            onPress: () => {
              router.push("/chattingList/AddChatting");
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
          {/*친구 목록*/}
          {data &&
            data.length > 0 &&
            data.map((chat, index) => {
              if (chat.messages.length < 0) {
                return null;
              }

              const message = chat.messages.pop();
              return (
                <TouchableOpacity
                  key={index} // 키 추가
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: width * 0.05,
                  }}
                  onPress={() =>
                    router.push(`/chattingList/ChatRoom?id=${chat.id}`)
                  }
                >
                  <ListItem
                    chatroomId={chat.id}
                    chatroomName={chat.chatroomName}
                    lastMessage={message?.content!}
                    timestamp={message?.timestamp!}
                    marginBottom={0.05}
                    key={index}
                  />
                </TouchableOpacity>
              );
            })}
        </ThemedView>
      </ScrollView>
    </>
  );
}

// 친구 목록 아이템 컴포넌트
const ListItem = ({
  chatroomId,
  chatroomName,
  lastMessage,
  timestamp,
  marginBottom,
}: {
  chatroomId: number;
  chatroomName: string;
  lastMessage: string;
  timestamp: string;
  marginBottom: number;
}) => {
  const { width } = Dimensions.get("window");

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: width * marginBottom,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: width * 0.022,
        }}
      >
        <Image
          style={{ width: width * 0.1, height: width * 0.109 }}
          source={require("@/assets/images/icon/friends-list-profile.png")}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: width * 0.005,
          }}
        >
          <Text
            style={{ fontSize: width * 0.029, fontFamily: "pretendardMedium" }}
          >
            {chatroomName}
          </Text>
          <Text
            style={{
              fontSize: width * 0.027,
              fontFamily: "pretendardMedium",
              color: "#848484",
            }}
          >
            {lastMessage}
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: width * 0.027,
            fontFamily: "pretendardMedium",
            color: "#848484",
          }}
        >
          {timestamp}
        </Text>
      </View>
    </View>
  );
};
