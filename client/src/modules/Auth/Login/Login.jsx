import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./Login.scss";
import { setUserReduce } from "../redux/AuthReduce";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      password: "",
    },
    onSubmit: (values) => {
      axios.post("http://localhost:3001/account/login", values).then((data) => {
        if (!data.data.error) {
          alert("dang nhap thanh cong");
          localStorage.setItem("accessToken", data.data);
          dispatch(setUserReduce(true));
          navigate("/");
        } else {
          alert(data.data.error);
        }
      });
    },
  });

  return (
    <div className="login mt-4" action="">
      <form method="post" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">User name</label>
          <input
            name="firstName"
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={formik.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
