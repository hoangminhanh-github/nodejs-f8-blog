import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFormik } from "formik";

import "./UserEdit.scss";
import axios from "axios";

const UserEdit = () => {
  const { id } = useParams();

  const userEdit = useSelector((state) =>
    state.userList.find((item) => {
      return item.id == id;
    })
  );

  //
  const formik = useFormik({
    initialValues: {
      firstName: userEdit?.firstName,
      lastName: userEdit?.lastName,
      email: userEdit?.email,
    },
    onSubmit: async (values) => {
      await axios.patch("http://localhost:3001/users/edit", {
        params: {
          id: id,
          data: values,
        },
      });
    },
  });
  return (
    <div className="mt-4">
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter first name"
            name="firstName"
            defaultValue={userEdit?.firstName}
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter last name"
            name="lastName"
            defaultValue={userEdit?.lastName}
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter first name"
            name="email"
            defaultValue={userEdit?.email}
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

export default UserEdit;
