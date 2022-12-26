import React, { useContext } from "react";
import InstantMessaging from "./InstantMessaging";
import { Auth } from "../contexts/Auth";

function Footer() {
  const { isAuth, setIsAuth } = useContext(Auth);
  return (
    <div className="footerContainer">
      <li>Herschel from Wild Code School</li>
      <li>All rights reserved</li>
      {isAuth ? <InstantMessaging /> : ""}
    </div>
  );
}

export default Footer;
