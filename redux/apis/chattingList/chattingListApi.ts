import api from "@/redux/apis/api";

export interface CreateChatting {
  friendId: string;
}

export interface Chatroom {
  id: string;
}

export const createChattingApi = async (
  createChatting: CreateChatting,
): Promise<Chatroom> => {
  const response = await api.post("/chatting/createChatting", createChatting);
  return response.data;
};
