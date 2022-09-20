import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsTrashFill } from "react-icons/bs";
import { MdRestore } from "react-icons/md";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

import "./Store.scss";
const Store = () => {
  const [trashInfo, setTrashInfo] = useState();

  const getInfo = async () => {
    const res = await axios.get("http://localhost:3001/", {
      params: { paranoid: true },
    });
    setTrashInfo(res.data);
  };
  useEffect(() => {
    getInfo();
  }, []);

  const handleChange = (e) => {
    const { id, checked } = e.target;
    if (id === "allSelect") {
      let tempUser = trashInfo?.map((user) => {
        return { ...user, isChecked: checked };
      });
      setTrashInfo(tempUser);
    } else {
      let tempUser = trashInfo?.map((user) =>
        user.id == id ? { ...user, isChecked: checked } : user
      );
      setTrashInfo(tempUser);
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm(`Delete user id ${id}`)) {
      await axios.delete(`http://localhost:3001/users/delete`, {
        data: {
          force: true,
          id: id,
        },
      });
      await getInfo();
    } else {
      // Do nothing!
    }
  };
  // handle re-store
  const handleReStore = async (id) => {
    await axios.patch(`http://localhost:3001/users/restore`, {
      params: {
        id: id,
      },
    });
    await getInfo();
  };

  // formik init
  const formik = useFormik({
    initialValues: {
      action: "",
      elements: [],
    },
    // handle submit
    onSubmit: async (values) => {
      let valuesArr = values.elements;
      if (valuesArr.includes("all")) {
        valuesArr.splice("all");
        trashInfo.forEach((item) => {
          if (item.isChecked) {
            return valuesArr.push(item.id);
          }
        });
      }
      switch (values.action) {
        case "delete":
          if (window.confirm(`Delete user`)) {
            await axios.delete("http://localhost:3001/users/delete", {
              data: {
                force: true,
                id: values.elements,
              },
            });
            await getInfo();
          } else {
            // Do nothing!
          }

          break;
        case "restore":
          await axios.patch(`http://localhost:3001/users/restore`, {
            params: {
              id: values.elements,
            },
          });
          await getInfo();
          break;
        default:
        // code block
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="store__container">
      <h3>Force delete store</h3>
      {trashInfo?.length > 0 ? (
        <>
          <div className="store__container-header">
            <input
              className="checkAllBtn"
              type="checkbox"
              checked={!trashInfo?.some((user) => user?.isChecked !== true)}
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
              <option value="delete">--Force Delete--</option>
              <option value="restore">--Restore--</option>
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
              {trashInfo?.map((item, index) => (
                <tr key={index}>
                  <th scope="row">
                    {trashInfo.indexOf(item) + 1}
                    <input
                      name="elements"
                      value={item.id}
                      id={item.id}
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
                    <MdRestore
                      onClick={() => handleReStore(item.id)}
                    ></MdRestore>
                  </td>
                  <td>
                    <BsTrashFill
                      onClick={() => handleDelete(item.id)}
                    ></BsTrashFill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <span>quay lai</span>
      )}
      <Link to="/me/store">me store</Link>
    </form>
  );
};

export default Store;
