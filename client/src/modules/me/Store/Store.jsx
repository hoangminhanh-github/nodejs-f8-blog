import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

import Model from "../../../common/Modal/Modal";
import "./Store.scss";
const Store = () => {
  const [info, setInfo] = useState();
  const [isModel, setIsModel] = useState(false);
  const getInfo = async () => {
    const res = await axios.get("http://localhost:3001/");
    setInfo(res.data);
  };
  useEffect(() => {
    getInfo();
  }, []);

  const handleChange = (e) => {
    const { id, checked } = e.target;
    if (id === "allSelect") {
      let tempUser = info?.map((user) => {
        return { ...user, isChecked: checked };
      });
      setInfo(tempUser);
    } else {
      let tempUser = info?.map((user) => {
        return user.id == id ? { ...user, isChecked: checked } : user;
      });
      setInfo(tempUser);
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm(`Delete user id ${id}`)) {
      await axios.delete(`http://localhost:3001/users/delete`, {
        data: {
          id: id,
        },
      });
      await getInfo();
    } else {
      // Do nothing!
    }
  };

  // formik handle
  const formik = useFormik({
    initialValues: {
      action: "",
      elements: [],
    },
    onSubmit: async (values) => {
      let valuesArr = values.elements;
      if (valuesArr.includes("all")) {
        valuesArr.splice("all");
        info.forEach((item) => {
          if (item.isChecked) {
            return valuesArr.push(item.id);
          }
        });
      }
      if (window.confirm(`Delete multi`)) {
        await axios.delete("http://localhost:3001/users/delete", {
          data: {
            id: values.elements,
          },
        });
        await getInfo();
      } else {
        // Do nothing!
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="store__container">
      <h3>store</h3>
      <div className="store__container-header">
        <input
          className="checkAllBtn"
          type="checkbox"
          checked={!info?.some((user) => user?.isChecked !== true)}
          onChange={(e) => {
            handleChange(e);
            formik.handleChange(e);
          }}
          id="allSelect"
          name="elements"
          value="all"
        />
        <select name="action" id="" onChange={formik.handleChange}>
          <option value="">---choose active---</option>
          <option value="delete">--Delete--</option>
          <option value="">--Soon--</option>
        </select>
        <button type="submit">Thực hiện</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Update At </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {info?.map((item, index) => (
            <tr key={index}>
              <th scope="row">
                {info.indexOf(item) + 1}
                <input
                  id={item.id}
                  value={item.id}
                  name="elements"
                  type="checkbox"
                  className="checkboxInput"
                  checked={item?.isChecked || false}
                  onChange={(e) => {
                    handleChange(e);
                    formik.handleChange(e);
                  }}
                ></input>
              </th>
              <td>{` ${item.firstName} ${item.lastName}`}</td>
              <td>{item.email}</td>
              <td>{item.updatedAt}</td>
              <td>
                <BsTrashFill
                  onClick={() => handleDelete(item.id)}
                ></BsTrashFill>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/me/trash-store">Thùng rác</Link>
    </form>
  );
};

export default Store;
