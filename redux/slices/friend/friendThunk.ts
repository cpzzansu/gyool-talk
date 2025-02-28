import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFriendListApi } from "@/redux/apis/friend/friendApi";

export const fetchFriendList = createAsyncThunk(
  "friend/fetchFriendList",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchFriendListApi();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
