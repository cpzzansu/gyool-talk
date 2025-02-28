// src/store/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "@/redux/slices/auth/authSlice";
import friendSlice from "@/redux/slices/friend/friendSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  friend: friendSlice,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
