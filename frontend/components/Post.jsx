import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Post({ post }) {
  const [likes, setLikes] = useState(post.likes);
  async function likeClick(event) {
    event.preventDefault();
    setLikes(likes + 1);

    const data = JSON.stringify({
      topic: "",
      content: "",
      likes: likes + 1,
    });

    const config = {
      method: "post",
      url: `https://127.0.0.1:8000/api/news/${post.id}/edit`,
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
          <li>id : {post.id}</li>
          <li>pseudo : {post.pseudo}</li>
          <li>{post.picture}</li>
          <li>{post.name}</li>
          <li>{post.topic}</li>
        </div>
      </Link>
      <div className="postContent">
        <li>{post.content}</li>
        <li>{post.contentImg}</li>
        <li>{likes}</li>
      </div>
      <button type="button" onClick={likeClick}>
        Like
      </button>
    </div>
  );
}

export default Post;
