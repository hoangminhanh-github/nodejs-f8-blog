import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BsTrashFill } from "react-icons/bs";

import StoreItem from "./StoreItem";
const Store = () => {
  const checkBoxRef = useRef(null);
  const [info, setInfo] = useState();
  const [isCheckAll, setIsCheckAll] = useState();
  useEffect(() => {
    const getInfo = async () => {
      const res = await axios.get("http://localhost:3001/");
      setInfo(res.data);
    };
    getInfo();
  }, []);
  console.log(isCheckAll);
  return (
    <>
      <input
        type="checkbox"
        ref={checkBoxRef}
        onChange={() => {
          setIsCheckAll(checkBoxRef.current.checked);
        }}
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
          {info?.map((item, index) => (
            <StoreItem
              isCheckAll={isCheckAll}
              setIsCheckAll={setIsCheckAll}
              data={item}
              gido={info.indexOf(item)}
              key={index}
            ></StoreItem>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Store;
