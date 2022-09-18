import React, { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import JWT from "jwt-client";

import CreateUser from "./modules/User/CreateUser";
import Home from "./modules/Home/Home";
import Navbar from "./modules/Navbar/Navbar";
import Details from "./modules/User/Details";
import Login from "./modules/Auth/Login/Login";
import Register from "./modules/Auth/Regsiter/Register";
import Store from "./modules/me/Store/Store";
import { setUserReduce } from "./modules/Auth/redux/AuthReduce";
import NotFoundPage from "./modules/Home/NotFoundPage/NotFoundPage";
import "./App.css";
function App() {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  var userName;
  if (accessToken) {
    userName = JWT.read(accessToken).claim.firstName;
  }
  // xem user đã login trong lần đầu truy cập app chưa
  useEffect(() => {
    const checkIsLogin = () => {
      if (userName) {
        axios
          .post("http://localhost:3001/account/check-login", {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          })
          .then((results) => {
            if (results.data.error) {
              dispatch(setUserReduce({ isLogin: false }));
            } else {
              dispatch(setUserReduce({ isLogin: true, user: userName }));
            }
          })
          .catch(() => {
            dispatch(setUserReduce(false));
          });
      }
    };
    checkIsLogin();
  }, []);
  const isLogin = useSelector((state) => state.auth.isLogin);
  return (
    <div className="App">
      <Router>
        {/* <Link to={"/create"}>Link to create</Link> */}
        <Navbar></Navbar>

        <Routes>
          {isLogin && (
            <Route
              path="/users/create"
              element={<CreateUser></CreateUser>}
            ></Route>
          )}
          <Route path="/users/:slug" element={<Details></Details>}></Route>
          <Route path="/auth/login" element={<Login></Login>}></Route>
          <Route path="/users/register" element={<Register></Register>}></Route>
          <Route path="/me/store" element={<Store></Store>}></Route>
          <Route path="*" exact element={<NotFoundPage></NotFoundPage>}></Route>

          <Route path="/" exact element={<Home></Home>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
