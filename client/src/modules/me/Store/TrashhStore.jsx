import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsTrashFill } from "react-icons/bs";

const Store = () => {
  const [trashInfo, setTrashInfo] = useState();

  const getInfo = async () => {
    const res = await axios.get("http://localhost:3001/");
    setTrashInfo(res.data);
  };
  useEffect(() => {
    getInfo();
  }, []);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = trashInfo?.map((user) => {
        return { ...user, isChecked: checked };
      });
      setTrashInfo(tempUser);
    } else {
      let tempUser = trashInfo?.map((user) =>
        user.firstName === name ? { ...user, isChecked: checked } : user
      );
      setTrashInfo(tempUser);
    }
  };
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/users/delete`, {
      data: {
        id: id,
      },
    });
    await getInfo();
  };
  return (
    <>
      <input
        className="checkAllBtn"
        type="checkbox"
        checked={!trashInfo?.some((user) => user?.isChecked !== true)}
        onChange={handleChange}
        name="allSelect"
      />

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
                  name={item.firstName}
                  type="checkbox"
                  className="checkboxInput"
                  checked={item?.isChecked || false}
                  onChange={handleChange}
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
    </>
  );
};

export default Store;
