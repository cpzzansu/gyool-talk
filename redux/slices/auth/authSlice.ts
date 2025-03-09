// src/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, updateNickName } from "@/redux/slices/auth/authThunk";

export interface AuthState {
  userId: string;
  userNickname: string;
  token: string | null;
  isAuthorized: boolean;
  userEmail: string;
  userProfileImg: string;
}

const initialState: AuthState = {
  userId: "",
  userNickname: "",
  token: null,
  isAuthorized: false,
  userEmail: "",
  userProfileImg: "",
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
      state.userProfileImg = "";
    },
    setNickname(state, action: PayloadAction<string>) {
      state.userNickname = action.payload;
    },
    setUserEmail(state, action: PayloadAction<string>) {
      state.userEmail = action.payload;
    },
    setUserProfileImg(state, action: PayloadAction<string>) {
      state.userProfileImg = action.payload;
    },
    // 필요한 다른 액션들을 추가
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { userId, userNickname, token, userEmail, userProfileImg } =
          action.payload;
        state.userId = userId;
        state.userNickname = userNickname;
        state.userProfileImg = userProfileImg;
        state.token = token;
        state.userEmail = userEmail;
      })
      .addCase(updateNickName.fulfilled, (state, action) => {
        if (action.payload && action.payload.userNickName) {
          state.userNickname = action.payload.userNickName;
        } else {
          console.error("닉네임 업데이트 실패: 유효한 데이터 없음");
        }
      });
  },
});

export const {
  setToken,
  clearAuth,
  setNickname,
  setUserEmail,
  setUserProfileImg,
} = authSlice.actions;
export default authSlice.reducer;
