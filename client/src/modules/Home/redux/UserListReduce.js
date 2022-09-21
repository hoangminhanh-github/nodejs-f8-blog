import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "userList",
  initialState: [],
  reducers: {
    setUserListReduce: function (state, actions) {
      return [...state, ...actions.payload];
    },
  },
});

export const { setUserListReduce } = authSlice.actions;

export default authSlice.reducer;
