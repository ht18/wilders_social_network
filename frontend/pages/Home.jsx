// ./assets/js/components/Users.js

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeContent from "../components/HomeContent";
import "../styles/home.css";

function Home() {
  return (
    <div className="container">
      <Header />
      <HomeContent />
      <Footer />
    </div>
  );
}

export default Home;
