import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useState } from "react";

let isLogin;
const checkIsLogin = () => {
  axios
    .post("http://localhost:3001/account/check-login", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    })
    .then((results) => {
      if (results.data.error) {
        return (isLogin = false);
      } else {
        return (isLogin = true);
      }
    });
};
checkIsLogin();

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
