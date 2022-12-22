import React from "react";
import { createContext, useState } from "react";

export const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <Auth.Provider value={{ isAuth, setIsAuth }}>{children}</Auth.Provider>
  );
};
