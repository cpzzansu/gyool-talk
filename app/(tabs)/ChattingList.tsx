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
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { ThemedView } from "@/components/ThemedView";
import TabsScreenAppBar from "@/components/TabsScreenAppBar";
import { useRouter } from "expo-router";
import {
  Chatroom,
  fetchChatroomApi,
  deleteChattingApi,
  DeleteChatting,
} from "@/redux/apis/chattingList/chattingListApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatTimestamp } from "@/utils/common";

const { width } = Dimensions.get("window");
export default function TabTwoScreen() {
  const { data, isLoading, error } = useQuery<Chatroom[]>({
    queryKey: ["chatroom"],
    queryFn: fetchChatroomApi,
  });

  const router = useRouter();
  const queryClient = useQueryClient(); // ✅ useQueryClient를 컴포넌트 최상단에서 호출

  // 채팅방 삭제 뮤테이션
  const mutation = useMutation<Chatroom, Error, DeleteChatting>({
    mutationFn: deleteChattingApi,
    onSuccess: (data) => {
      console.log("채팅방 삭제 성공:", data);
      queryClient.invalidateQueries(); // ✅ 올바른 방식으로 useQuery를 리페치
    },
    onError: (error) => {
      console.error("채팅방 삭제 실패:", error);
    },
  });

  const handleDelete = (chatId: any) => {
    mutation.mutate({ id: chatId });
  };

  const renderRightActions = (chatId: any) => (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        height: "100%",
        backgroundColor: "red",
      }}
    >
      <RectButton
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
        onPress={() => handleDelete(chatId)}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>삭제</Text>
      </RectButton>
    </View>
  );

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
        <ThemedView
          style={{
            backgroundColor: "#DCD7CB",
            paddingTop: width * 0.06,
            paddingLeft: width * 0.045,
            paddingRight: width * 0.045,
            height: "100%",
          }}
        >
          {data &&
            data.length > 0 &&
            data.map((chat, index) => {
              if (chat.messages.length < 0) {
                return null;
              }
              const message = chat.messages.pop();
              return (
                <Swipeable
                  key={chat.id} // ✅ key를 Swipeable에 직접 부여
                  renderRightActions={() => renderRightActions(chat.id)}
                >
                  <TouchableOpacity
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: width * 0.05,
                    }}
                    onPress={() =>
                      router.push({
                        pathname: "/chattingList/ChatRoom",
                        params: { chatId: chat.id },
                      })
                    }
                  >
                    <ListItem
                      chatroomId={chat.id}
                      chatroomName={chat.chatroomName}
                      lastMessage={message?.content!}
                      timestamp={message?.timestamp!}
                      marginBottom={0.05}
                    />
                  </TouchableOpacity>
                </Swipeable>
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
        width: width * 0.9,
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
            maxWidth: width * 0.55,
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
            numberOfLines={2} // 또는 2로 변경 가능
            ellipsizeMode="tail" // 잘릴 때 '...' 표시
          >
            {lastMessage}
          </Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "flex-end", // Align text to the right
        }}
      >
        <Text
          style={{
            fontSize: width * 0.027,
            fontFamily: "pretendardMedium",
            color: "#848484",
            textAlign: "right", // 오른쪽 정렬 추가
          }}
        >
          {formatTimestamp(timestamp)}
        </Text>
      </View>
    </View>
  );
};
