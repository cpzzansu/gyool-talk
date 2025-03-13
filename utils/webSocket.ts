import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { Message } from "@/redux/apis/chattingList/chattingListApi";

// 웹소켓 클라이언트 생성
export const createWebSocketClient = async (
  chatId: string | number,
  onMessageReceived: (message: Message) => void,
) => {
  const { default: store } = await import("@/redux/store");
  const token = store.getState().auth.token;

  if (!token) {
    console.error("토큰이 없습니다. WebSocket 연결을 할 수 없습니다.");
    return null;
  }

  console.log("websocket util 토큰확인: ", token);

  return new Promise<Client>((resolve, reject) => {
    const stompClient = new Client({
      brokerURL: "ws://localhost:8080/ws",
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: (str) => console.log(str),
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      onConnect: () => {
        console.log("WebSocket 연결 성공! 구독 시작");

        // STOMP 연결이 완료된 후에 구독 시작
        subscribeToChat(stompClient, chatId, onMessageReceived);

        // 연결 완료된 stompClient 반환
        resolve(stompClient);
      },
      onStompError: (frame) => {
        console.error("STOMP 오류 발생:", frame);
        reject(new Error("STOMP 연결 실패"));
      },
    });

    stompClient.activate();
  });
};

// 메시지 구독 함수
export const subscribeToChat = (
  stompClient: Client,
  chatId: string | number,
  onMessageReceived: (message: Message) => void,
) => {
  console.log("구독 시작: /subscribe/chat/" + chatId);

  stompClient.subscribe(`/subscribe/chat/${chatId}`, (messageOutput) => {
    console.log("받은 원본 메시지:", messageOutput);
    try {
      const messageData: Message = JSON.parse(messageOutput.body);
      console.log("파싱된 메시지:", messageData);
      onMessageReceived(messageData);
    } catch (error) {
      console.error("메시지 파싱 오류:", error);
    }
  });
};

// 메시지 전송 함수
export const sendMessage = (
  stompClient: Client,
  chatId: string | number,
  messageDto: Message,
) => {
  if (!stompClient.connected) {
    console.warn("WebSocket이 아직 연결되지 않음");
    return;
  }

  stompClient.publish({
    destination: `/publish/chat/send/${chatId}`,
    body: JSON.stringify(messageDto),
  });
};

// 연결 해제 함수
export const disconnectWebSocket = (stompClient: Client) => {
  console.log("WebSocket 연결 해제");
  stompClient.deactivate();
};
