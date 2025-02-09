// src/store/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "@/redux/slices/auth/authSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  // 다른 슬라이스가 있다면 추가
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
