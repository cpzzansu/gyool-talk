import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, joinApi } from "@/redux/apis/auth/authApi";

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
