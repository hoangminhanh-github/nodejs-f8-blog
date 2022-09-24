import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JWT from "jwt-client";
import { AiFillLike } from "react-icons/ai";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

import "./Details.scss";
const Details = () => {
  const { slug } = useParams();
  slug.split(":");
  const id = slug.split(":")[1];

  const [userDetails, setUserDetails] = useState();
  const [userComment, setUserComment] = useState();
  const [likeCount, setLikeCount] = useState(0);
  const [comment, setComment] = useState("");
  const [isLike, setIsLike] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const currentUserLogin = JWT.read(accessToken).claim.firstName;
  const accountId = JWT.read(accessToken).claim.id;
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
  // func get like count
  const getLiked = () => {
    axios.get(`http://localhost:3001/likes?userId=${id}`).then((data) => {
      const isLike = data.data.some((like) => {
        return like.AccountId === accountId;
      });
      setIsLike(isLike);
      // console.log(data.data);
      setLikeCount(data.data.length);
    });
  };
  useEffect(() => {
    getLiked();
  }, []);
  // handle liked
  const handleLike = async () => {
    await axios.post(
      `http://localhost:3001/likes/liked`,
      { userId: id },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    );
    await getLiked();
  };
  console.log(userDetails?.UserImages);
  return (
    <>
      <div className="details-container">
        <div className="card">
          <div className="card-body">
            <div className="card-body__image">
              <Splide
                options={{
                  // type: "loop",
                  height: "160px",
                  // rewind: true,
                  perPage: 3,
                  drag: true,
                  gap: "3rem",
                  flickPower: 100,
                  arrows: false,
                  width: "100%",
                  pagination: false,
                }}
              >
                {userDetails?.UserImages.map((item, index) => (
                  <SplideSlide>
                    <div className="card-body__image-item">
                      <img src={item.image} key={index} alt="" />
                    </div>
                  </SplideSlide>
                ))}
              </Splide>
            </div>
            <div className="card-body__info">
              <span>Name </span>
              <h5 className="card-title">
                {userDetails?.firstName} {userDetails?.lastName}
              </h5>
              <span>Email </span>
              <div className="card-text">{userDetails?.email}</div>
              <span>Social</span>
              <div>
                <a href={userDetails?.social}>here</a>
              </div>
            </div>
          </div>
          {/*  */}
          <div>
            <AiFillLike
              onClick={handleLike}
              className={isLike ? "liked" : ""}
            ></AiFillLike>
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
