import React from "react";
import PublishPost from "./PublishPost";
import PostsList from "./PostsList";

function PostsContent() {
  return (
    <div className="postsContentContainer">
      <PublishPost />
      <PostsList />
    </div>
  );
}

export default PostsContent;
