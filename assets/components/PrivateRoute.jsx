import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoggedContext } from "../app";

export default function PrivateRoute() {
  const isLogged = useContext(LoggedContext);
  const navigate = useNavigate();
  if (!isLogged) {
    navigate("/login");
  } else {
    navigate("/home");
  }
}
