import React from "react";
import Header from "../components/Header";
import Content from "../components/Content";
import Footer from "../components/Footer";

function Posts() {
  return (
    <div className="container">
      <Header />
      <div className="contentContainer">
        <Content />
      </div>
      <Footer />
    </div>
  );
}

export default Posts;
