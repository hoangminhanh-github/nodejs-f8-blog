import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import moment from "moment";

import Model from "../../../common/Modal/Modal";
import "./Store.scss";
const Store = () => {
  const [info, setInfo] = useState();
  const [page, setPage] = useState();
  const [isNameSort, setIsNameSort] = useState(false);
  const [isUpDatedSort, setIsUpDatedSort] = useState(false);
  const [isModel, setIsModel] = useState(false);
  const getInfo = async (prev) => {
    console.log(prev);
    let offset = prev?.offset;
    const _isNameSort =
      prev?._isNameSort !== undefined ? prev._isNameSort : isNameSort;
    let _isUpDatedSort = prev?._isUpDatedSort;
    console.log(_isNameSort);
    const res = await axios.get("http://localhost:3001/", {
      params: {
        offset: offset || page,
        order: _isNameSort ? ["firstName", "ASC"] : undefined,
      },
    });
    setInfo(res.data);
  };
  console.log(isNameSort);
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
            <th
              scope="col"
              onClick={() => {
                let _isNameSort = !isNameSort;
                setIsNameSort((prev) => !prev);
                getInfo({ _isNameSort: _isNameSort });
              }}
            >
              Name
            </th>
            <th scope="col">Email</th>
            <th scope="col">Create At </th>
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
              {/*  */}
              {/* <td>{item.updatedAt}</td> */}
              <td>{moment(item.createdAt).format("ll")}</td>
              <td>{moment(item.updatedAt).format("ll")}</td>
              <td>
                <Link to={`/me/store/edit/${item.id}`}>
                  <AiFillEdit className="icons"></AiFillEdit>
                </Link>
                <BsTrashFill
                  className="icons"
                  onClick={() => handleDelete(item.id)}
                ></BsTrashFill>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <select
        name=""
        id=""
        onChange={(e) => {
          const offset = e.target.value;
          setPage(e.target.value);
          getInfo({ offset: offset });
        }}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
      <Link to="/me/trash-store">Thùng rác</Link>
    </form>
  );
};

export default Store;
