// src/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  nickname: string;
  refreshToken: string | null;
  token: string | null;
  isAuthorized: boolean;
}

const initialState: AuthState = {
  nickname: "",
  refreshToken: null,
  token: null,
  isAuthorized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.isAuthorized = true;
    },
    clearAuth(state) {
      state.token = null;
      state.refreshToken = null;
      state.isAuthorized = false;
      state.nickname = "";
    },
    setNickname(state, action: PayloadAction<string>) {
      state.nickname = action.payload;
    },
    // 필요한 다른 액션들을 추가
  },
  extraReducers: (builder) => {
    // 필요에 따라 비동기 로직 처리
  },
});

export const { setToken, clearAuth, setNickname } = authSlice.actions;
export default authSlice.reducer;
