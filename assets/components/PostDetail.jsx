import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/postDetail.css";
import "../styles/content.css";

function PostDetail() {
  const [post, setPost] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const config = {
      method: "get",
      url: `https://127.0.0.1:8000/api/news/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        setPost(response.data);
      })
      .catch(function (error) {});
  }, []);

  return (
    <div className="postDetailContainer">
      <Header />
      <div className="contentPostDetail">
        <div className="postDetailContentContainer">
          <Post key={post.id} post={post} />
          <Link to={`/posts/${id}/edit`}>Edit</Link>
          <Link to={`/posts/${id}/delete`}>Delete</Link>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default PostDetail;
