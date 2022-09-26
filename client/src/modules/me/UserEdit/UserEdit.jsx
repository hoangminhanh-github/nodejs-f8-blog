import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFormik } from "formik";

import "./UserEdit.scss";
import axios from "axios";
import { UploadImg } from "../../../common/UploadImg/UploadImg";
const UserEdit = () => {
  const { id } = useParams();
  const [hehe, setHehe] = useState();
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
      avatar: "",
    },
    onSubmit: async (values, props) => {
      // await axios.patch("http://localhost:3001/users/edit", {
      //   params: {
      //     id: id,
      //     data: values,
      //   },
      // });\
      let data = new FormData();
      data.append("firstName", values.firstName);
      data.append("firstName", values.lastName);
      data.append("firstName", values.email);
      data.append("avatar", hehe[0]);

      await axios.post("http://localhost:3001/users/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
    },
  });

  return (
    <div className="mt-4">
      <form
        action=""
        onSubmit={formik.handleSubmit}
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

        {/*
         <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <UploadImg></UploadImg>
        </div> 
        */}

        <div className="form-group">
          <input
            type="file"
            name="avatar"
            className="form-control-file"
            // onChange={(event) => {
            //   setHehe(event.currentTarget.files[0].name);
            // }}
            onChange={(event) => {
              setHehe(event.target.files);
            }}
            multiple
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {/* <form
        action="http://localhost:3001/users/upload"
        encType="multipart/form-data"
        method="post"
      >
        <div className="form-group">
          <input type="file" name="avatar" className="form-control-file" />
          <button type="submit">ok </button>
        </div>
      </form> */}
    </div>
  );
};

export default UserEdit;
