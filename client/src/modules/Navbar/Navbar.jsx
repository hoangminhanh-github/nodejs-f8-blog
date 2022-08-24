import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
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
            <Link to={"/users/create"} className="nav-link">
              Create User
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Soon
            </a>
          </li>
        </ul>
      </div>
      <div className="mr-auto">
        <button className="btn" style={{ backgroundColor: "transparent" }}>
          <Link to={"/users/register"}>Register</Link>
        </button>
        <button className="btn" style={{ backgroundColor: "transparent" }}>
          <Link to={"/auth/login"}>Login</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
