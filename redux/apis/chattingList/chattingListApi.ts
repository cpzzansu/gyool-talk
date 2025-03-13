import api from "@/redux/apis/api";

export interface CreateChatting {
  friendId: string;
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
