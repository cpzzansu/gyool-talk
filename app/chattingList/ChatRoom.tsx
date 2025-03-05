import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
  TextInput,
  Button,
} from "react-native";
import GeneralAppBar from "@/components/GeneralAppBar";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchFriendListApi } from "@/redux/apis/friend/friendApi";
import { Friend } from "@/types/friend";
import UserListItem from "@/components/UserListItem";

const { width, height } = Dimensions.get("window");

// 더미 데이터 (실제 사용 시 서버에서 불러옴)
const dummyMessages = [
  {
    id: "1",
    sender: "friend",
    text: "안녕하세요~ 같이 여행해요.",
    profile: "https://your-image-url.com/friend1.jpg",
  },
  {
    id: "2",
    sender: "me",
    text: "네, 저는 지금 한라산 정상이에요. \n" + "이리로 오세요.",
  },
];

const ChatRoom = () => {
  const [messages, setMessages] = useState(dummyMessages);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { id: Date.now().toString(), sender: "me", text: input },
      ]);
      setInput("");
    }
  };

  const renderMessage = ({ item: item }) => {
    return (
      <View
        style={[
          styles.messageContainer,
          item.sender === "me"
            ? styles.myMessageContainer
            : styles.friendMessageContainer,
        ]}
      >
        {/*{item.sender === "friend" && (*/}
        {/*  <Image source={{ uri: item.profile }} style={styles.profileImage} />*/}
        {/*)}*/}
        <View
          style={[
            styles.messageBubble,
            item.sender === "me"
              ? styles.myMessageBubble
              : styles.friendMessageBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              item.sender === "me" && styles.myMessageText, // ✅ "me"일 때만 적용
            ]}
          >
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      {/* 채팅창 상단 앱바 */}
      <GeneralAppBar title={"대화방"} />

      {/* 채팅 메시지 목록 */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        style={styles.chatContainer}
        //inverted // 최근 메시지가 아래에서 위로 가도록 설정
      />

      {/* 메시지 입력창 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="메시지를 입력하세요..."
          placeholderTextColor="#827F7F"
        />
        <TouchableOpacity style={styles.button} onPress={sendMessage}>
          <Text style={styles.buttonText}>전송</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: "#DCD7CB",
    paddingHorizontal: width * 0.02,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 5,
  },
  myMessageContainer: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
  friendMessageContainer: {
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 5,
    width: width * 0.55,
  },
  myMessageBubble: {
    backgroundColor: "#F29856",
    color: "#FFFFFF",
    alignSelf: "flex-end",
  },
  friendMessageBubble: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: width * 0.03,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#DCD7CB",
    padding: 10,
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    width: width * 0.7,
    backgroundColor: "#EFEFEF",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10, // 버튼과 간격 조정
  },
  button: {
    backgroundColor: "#F29856",
    paddingVertical: width * 0.02,
    paddingHorizontal: width * 0.04,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: width * 0.03,
  },
  myMessageText: {
    color: "#FFFFFF",
  },
});

export default ChatRoom;
