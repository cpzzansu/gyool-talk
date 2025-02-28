import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchFriendList } from "@/redux/slices/friend/friendThunk";

export interface AuthState {
  friendList: Array<any>;
}

const initialState: AuthState = {
  friendList: [],
};

const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFriendList.fulfilled, (state, action) => {
      state.friendList = action.payload;
    });
  },
});

export default friendSlice.reducer;
