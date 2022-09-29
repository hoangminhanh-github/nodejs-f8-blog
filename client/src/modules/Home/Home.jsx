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
      <div className="container">
        {users?.map((user, index) => (
          <Link to={isLogin ? `users/:${user.id}` : "/auth/login"} key={index}>
            <div className="container-item">
              <div className="container-item-right">
                <img
                  className="image"
                  src={`/img/userImages/${user?.UserImages[0]?.image}`}
                  alt=""
                />
                <div className="info">
                  <span>{user?.firstName}</span>
                  <span>{user?.email}</span>
                  <div className="like">
                    <AiFillHeart className="icon"></AiFillHeart>
                    <span>{user?.Likes.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Home;
