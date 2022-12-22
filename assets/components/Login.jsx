import Header from "./Header";
import "../styles/login.css";
import "../styles/app.css";
import "../styles/home.css";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useContext } from "react";
import Footer from "./Footer";
import { Auth } from "../contexts/Auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { isAuth, setIsAuth } = useContext(Auth);

  async function handleSubmit(event) {
    event.preventDefault();
    let data = JSON.stringify({
      username: email,
      password: password,
    });

    let config = {
      method: "post",
      url: "https://127.0.0.1:8000/api/login",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };
    await axios(config)
      .then(function (response) {
        if (response.status === 200) {
          window.localStorage.setItem("token", "yes");
          if (window.localStorage.getItem("token") === "yes") {
            setIsAuth(true);
          }
          navigate("/posts");
        }
      })
      .catch(function (error) {
        setError(error);
      });
  }

  return (
    <div className="container">
      <Header />
      <div className="contentContainer">
        <div className="formContainer">
          <form className="form" onSubmit={handleSubmit}>
            <div className="labels">
              <label htmlFor="username">Email:</label>
              <input
                type="email"
                id="username"
                name="_username"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="labels">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="_password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <input type="hidden" name="_csrf_token" />

            <button type="submit">login</button>
            {error ? <p>{error.response.data.error}</p> : ""}
          </form>
          <li>
            <Link to="/register">You don't have an account, register !</Link>
          </li>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
