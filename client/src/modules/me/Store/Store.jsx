import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsTrashFill, BsArrowDown, BsArrowUp } from "react-icons/bs";
import {
  AiFillEdit,
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import moment from "moment";

import "./Store.scss";
import Pagination from "../../../common/Pagination/Pagination";
const Store = () => {
  const [info, setInfo] = useState();
  const [page, setPage] = useState();
  const [totalPage, setTotalPage] = useState(0);
  const [isNameSort, setIsNameSort] = useState(false);
  const [isCreatedSort, setIsCreatedSort] = useState(false);
  const [isAgeSort, setIsAgeSort] = useState(false);
  const getInfo = async (prev) => {
    let offset = prev?.offset;
    // name sort
    const _isNameSort =
      prev?._isNameSort !== undefined ? prev._isNameSort : isNameSort;
    // create sort
    const _isCreatedSort =
      prev?._isCreatedSort !== undefined ? prev._isCreatedSort : isCreatedSort;
    // age sort
    const _isAgeSort =
      prev?._isAgeSort !== undefined ? prev._isAgeSort : isAgeSort;
    // sort array defind
    let sortArr = [];
    if (_isNameSort) {
      sortArr = ["firstName", "ASC"];
    }
    if (_isCreatedSort) {
      sortArr = ["createdAt", "DESC"];
    }
    if (_isAgeSort) {
      sortArr = ["age", "ASC"];
    }

    const res = await axios.get("http://localhost:3001/", {
      params: {
        offset: offset || page,
        order: sortArr.length > 0 ? sortArr : undefined,
      },
    });
    setTotalPage(res.data.extend?.totalUser);
    setInfo(res.data.data);
  };
  useEffect(() => {
    getInfo();
  }, []);

  // handle Checked
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
  // handle Delete
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
  // handle change page
  const handlePageChange = (e, value) => {
    const offset = value;
    setPage(value);
    getInfo({ offset: offset });
  };
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
                getInfo({
                  _isNameSort: _isNameSort,
                  _isCreatedSort: false,
                  isAgeSort: false,
                });
                setIsCreatedSort(false);
                setIsAgeSort(false);
              }}
            >
              Name
              {isNameSort ? (
                <AiOutlineSortAscending />
              ) : (
                <AiOutlineSortDescending />
              )}
            </th>
            <th
              scope="col"
              onClick={() => {
                let _isAgeSort = !isAgeSort;
                setIsAgeSort((prev) => !prev);
                getInfo({
                  _isAgeSort: _isAgeSort,
                  _isNameSort: false,
                  _isCreatedSort: false,
                });
                setIsNameSort(false);
                setIsCreatedSort(false);
              }}
            >
              Age
              {isAgeSort ? <BsArrowDown /> : <BsArrowUp />}
            </th>
            <th scope="col">Email</th>
            <th
              scope="col"
              onClick={() => {
                let _isCreatedSort = !isCreatedSort;
                setIsCreatedSort((prev) => !prev);
                getInfo({
                  _isCreatedSort: _isCreatedSort,
                  _isNameSort: false,
                  isAgeSort: false,
                });
                setIsNameSort(false);
                setIsAgeSort(false);
              }}
            >
              Create At
              {isCreatedSort ? <BsArrowDown /> : <BsArrowUp />}
            </th>
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
              <td>{item.age}</td>
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
      <Pagination count={totalPage} onChange={handlePageChange}></Pagination>
      <Link to="/me/trash-store">Thùng rác</Link>
    </form>
  );
};

export default Store;
