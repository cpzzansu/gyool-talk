import api from "../api";
import { Friend } from "@/types/friend";

export const fetchFriendListApi = async (): Promise<Friend[]> => {
  const response = await api.get("/friend/fetchFriendList");
  return response.data;
};
