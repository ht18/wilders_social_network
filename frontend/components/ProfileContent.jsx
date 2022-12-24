import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import "../styles/profile.css";

function ProfileContent() {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    const config = {
      method: "get",
      url: "https://127.0.0.1:8000/api/profile",
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then(function (response) {
        setProfile(response.data);
      })
      .catch(function (error) {});
  }
  return (
    <div className="profileContainer">
      <h1>Hello {profile.length && profile[0].pseudo} !</h1>
      <div className="profileUpdate">
        <li>Your email is : {profile.length && profile[0].email}</li>
        <li>Your picture is</li>
      </div>
      <div className="postsList">
        {profile.length &&
          profile[1].map((post, index) => (
            <ul className="profilePost" key={index}>
              <Post post={post} />
            </ul>
          ))}
      </div>
    </div>
  );
}

export default ProfileContent;
