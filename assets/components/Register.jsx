import Header from "./Header";
import "../styles/login.css";
import "../styles/app.css";
import axios from "axios";
import Footer from "./Footer";
import React, { useState } from "react";
import "../styles/register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [plainPassword, setPlainPassword] = useState("");
  const [pseudo, setPseudo] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    let data = JSON.stringify({
      email: email,
      plainPassword: plainPassword,
      pseudo: pseudo,
      imageFile: null,
    });

    var config = {
      method: "post",
      url: "https://127.0.0.1:8000/api/users",
      headers: {
        "Content-Type": "Content-Type': 'application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
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
          </div>
          <div className="labels">
            <label htmlFor="imageFile">Profile Picture</label>
            <input id="imageFile" type="file" name="imageFile" />
          </div>

          <button onClick={handleSubmit} type="submit">
            Sign up
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
