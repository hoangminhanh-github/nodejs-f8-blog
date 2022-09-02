import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JWT from "jwt-client";
import { AiFillLike } from "react-icons/ai";

import "./Details.scss";
const Details = () => {
  const { slug } = useParams();
  slug.split(":");
  const id = slug.split(":")[1];

  const [userDetails, setUserDetails] = useState();
  const [userComment, setUserComment] = useState();
  const [likeCount, setLikeCount] = useState(0);
  const [comment, setComment] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const currentUserLogin = JWT.read(accessToken).claim.firstName;
  console.log(currentUserLogin);
  useEffect(() => {
    getUserDetails();
    getUserComment();
  }, [comment]);

  const getUserDetails = async () => {
    const res = await axios.get(`http://localhost:3001/users/${id}/details`);
    setUserDetails(res.data);
  };

  const getUserComment = async () => {
    const res = await axios.get(`http://localhost:3001/comment/${id}`);
    setUserComment(res.data);
  };
  // submit comment
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment?.trim().length > 0) {
      const response = await axios.post(
        `http://localhost:3001/comment/create`,
        {
          comment: comment,
          id: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      if (response.data.error) {
        alert("Mày chưa đăng nhập phải không thằng lồn !!");
      }

      setComment("");
    }
  };
  // delete comment
  const handleDelete = async (commentId) => {
    await axios.delete(`http://localhost:3001/comment/delete`, {
      data: {
        commentId: commentId,
        userId: id,
      },
    });
    await getUserComment();
  };
  useEffect(() => {
    const getLiked = () => {
      axios.get(`http://localhost:3001/likes?userId=${id}`).then((data) => {
        setLikeCount(data.data.length);
      });
    };
    getLiked();
  }, []);
  const handleLike = () => {};
  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <span>User Name : </span>
            <h5 className="card-title">
              {userDetails?.firstName} {userDetails?.lastName}
            </h5>
            <span>Email : </span>
            <p className="card-text">{userDetails?.email}</p>
          </div>
          {/*  */}
          <div>
            <AiFillLike onClick={handleLike}></AiFillLike>
            <span>{likeCount}</span>
          </div>
        </div>
        <div className="comments">
          <form className="comments-write" onSubmit={(e) => handleSubmit(e)}>
            <div>Write your comment </div>
            <input
              type="text"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button type="submit">Enter</button>
          </form>
          <h6>{`${
            userDetails?.firstName + userDetails?.lastName
          } comments :`}</h6>
          {userComment?.map((comment, index) => {
            const commentId = comment.id;
            return (
              <div
                className="comment-line"
                key={index}
                style={{ cursor: "pointer" }}
              >
                <span
                  style={{ color: "green", display: "block", width: "100%" }}
                >
                  {comment.firstName} đã bình luận :
                </span>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span key={index}> {comment.commentBody}</span>
                  {currentUserLogin === comment.firstName && (
                    <span onClick={() => handleDelete(commentId)}>X</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Details;
