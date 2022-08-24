import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import "./Register.scss";
const Register = () => {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Nhập trường này chưa ???"),
      password: Yup.string().required(
        "Nhập trường này chưa,địt mẹ cứ để nhắc thế nhỉ???"
      ),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: (values) => {
      delete values.confirmPassword;
      console.log(values);
      navigate("/auth/login");
    },
  });
  return (
    <div className="register mt-4" action="">
      <form method="post" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">User name</label>
          <input
            name="userName"
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={formik.handleChange}
          />
          {formik.errors.userName && formik.touched.lastName && (
            <span className="mess-err">{formik.errors.userName}</span>
          )}
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
          {formik.errors.password && (
            <span className="mess-err">{formik.errors.password}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Xác nhận password</label>
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={formik.handleChange}
          />
          {formik.errors.confirmPassword && (
            <span className="mess-err">{formik.errors.confirmPassword}</span>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
