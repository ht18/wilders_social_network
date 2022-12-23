import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Auth } from "../contexts/Auth";
import JwtToken from "../services/JwtToken";

const PrivateRoutes = () => {
  JwtToken();
  const { isAuth, setIsAuth } = useContext(Auth);
  if (window.localStorage.getItem("token")) {
    setIsAuth(true);
  }
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
