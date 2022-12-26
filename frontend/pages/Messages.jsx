import React, { useState } from "react";

function Messages(props) {
  const [content, setContent] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    let myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${process.env.MERCURE_JWT_SECRET}`
    );
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    console.log(content);
    urlencoded.append("topic", "https://127.0.0.1:8001/messages");
    urlencoded.append(
      "data",
      `{"data" : ${JSON.stringify(content)}, "from" : "herch"}`
    );

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8000/.well-known/mercure", requestOptions)
      .then((response) => response.text())
      .then((result) => setContent(""))
      .catch((error) => console.log("error", error));
  }
  return (
    <div id="conv">
      <h1>Messages : </h1>
      <div id="msg"></div>
      <form method="post" onSubmit={handleSubmit}>
        <div className="labels">
          <label htmlFor="topic">Content </label>
          <input
            type="text"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Messages;
