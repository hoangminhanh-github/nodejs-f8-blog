import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
const CreateUser = () => {
  const [multiImage, setMultiImage] = useState();
  // const createUser = async (values) => {
  //   console.log(values);
  //   await axios.post("http://localhost:3001/users/create", values);
  // };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      avatar: "",
    },
    onSubmit: async (values) => {
      let data = new FormData();
      for (let i = 0; i < multiImage.length; i++) {
        data.append("avatar", multiImage[i]);
      }
      data.append("firstName", values.firstName);
      data.append("lastName", values.lastName);
      data.append("email", values.email);

      await axios.post("http://localhost:3001/users/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter last name"
            onChange={formik.handleChange}
            name="lastName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter first name"
            onChange={formik.handleChange}
            name="email"
          />
        </div>
        <div className="form-group">
          <input
            type="file"
            multiple
            name="avatar"
            onChange={(e) => {
              setMultiImage(e.target.files);
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
