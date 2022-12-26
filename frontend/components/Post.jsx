import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BsHandThumbsUp } from "react-icons/bs";
import { BsHandThumbsUpFill } from "react-icons/bs";

function Post({ post }) {
  const [likes, setLikes] = useState(post.likes);
  const [topic, setTopic] = useState(post.topic);
  const [content, setContent] = useState(post.content);
  const [isClicked, setIsClicked] = useState(false);

  async function likeClick(event) {
    event.preventDefault();
    setLikes(likes + 1);
    setIsClicked(!isClicked);

    const data = JSON.stringify({
      topic: topic,
      content: content,
      likes: likes + 1,
    });

    const config = {
      method: "post",
      url: `https://127.0.0.1:8001/api/news/${post.id}/edit`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    await axios(config)
      .then(function (response) {})
      .catch(function (error) {});
  }

  async function unlikeClick(event) {
    event.preventDefault();
    setLikes(likes - 1);
    setIsClicked(!isClicked);

    const data = JSON.stringify({
      topic: topic,
      content: content,
      likes: likes - 1,
    });

    const config = {
      method: "post",
      url: `https://127.0.0.1:8001/api/news/${post.id}/edit`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    await axios(config)
      .then(function (response) {})
      .catch(function (error) {});
  }

  return (
    <div className="postContainer">
      <Link to={`/posts/${post.id}`}>
        <div className="postHeader">
          <li>{post.pseudo}</li>
          <li>
            <span>{post.topic}</span>
          </li>
        </div>
      </Link>
      <div className="postContent">
        <div
          className="contentPost"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
        <li>{post.picture}</li>
        <li>
          {isClicked ? (
            <BsHandThumbsUpFill onClick={unlikeClick} />
          ) : (
            <BsHandThumbsUp onClick={likeClick} />
          )}{" "}
          {likes}
        </li>
      </div>
    </div>
  );
}

export default Post;
