import React, { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateUser from "./modules/User/CreateUser";
import Home from "./modules/Home/Home";
import Navbar from "./modules/Navbar/Navbar";
import Details from "./modules/User/Details";
import Login from "./modules/Auth/Login/Login";
import Register from "./modules/Auth/Regsiter/Register";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { setUserReduce } from "./modules/Auth/redux/AuthReduce";
function App() {
  const dispatch = useDispatch();
  // xem user đã login trong lần đầu truy cập app chưa
  useEffect(() => {
    const checkIsLogin = () => {
      axios
        .post("http://localhost:3001/account/check-login", {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((results) => {
          if (results.data.error) {
            dispatch(setUserReduce(false));
          } else {
            alert("Chào mừng bạn đã quay trở lại");
            dispatch(setUserReduce(true));
          }
        })
        .catch(() => {
          dispatch(setUserReduce(false));
        });
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
          <Route path="/" exact element={<Home></Home>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
