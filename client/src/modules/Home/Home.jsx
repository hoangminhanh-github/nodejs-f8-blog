import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import Modal from "../../common/Modal/Modal";
const Home = () => {
  const [users, setUsers] = useState();
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const res = await axios.get("http://localhost:3001/");
    setUsers(res.data);
  };

  return (
    <>
      <div>This is Home !!</div>
      <div className="container">
        {users?.map((user, index) => (
          <div className="card" key={index}>
            <div className="card-body">
              <h5 className="card-title">{user.firstName + user.lastName}</h5>
              <p className="card-text">{user.email}</p>
              <Link to={`users/:${user.id}`} className="btn btn-primary">
                Go
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
