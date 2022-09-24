import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    user: {},
  },
  reducers: {
    setUserReduce: function (state, actions) {
      return { ...state, ...actions.payload };
    },
  },
});

export const { setUserReduce } = authSlice.actions;

export default authSlice.reducer;
