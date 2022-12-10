import { Auth } from "../contexts/Auth";
import { useContext } from "react";

export default function hasAuthenticated() {
  const { isAuth, setIsAuth } = useContext(Auth);
  if (window.localStorage.getItem("token") === "yes") {
    setIsAuth(true);
  }
}
