import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserReduce } from "../Auth/redux/AuthReduce";
const Navbar = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(setUserReduce({ isLogin: false }));
    alert("User is logout");
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex">
      <Link to={"/"} className="navbar-brand">
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
            <Link
              to={isLogin ? "/users/create" : "/auth/login"}
              className="nav-link"
            >
              Create User
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              Soon
            </a>
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
          <>
            <button
              className="btn"
              style={{ backgroundColor: "transparent" }}
              onClick={handleLogout}
            >
              logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
