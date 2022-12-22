import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/postEdit.css";
import "../styles/content.css";
import { useNavigate } from "react-router-dom";

function PostEdit() {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [picture, setPicture] = useState("");
  const [postsList, setPostsList] = useState([]);

  const navigate = useNavigate();

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

  async function handleSubmit(event) {
    event.preventDefault();
    const data = JSON.stringify({
      topic: topic,
      content: content,
      likes: "",
    });

    const config = {
      method: "post",
      url: `https://127.0.0.1:8000/api/news/${id}/edit`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    await axios(config)
      .then(function (response) {
        getPosts();
        navigate("/posts");
      })
      .catch(function (error) {});
  }

  async function getPosts() {
    const headers = {
      "Content-Type": "application/json",
    };
    const endpoint = "https://127.0.0.1:8000/api/news/";
    await axios.get(endpoint, { headers }).then((posts) => {
      setPostsList(posts.data);
    });
  }

  return (
    <div className="postEditContainer">
      <Header />
      <div className="contentPostEdit">
        <div className="postEditContentContainer">
          <div className="postFormContainer">
            <form
              action="https://127.0.0.1:8000/posts/"
              method="get"
              onSubmit={handleSubmit}
            >
              <div className="labels">
                <label htmlFor="topic">What's the topic ? </label>
                <input
                  type="text"
                  name="topic"
                  id="topic"
                  value={topic}
                  placeholder={post.topic}
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
                  placeholder={post.content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="labels">
                <label htmlFor="picture">Picture</label>
                <input
                  type="file"
                  name="picture"
                  id="imageUpload"
                  value={picture}
                  onChange={(e) => setPicture(e.target.value)}
                />
              </div>
              <input type="submit" value="Submit" />
            </form>
          </div>
          <Link to="/posts">Back</Link>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default PostEdit;
