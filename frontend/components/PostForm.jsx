import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Upload from "./Upload";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

function PostForm() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      setContent(editorRef.current.getContent());
    }
  };
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [goodRequest, setGoodRequest] = useState("");
  const [error, setError] = useState("");
  const [postsList, setPostsList] = useState([]);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  useEffect(() => {
    getPosts;
  }, [goodRequest]);

  async function getPosts() {
    const headers = {
      "Content-Type": "application/json",
    };
    const endpoint = "https://127.0.0.1:8001/api/news/";
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
      url: "https://127.0.0.1:8001/api/news/new",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        if (response.data.errors === false) {
          setGoodRequest("Your post has been sent");
          navigate("/posts");
        }
        setErrors([response.data.data[0][0], response.data.data[1][1]]);
      })
      .catch(function (error) {});
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
          <li>{errors[0] && errors[0]}</li>
        </div>

        <div className="labels">
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="textarea"
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
          initialValue=""
          init={{
            height: "300px",
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
        <li>{errors[1]}</li>
        <Upload dir="posts_picture" />
        <button style={{ height: "5%" }} onClick={log}>
          Submit
        </button>
        <li>{goodRequest}</li>
      </form>
    </div>
  );
}

export default PostForm;
