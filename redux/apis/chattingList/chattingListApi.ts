import api from "@/redux/apis/api";
import RNFetchBlob from "react-native-fetch-blob";

export interface CreateChatting {
  friendId: string;
  friendNickname: string;
  userNickname: string;
}
export interface DeleteChatting {
  id: number;
}
export interface FindMessage {
  id: number;
}

export interface Chatroom {
  id: number;
  chatroomName: string;
  messages: Message[];
  participants: string[];
}

export interface Message {
  id: number;
  senderId: string;
  content: string;
  messageType: number;
  attachments: Attachment[];
  timestamp: string;
}

export interface Attachment {
  id: number;
  fileType: number;
  filePath: string;
}

export const createChattingApi = async (
  createChatting: CreateChatting,
): Promise<Chatroom> => {
  const response = await api.post("/chatting/createChatting", createChatting);
  return response.data;
};

export const fetchChatroomApi = async () => {
  const response = await api.get(`/chatting/fetchChatroom`);
  console.log("채팅방 정보: ", response.data);
  return response.data;
};

export const fetchMessageApi = async (chatId: number): Promise<Message[]> => {
  const response = await api.post(`/chatting/fetchMessage?chatId=${chatId}`);
  return response.data;
};

export const deleteChattingApi = async (
  deleteChatting: DeleteChatting,
): Promise<Chatroom> => {
  const response = await api.post("/chatting/deleteChatting", deleteChatting);
  return response.data;
};

export const uploadAttachmentApi = async (
  chatId: string,
  uri: string,
  name: string,
  fileType: string,
): Promise<{ imageUrl: string }> => {
  const formData = new FormData();
  formData.append("chatId", chatId); // chatId 추가

  // 파일을 URI에서 읽어 실제 파일 객체를 생성
  const fileData = await RNFetchBlob.fs.readFile(uri, "base64");

  formData.append("file", {
    uri, // 로컬 파일 경로
    name, // 파일 이름
    type: getMimeType(uri), // MIME 타입
    data: fileData, // base64로 읽은 파일 데이터 추가
  });

  console.log("보내는 FormData:", formData);

  const response = await api.post(`/chatting/uploadAttachment`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log("API 응답 확인:", response.data);
  return response.data; // { imageUrl: string }
};

const getMimeType = (uri: string) => {
  const extension = uri.split(".").pop()?.toLowerCase();
  if (!extension) return "application/octet-stream"; // 기본값

  const mimeTypes: { [key: string]: string } = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    bmp: "image/bmp",
    webp: "image/webp",
    pdf: "application/pdf",
    txt: "text/plain",
  };

  return mimeTypes[extension] || "application/octet-stream";
};
