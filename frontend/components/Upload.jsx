import React, { useState, useEffect } from "react";

function Upload({ dir }) {
  const [myFile, setMyfile] = useState({});
  const [msg, setMsg] = useState("");

  useEffect(() => {
    uploadFile();
  }, [myFile]);

  function setFile(event) {
    document.getElementById("mfile").click();
    setMyfile(event.target.files[0]);
  }
  async function uploadFile() {
    let token = window.localStorage.getItem("token");

    let myHeaders = new Headers();
    if (token) {
      myHeaders.append("Authorization", `Bearer ${token}`);
    }
    let formdata = new FormData();
    formdata.append("file", myFile);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };
    await fetch(`https://127.0.0.1:8000/api/uploads/${dir}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        window.localStorage.setItem("image_name", result.name);
        window.localStorage.setItem("image_size", result.size);
        setMsg(result);
      })
      .catch((error) => console.log("error", error));
  }
  return (
    <div className="uploadContainer">
      <label htmlFor="uploadFile" className="labels" />
      <input type="file" name="mfile" id="mfile" onChange={setFile} />
      <p>{msg.data}</p>
    </div>
  );
}

export default Upload;
