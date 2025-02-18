import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "@/redux/apis/auth/authApi";

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
