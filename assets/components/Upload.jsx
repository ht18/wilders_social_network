import React, { useState, useEffect } from "react";

function Upload() {
  const [myFile, setMyfile] = useState({});
  const [msg, setMsg] = useState("");
  useEffect(() => {
    uploadFile();
  }, [myFile]);
  useEffect(() => console.log(msg), [msg]);

  function setFile(event) {
    document.getElementById("mfile").click();
    setMyfile(event.target.files[0]);
  }

  async function uploadFile() {
    console.log(myFile);

    let formdata = new FormData();
    formdata.append("file", myFile);

    let requestOptions = {
      method: "POST",
      body: formdata,
    };
    console.log(formdata);

    await fetch(
      "https://127.0.0.1:8000/api/uploads/user_picture",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setMsg(result))
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
