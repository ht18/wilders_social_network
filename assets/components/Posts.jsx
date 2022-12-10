import React from "react";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

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
