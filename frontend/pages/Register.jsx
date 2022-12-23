import Header from "../components/Header";
import "../styles/login.css";
import "../styles/app.css";
import axios from "axios";
import Footer from "../components/Footer";
import Upload from "../components/Upload";
import React, { useState, useEffect } from "react";
import "../styles/register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [plainPassword, setPlainPassword] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  async function handleSubmit(event) {
    event.preventDefault();
    const image_name = window.localStorage.getItem("image_name");
    const image_size = window.localStorage.getItem("image_size");
    const time = new Date().toDateString();

    let data = JSON.stringify({
      email: email,
      plainPassword: plainPassword,
      pseudo: pseudo,
      imageName: image_name,
      updatedAt: time,
      imageSize: image_size,
    });

    var config = {
      method: "post",
      url: "https://127.0.0.1:8000/api/users",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        console.log(response);
        if (response.data.errors === false) {
          navigate("/login");
        }
        setErrors([
          response.data.data[0][0],
          response.data.data[1][1],
          response.data.data[2][2],
        ]);
      })
      .catch(function (error) {});
  }

  return (
    <div className="container">
      <Header />
      <div className="contentContainer">
        <form method="post" className="formRegister">
          <div className="labels">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p>{errors[2] && errors[2]}</p>
          </div>
          <div className="labels">
            <label htmlFor="plainPassword">Password</label>
            <input
              type="password"
              id="plainPassword"
              name="plainPassword"
              onChange={(e) => setPlainPassword(e.target.value)}
              required
            />
            <p>{errors[1] && errors[1]}</p>
          </div>
          <div className="labels">
            <label htmlFor="pseudo">Pseudo</label>
            <input
              type="text"
              id="pseudo"
              name="pseudo"
              onChange={(e) => setPseudo(e.target.value)}
              required
            />
            <p>{errors[0] && errors[0]}</p>
          </div>
          <Upload dir="user_picture" />
          <button onClick={handleSubmit}>Sign up</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
