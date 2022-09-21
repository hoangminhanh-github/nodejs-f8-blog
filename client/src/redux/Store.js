import { configureStore } from "@reduxjs/toolkit";
import AuthReduce from "../modules/Auth/redux/AuthReduce";
import UserListReduce from "../modules/Home/redux/UserListReduce";
export default configureStore({
  reducer: {
    auth: AuthReduce,
    userList: UserListReduce,
  },
});
