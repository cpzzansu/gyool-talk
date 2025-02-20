// src/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login } from "@/redux/slices/auth/authThunk";

export interface AuthState {
  userId: string;
  userNickname: string;
  token: string | null;
  isAuthorized: boolean;
}

const initialState: AuthState = {
  userId: "",
  userNickname: "",
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
      state.userId = "";
      state.token = null;
      state.isAuthorized = false;
      state.userNickname = "";
    },
    setNickname(state, action: PayloadAction<string>) {
      state.userNickname = action.payload;
    },
    // 필요한 다른 액션들을 추가
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      const { userId, userNickname, token } = action.payload;
      state.userId = userId;
      state.userNickname = userNickname;
      state.token = token;
    });
  },
});

export const { setToken, clearAuth, setNickname } = authSlice.actions;
export default authSlice.reducer;
