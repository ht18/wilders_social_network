import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Auth } from "../contexts/Auth";
import "../styles/header.css";

function Header() {
  const { isAuth, setIsAuth } = useContext(Auth);

  console.log(isAuth);
  return (
    <div className="headerContainer">
      <nav className="navbar">
        <img
          src="https://www.wildcodeschool.com/assets/wildcodeschool-logo-meta-image-f6f2f7f52b82bfc419f031f6a989020a8b094d7a4e6676ab6f0dff0b0f470da9.png"
          alt="wild logo"
        />
        {(!isAuth && (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )) || (
          <>
            <li>
              <Link to="/posts">News</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </>
        )}
      </nav>
    </div>
  );
}

export default Header;
