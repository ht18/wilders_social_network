import { useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import Posts from "./Posts";

function PostDelete() {
  const { id } = useParams();

  async function handleSubmit() {
    const config = {
      method: "post",
      url: `https://127.0.0.1:8000/api/news/${id}/delete`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then(function (response) {
        axios.get("https://127.0.0.1:8000/api/news/");
      })
      .catch(function (error) {});
  }

  handleSubmit();

  return <Posts />;
}
export default PostDelete;
