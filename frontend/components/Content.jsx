import React from "react";
import Sidebar from "./Sidebar";
import PostsContent from "./PostsContent";
import "../styles/content.css";

function Content() {
  return (
    <div className="postsContainer">
      <div className="postsContent">
        <Sidebar />
        <PostsContent />
        <Sidebar />
      </div>
    </div>
  );
}

export default Content;
