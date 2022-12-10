// ./assets/js/components/Users.js

import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import HomeContent from "./HomeContent";
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
