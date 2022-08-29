import { createSlice } from "@reduxjs/toolkit";

const isLogin = sessionStorage.getItem("accessToken");

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: !!isLogin,
    user: {},
  },
  reducers: {
    setUserReduce: (state, actions) => {
      state.isLogin = actions.payload;
    },
  },
});

export const { setUserReduce } = authSlice.actions;

export default authSlice.reducer;
