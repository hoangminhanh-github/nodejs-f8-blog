import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserReduce } from "../Auth/redux/AuthReduce";
import { AiOutlineUser } from "react-icons/ai";

import "./Navbar.scss";
const Navbar = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(setUserReduce({ isLogin: false, user: {} }));
    alert("User is logout");
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light  d-flex">
      <Link to={"/"} className="">
        Home
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to={isLogin ? "/users/create" : "/auth/login"} className="">
              Create User
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/me/store" className="" href="">
              my store
            </Link>
          </li>
        </ul>
      </div>
      <div className="mr-auto">
        {!isLogin ? (
          <>
            <button className="btn" style={{ backgroundColor: "transparent" }}>
              <Link to={"/users/register"}>Register</Link>
            </button>
            <button className="btn" style={{ backgroundColor: "transparent" }}>
              <Link to={"/auth/login"}>Login</Link>
            </button>
          </>
        ) : (
          <div
            className="nav-right"
            style={{ display: "flex", alignItems: "center" }}
          >
            <span>{user?.firstName}</span>

            {user?.avatar ? (
              <img className="avatar" src={user?.avatar}></img>
            ) : (
              <AiOutlineUser />
            )}
            <button className="btn" onClick={handleLogout}>
              logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
