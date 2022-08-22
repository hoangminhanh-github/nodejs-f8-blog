import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
const Details = () => {
  const { slug } = useParams();
  slug.split(":");
  const id = slug.split(":")[1];
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const res = await axios.get(`http://localhost:3001/users/${id}/details`);
    setUserDetails(res.data);
  };
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {userDetails?.firstName + userDetails?.lastName}
          </h5>
          <p className="card-text">{userDetails?.email}</p>
        </div>
      </div>
    </>
  );
};

export default Details;
