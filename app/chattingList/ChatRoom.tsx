import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import GeneralAppBar from "@/components/GeneralAppBar";
import { fetchMessageApi } from "@/redux/apis/chattingList/chattingListApi";
import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/reducer";
import { Message } from "@/redux/apis/chattingList/chattingListApi";
import * as WebSocketUtils from "@/utils/webSocket";
import { Client } from "@stomp/stompjs";
import { useQuery } from "@tanstack/react-query";
const { width } = Dimensions.get("window");

const ChatRoom = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const { chatId } = useLocalSearchParams<{ chatId?: number }>();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sendMessage, setSendMessage] = useState<
    ((messageDto: Message) => void) | null
  >(null);

  const { data, isLoading, error } = useQuery<Message[]>({
    queryKey: ["chatId", chatId], // chatId를 queryKey에 추가하여, chatId가 바뀌면 새로 데이터를 가져오도록 설정
    queryFn: () => fetchMessageApi(chatId), // fetchMessageApi에 chatId를 전달
  });

  // Fetch된 메시지 데이터를 messages에 반영
  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [data]);

  const handleSendMessage = () => {
    if (input.trim() && chatId && sendMessage) {
      const messageDto: Message = {
        id: Date.now(), // 서버에서 처리할 수 있는 고유 ID
        senderId: userId, // Redux에서 가져온 내 아이디
        content: input,
        messageType: 1, // TEXT 메시지 타입 예시
        attachments: [], // 첨부파일이 있을 경우 추가
        timestamp: "", // 메시지 전송 타임스탬프
      };

      // 내 메시지는 바로 로컬에 추가하여 UI에 표시 (보낸 메시지만 화면에 보여줌)
      setMessages((prevMessages) => [
        ...prevMessages,
        messageDto, // 내 메시지만 추가
      ]);

      // WebSocket을 통해 서버로 메시지 전송
      sendMessage(messageDto);
      setInput(""); // 메시지 입력란 비우기
    }
  };

  useEffect(() => {
    if (!chatId) return;

    let stompClient: Client | null = null;

    (async () => {
      try {
        stompClient = await WebSocketUtils.createWebSocketClient(
          chatId,
          (message) => {
            console.log("받은 메시지:", message);
            setMessages((prev) =>
              prev.some((msg) => msg.id === message.id)
                ? prev
                : [...prev, message],
            );
          },
        );

        if (stompClient) {
          setSendMessage(
            () => (msg: Message) =>
              WebSocketUtils.sendMessage(stompClient!, chatId, msg),
          );
        }
      } catch (error) {
        console.error("WebSocket 연결 오류:", error);
      }
    })();

    return () => {
      if (stompClient) {
        WebSocketUtils.disconnectWebSocket(stompClient);
      }
    };
  }, [chatId, userId]);

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.senderId === userId
          ? styles.myMessageContainer
          : styles.friendMessageContainer,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          item.senderId === userId
            ? styles.myMessageBubble
            : styles.friendMessageBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            item.senderId === userId && styles.myMessageText,
          ]}
        >
          {item.content}
        </Text>
      </View>
    </View>
  );

  return (
    <>
      <GeneralAppBar title={"대화방"} />

      {/* 로딩 상태 표시 */}
      {isLoading && <Text>로딩 중...</Text>}

      {/* 오류 상태 처리 */}
      {error && <Text>메시지 로드에 실패했습니다.</Text>}

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()} // id를 문자열로 변환
        renderItem={renderMessage}
        style={styles.chatContainer}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="메시지를 입력하세요..."
          placeholderTextColor="#827F7F"
        />
        <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
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
  messageBubble: {
    padding: 10,
    borderRadius: 5,
    width: width * 0.55,
  },
  myMessageBubble: {
    backgroundColor: "#F29856",
    alignSelf: "flex-end",
  },
  friendMessageBubble: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: width * 0.03,
  },
  myMessageText: {
    color: "#FFFFFF",
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
    marginRight: 10,
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
});

export default ChatRoom;
