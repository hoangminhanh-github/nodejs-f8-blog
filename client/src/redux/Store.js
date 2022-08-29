import { configureStore } from "@reduxjs/toolkit";
import AuthReduce from "../modules/Auth/redux/AuthReduce";
export default configureStore({
  reducer: {
    auth: AuthReduce,
  },
});
