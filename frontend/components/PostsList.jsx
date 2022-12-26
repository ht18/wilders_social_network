import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Post from "./Post";

function PostsList() {
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  function getPosts() {
    const headers = {
      "Content-Type": "application/json",
    };
    const endpoint = "https://127.0.0.1:8001/api/news/";
    axios.get(endpoint, { headers }).then((posts) => {
      setPostsList(posts.data);
    });
  }

  return (
    <div className="postsList">
      <ul id="postsNbr">
        <span>{postsList.length} </span>have been pusblished !
      </ul>
      <ul className="postsListContainer">
        {postsList.map((posts) => (
          <Post key={posts.id} post={posts} />
        ))}
      </ul>
    </div>
  );
}

export default PostsList;
