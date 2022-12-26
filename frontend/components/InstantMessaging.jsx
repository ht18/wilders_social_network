import React, { useState, useEffect } from "react";
import Messages from "../pages/Messages";

function InstantMessaging(props) {
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    console.log(isClicked);
  }, [isClicked]);
  return (
    <div id="instantMessaging">
      <li onClick={() => setIsClicked(!isClicked)}>Instant Messaging</li>
      {isClicked ? <Messages /> : ""}
    </div>
  );
}

export default InstantMessaging;
