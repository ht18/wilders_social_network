import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ProfileContent from "./ProfileContent";
import "../styles/profile.css";

function Profile() {
  return (
    <div className="container">
      <Header />
      <div className="contentContainer">
        <ProfileContent />
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
