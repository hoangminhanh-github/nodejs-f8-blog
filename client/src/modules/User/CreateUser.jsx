import React from "react";
import axios from "axios";
import { useFormik } from "formik";
const CreateUser = () => {
  const createUser = async (values) => {
    console.log(values);
    await axios.post("http://localhost:3001/users/create", values);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit: (values) => {
      createUser(values);
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

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
