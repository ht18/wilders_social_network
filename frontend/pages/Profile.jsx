import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProfileContent from "../components/ProfileContent";
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
