import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Upload from "./Upload";

function PostForm() {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [goodRequest, setGoodRequest] = useState("");
  const [error, setError] = useState("");
  const [postsList, setPostsList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getPosts;
  }, [goodRequest]);

  async function getPosts() {
    const headers = {
      "Content-Type": "application/json",
    };
    const endpoint = "https://127.0.0.1:8000/api/news/";
    await axios.get(endpoint, { headers }).then((posts) => {
      setPostsList(posts.data);
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const image_name = window.localStorage.getItem("image_name");
    const image_size = window.localStorage.getItem("image_size");
    let data = JSON.stringify({
      topic: topic,
      content: content,
      picture: image_name,
      pictureSize: image_size,
    });

    let config = {
      method: "post",
      url: "https://127.0.0.1:8000/api/news/new",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        setGoodRequest("Your post has been sent");
        navigate("/posts");
      })
      .catch(function (error) {
        setError(error.response.data.error);
      });
  }

  return (
    <div className="postFormContainer">
      <form method="post" className="publishForm" onSubmit={handleSubmit}>
        <div className="labels">
          <label htmlFor="topic">What is the topic ? </label>
          <input
            type="text"
            name="topic"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </div>

        <div className="labels">
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <Upload dir="posts_picture" />
        <input type="submit" value="Submit" />
        <li>{goodRequest}</li>
      </form>
    </div>
  );
}

export default PostForm;
