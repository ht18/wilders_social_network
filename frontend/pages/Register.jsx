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
  const [errorEmail, setErrorEmail] = useState();
  const [errorPseudo, setErrorPseudo] = useState();
  const [errorPassword, setErrorPassword] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (errors.includes("This is not an email")) {
      setErrorEmail("This is not an email");
    }
    if (errors.includes("Pseudo should be between 2 and 100")) {
      setErrorPseudo("Pseudo should be between 2 and 100");
    }
    if (errors.includes("Password should be between 6 and 100")) {
      setErrorPassword("Password should be between 6 and 100");
    }
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
      url: "https://127.0.0.1:8001/api/users",
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
        setErrors(response.data.data);
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
            <p>{errorEmail && errorEmail}</p>
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
            <p>{errorPassword && errorPassword}</p>
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
            <p>{errorPseudo && errorPseudo}</p>
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
