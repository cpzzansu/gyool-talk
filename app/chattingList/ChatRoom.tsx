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
  Alert,
} from "react-native";
import GeneralAppBar from "@/components/GeneralAppBar";
import {
  fetchMessageApi,
  uploadAttachmentApi,
} from "@/redux/apis/chattingList/chattingListApi";
import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/reducer";
import { Message } from "@/redux/apis/chattingList/chattingListApi";
import * as WebSocketUtils from "@/utils/webSocket";
import { Client } from "@stomp/stompjs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { formatTimestamp } from "@/utils/common";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

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
  const [isLoaded, setIsLoaded] = useState(false); // 로딩 완료 상태 추가
  const [image, setImage] = useState("");

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
      setIsLoaded(true); // 메시지 로딩 완료
    }
  }, [data]);

  // 메시지 로드 후 자동으로 스크롤
  useEffect(() => {
    if (isLoaded && flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true }); // 마지막 메시지로 스크롤
    }
  }, [isLoaded, messages]); // 메시지가 업데이트될 때마다 호출

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

  const handleAttachFile = async () => {
    console.log("파일 첨부 버튼 클릭됨");

    const file = await DocumentPicker.getDocumentAsync({
      type: "*/*", // 모든 파일 유형 지원
    });

    console.log("선택된 파일:", file); // 파일 정보 로그 출력

    if (file.canceled) return;

    const { uri, name } = file.assets[0];
    const fileType = getFileType(name);
    console.log("확인 ====> uri: {}, name: {}", uri, name);
    mutation.mutate({ chatId: chatId, uri, name, fileType });
  };

  const mutation = useMutation({
    mutationFn: async ({
      chatId,
      uri,
      name,
      fileType,
    }: {
      chatId: string;
      uri: string;
      name: string;
      fileType: number;
    }) => {
      return await uploadAttachmentApi(chatId, uri, name, fileType.toString());
    },
    onSuccess: (data: any, variables) => {
      console.log("업로드 성공:", data);

      const { fileType } = variables; // 업로드 요청 시 전달한 fileType 값

      const messageType =
        fileType === 2 ? 2 : fileType === 3 ? 3 : fileType === 4 ? 4 : 99;

      const fileMessage: Message = {
        id: Date.now(),
        senderId: userId,
        content: "",
        messageType: messageType, // 파일 타입에 따른 메시지 타입 설정
        attachments: [
          {
            id: "", // 파일 ID (DB에서 자동 증가하는 시퀀스 값일 수도 있음)
            fileType: messageType, // 파일 타입 (예: 2는 이미지)
            filePath: `http://localhost:8080/images/profile/${data}`, // 파일 저장 경로
          },
        ],
        timestamp: Date.now().toString(),
      };

      setMessages((prevMessages) => [...prevMessages, fileMessage]);

      // WebSocket을 통해 서버로 메시지 전송
      if (sendMessage) {
        sendMessage(fileMessage);
      } else {
        console.error("sendMessage 함수가 정의되지 않았습니다.");
      }
    },
    onError: (error: any) => {
      console.error("파일 업로드 실패:", error);
      Alert.alert("업로드 실패", "파일 업로드 중 오류가 발생했습니다.");
    },
  });

  const getFileType = (uri: string): number => {
    const extension = uri.split(".").pop()?.toLowerCase();

    if (!extension) return 99; // 확장자가 없는 경우 (알 수 없는 타입)

    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
    const pdfExtensions = ["pdf"];
    const textExtensions = ["txt"];

    if (imageExtensions.includes(extension)) return 2; // 이미지
    if (pdfExtensions.includes(extension)) return 3; // PDF
    if (textExtensions.includes(extension)) return 4; // 텍스트 파일

    return 99; // 기타 파일
  };

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
        {/* 첨부파일 추가 버튼 */}
        <TouchableOpacity
          style={styles.attachButton}
          onPress={handleAttachFile}
        >
          <Text style={styles.attachButtonText}>+</Text>
        </TouchableOpacity>

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
    marginVertical: width * 0.01,
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
    padding: width * 0.02,
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
    padding: width * 0.02,
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    width: width * 0.7,
    backgroundColor: "#EFEFEF",
    borderRadius: 5,
    paddingHorizontal: width * 0.02,
    marginRight: width * 0.02,
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
  attachButton: {
    width: width * 0.09,
    height: width * 0.09,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCD7CB",
  },
  attachButtonText: {
    fontSize: width * 0.05,
    color: "#848484",
    fontWeight: "bold",
  },
});

export default ChatRoom;
