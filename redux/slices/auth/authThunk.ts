import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginApi,
  joinApi,
  updateNickNameApi,
} from "@/redux/apis/auth/authApi";

export const login = createAsyncThunk(
  "auth/login",
  async (
    { user }: { user: { userId: string; userPassword: string } },
    { rejectWithValue },
  ) => {
    try {
      return await loginApi(user);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const join = createAsyncThunk(
  "auth/join",
  async (
    {
      user,
    }: {
      user: {
        userId: string;
        userPassword: string;
        userEmail: string;
        userNickName: string;
      };
    },
    { rejectWithValue },
  ) => {
    try {
      return await joinApi(user);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
//닉네임 업데이트
export const updateNickName = createAsyncThunk(
  "auth/updateNickName",
  async (
    { user }: { user: { userId: string; userNickName: string } },
    { rejectWithValue },
  ) => {
    try {
      const response = await updateNickNameApi(user);
      console.log(response.data.userNickName + "????");
      if (response.data) {
        return { userNickName: response.data.userNickName };
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
