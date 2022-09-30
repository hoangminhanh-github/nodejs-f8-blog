import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFormik } from "formik";

import "./UserEdit.scss";
import axios from "axios";
import { UploadImg } from "../../../common/UploadImg/UploadImg";
const UserEdit = () => {
  const { id } = useParams();

  const [multiImage, setMultiImage] = useState();
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
      avatar: [],
    },
    onSubmit: async (values, props) => {
      let data = new FormData();

      for (let i = 0; i < multiImage.length; i++) {
        data.append("avatar", multiImage[i]);
      }

      data.append("id", id);
      data.append("firstName", values.firstName);
      data.append("lastName", values.lastName);
      data.append("email", values.email);
      // data.append("avatar", results);
      await axios.post("http://localhost:3001/users/edit", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };
  return (
    <div className="mt-4">
      <form
        action=""
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        encType="multipart/form-data"
      >
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

        <div className="form-group">
          <input
            type="file"
            name="avatar"
            className="form-control-file"
            onChange={(event) => {
              setMultiImage(event.target.files);
            }}
            multiple={true}
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
