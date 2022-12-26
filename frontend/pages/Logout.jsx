import React, { useContext } from "react";
import { Auth } from "../contexts/Auth";

function Logout() {
  const { isAuth, setIsAuth } = useContext(Auth);
  window.localStorage.removeItem("token", "");
  if (window.localStorage.getItem("token") === "") {
    setIsAuth(false);
  }
  window.location.href = "https://127.0.0.1:8001/logout";
}

export default Logout;
