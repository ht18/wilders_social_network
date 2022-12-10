import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Auth } from "../contexts/Auth";

const PrivateRoutes = () => {
  const { isAuth, setIsAuth } = useContext(Auth);
  if (window.localStorage.getItem("token") === "yes") {
    setIsAuth(true);
  }
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
