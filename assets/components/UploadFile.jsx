import React, { useState } from "react";
import "../styles/home.css";
import "../styles/content.css";
import "../styles/app.css";

function UploadFile() {
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);

    setIsSelected(true);
  };

  console.log(selectedFile);
  async function handleSubmission() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var formdata = new FormData();
    formdata.append("imageFile", selectedFile, `${selectedFile.name}`);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://127.0.0.1:8000/upload/profilePic", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }
  return (
    <div className="testContainer">
      <div className="labels">
        <input type="file" name="file" onChange={changeHandler} />
        {isSelected ? (
          <div>
            <p>Filename: {selectedFile.name}</p>
            <p>Filetype: {selectedFile.type}</p>
            <p>Size in bytes: {selectedFile.size}</p>
            <p>
              lastModifiedDate:{" "}
              {selectedFile.lastModifiedDate.toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p>Select a file to show details</p>
        )}
        <div>
          <button type="submit" onClick={handleSubmission}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadFile;
