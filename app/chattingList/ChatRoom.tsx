import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
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
import { formatTimestamp } from "@/utils/common";

const { width } = Dimensions.get("window");

const ChatRoom = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const { chatId } = useLocalSearchParams() as { chatId?: number };
  const { friendProfileImg } = useLocalSearchParams() as {
    friendProfileImg?: string;
  };
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sendMessage, setSendMessage] = useState<
    ((messageDto: Message) => void) | null
  >(null);
  const flatListRef = useRef<FlatList>(null); // FlatList 참조 추가

  const { data, isLoading, error } = useQuery<Message[]>({
    queryKey: ["chatId", chatId], // chatId를 queryKey에 추가하여, chatId가 바뀌면 새로 데이터를 가져오도록 설정
    queryFn: () => {
      if (chatId === undefined) {
        throw new Error("chatId is undefined");
      }
      return fetchMessageApi(chatId);
    }, // fetchMessageApi에 chatId를 전달
  });

  // Fetch된 메시지 데이터를 messages에 반영
  useEffect(() => {
    if (data) {
      setMessages(data);
      if (data.length > 0) {
        flatListRef.current?.scrollToEnd({ animated: true }); // 메시지가 업데이트되면 자동으로 마지막 메시지로 스크롤
      }
    }
  }, [data]);

  const handleSendMessage = () => {
    if (input.trim() && chatId && sendMessage) {
      const timestamp = Date.now();
      const messageDto: Message = {
        id: Date.now(), // 서버에서 처리할 수 있는 고유 ID
        senderId: userId, // Redux에서 가져온 내 아이디
        content: input,
        messageType: 1, // TEXT 메시지 타입 예시
        attachments: [], // 첨부파일이 있을 경우 추가
        timestamp: timestamp.toString(), // 메시지 전송 타임스탬프
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
    console.log("친구 프로필 이미지:", friendProfileImg); // 프로필 이미지 값 확인
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
      {/* 상대방 메시지의 경우 프로필 이미지와 닉네임 표시 */}
      {item.senderId !== userId && (
        <View style={styles.profileInfoContainer}>
          <Image
            style={styles.profileImage}
            source={
              // 프로필 이미지가 있는 경우 URL로, 없으면 기본 이미지
              friendProfileImg
                ? { uri: friendProfileImg }
                : require("@/assets/images/icon/friends-list-profile.png")
            }
          />
        </View>
      )}

      <View style={styles.messageContentContainer}>
        {item.senderId !== userId && (
          <Text style={styles.profileNickname}>{item.senderId}</Text>
        )}

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

      {/* 시간 표시 */}
      <Text style={[styles.messageTimestamp]}>
        {formatTimestamp(item.timestamp)} {/* 시간 포맷팅 함수 */}
      </Text>
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
        ref={flatListRef} // FlatList에 ref 연결
        data={messages}
        keyExtractor={(item) => item.id.toString()} // id를 문자열로 변환
        renderItem={renderMessage}
        style={styles.chatContainer}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
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
    flexDirection: "row-reverse", // 내 메시지에서는 시간은 왼쪽, 메시지는 오른쪽
  },
  friendMessageContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
  messageContentContainer: {
    flexDirection: "column", // 닉네임 → 메시지 → 시간 순으로 세로 정렬
    alignItems: "flex-start", // 왼쪽 정렬
  },
  messageBubble: {
    padding: 10,
    borderRadius: 5,
    width: "auto",
    maxWidth: width * 0.6, // 최대 너비는 화면의 70%로 설정
  },
  myMessageBubble: {
    backgroundColor: "#F29856",
    alignSelf: "flex-end",
  },
  friendMessageBubble: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
  },
  messageTimestamp: {
    fontSize: width * 0.025,
    color: "#848484",
    marginLeft: width * 0.02, // 시간과 메시지 사이의 간격
    marginRight: width * 0.02,
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
  profileInfoContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: width * 0.02,
  },
  profileImage: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: 50,
  },
  profileNickname: {
    marginBottom: width * 0.01,
    fontSize: width * 0.03,
    color: "#848484",
  },
});

export default ChatRoom;
