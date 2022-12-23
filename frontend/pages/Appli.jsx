import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Posts from "./Posts";
import Profile from "./Profile";
import Login from "./Login";
import PostDetail from "./PostDetail";
import PostDelete from "./PostDelete";
import Logout from "./Logout";
import PostEdit from "./PostEdit";
import Register from "./Register";
import PrivateRoutes from "./PrivateRoutes";
import { AuthProvider } from "../contexts/Auth";
function Appli() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/posts" element={<Posts />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/posts/:id/edit" element={<PostEdit />} />
            <Route path="/posts/:id/delete" element={<PostDelete />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>{" "}
      </Router>
    </AuthProvider>
  );
}

export default Appli;
