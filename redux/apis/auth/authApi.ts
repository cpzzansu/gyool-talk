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
export const joinApi = async (user: {
  userId: string;
  userPassword: string;
  userEmail: string;
  userNickName: string;
}) => {
  try {
    const response = await api.post("/join/joinUser", user);
    return response;
  } catch (error: any) {
    console.log(`Error Message: ${error}`);
    return error;
  }
};
export const updateNickNameApi = async (user: {
  userId: string;
  userNickName: string;
}) => {
  try {
    const response = await api.post("/active/upDateNickName", user);
    return response;
  } catch (error: any) {
    console.log(`Error Message: ${error}`);
    return error;
  }
};
export const naverLoginApi = async (accessToken: string) => {
  const response = await api.post("/naverLogin", { accessToken });
  return response.data;
};
