import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/postEdit.css";
import "../styles/content.css";
import PostForm from "../components/PostForm";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import Upload from "../components/Upload";

function PostEdit() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      setContent(editorRef.current.getContent());
    }
  };
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
      url: `https://127.0.0.1:8001/api/news/${id}`,
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
    const image_name = window.localStorage.getItem("image_name");
    const image_size = window.localStorage.getItem("image_size");
    const data = JSON.stringify({
      topic: topic,
      content: content,
      picture: image_name,
      pictureSize: image_size,
      likes: "",
    });

    const config = {
      method: "post",
      url: `https://127.0.0.1:8001/api/news/${id}/edit`,
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
    const endpoint = "https://127.0.0.1:8001/api/news/";
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
              className="formEdit"
              action="https://127.0.0.1:8001/posts/"
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
                  id="textareaBis"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  style={{ display: "none" }}
                />
              </div>
              <Editor
                tinymceScriptSrc={
                  "https://127.0.0.1:8001" + "/tinymce/tinymce.min.js"
                }
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={post.content}
                init={{
                  height: "50%",
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "link",
                    "image",
                    "lists",
                    "charmap",
                    "anchor",
                    "pagebreak",
                    "searchreplace",
                    "wordcount",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "emoticons",
                    "template",
                    "codesample",
                  ],
                  toolbar:
                    "undo redo | styles | bold italic underline | alignleft aligncenter alignright alignjustify |" +
                    "bullist numlist outdent indent | link image | print preview media fullscreen | " +
                    "forecolor backcolor emoticons",
                  content_style:
                    "body{font-family:Helvetica,Arial,sans-serif; font-size:16px}",
                }}
              />

              <div className="labels">
                <label htmlFor="picture">Picture</label>
                <Upload dir="posts_picture" />
              </div>
              <button style={{ height: "5%", width: "100%" }} onClick={log}>
                Submit
              </button>
              <Link to="/posts">Back</Link>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default PostEdit;
