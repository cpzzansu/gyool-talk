import api from "../api";

export const fetchFriendListApi = async () => {
  try {
    const response = await api.get("/friend/fetchFriendList");
    return response.data;
  } catch (error: any) {
    return error;
  }
};
