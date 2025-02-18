import api from "../api";
import { Alert, Platform } from "react-native";

export const loginApi = async (user: {
  userId: string;
  userPassword: string;
}) => {
  try {
    const response = await api.post("/login", user);
    return response.data;
  } catch (error: any) {
    if (error.response.data.startsWith("404")) {
      if (Platform.OS === "web") {
        window.alert("아이디가 존재하지 않습니다.");
      } else {
        Alert.alert("아이디가 존재하지 않습니다.");
      }
    } else if (error.response.data.startsWith("401")) {
      if (Platform.OS === "web") {
        window.alert("비밀번호가 틀렸습니다.");
      } else {
        Alert.alert("비밀번호가 틀렸습니다.");
      }
    }
    return error;
  }
};
