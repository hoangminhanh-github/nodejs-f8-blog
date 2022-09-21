import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiFillHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";

import { setUserListReduce } from "./redux/UserListReduce";
import "./Home.scss";
const Home = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const [users, setUsers] = useState();
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const res = await axios.get("http://localhost:3001/");
    await dispatch(setUserListReduce(res.data));
    await setUsers(res.data);
  };
  return (
    <>
      <div>This is Home !!</div>
      <div className="container">
        {users?.map((user, index) => (
          <div className="card" key={index}>
            <div className="card-body">
              <h5 className="card-title">{user.firstName + user.lastName}</h5>
              <p className="card-text">{user.email}</p>
              <Link
                to={isLogin ? `users/:${user.id}` : "/auth/login"}
                className="btn btn-primary"
              >
                Go
              </Link>
              <div className="like">
                {user.Likes.length} <AiFillHeart className="icon"></AiFillHeart>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
