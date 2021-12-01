import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { checkUserAuthThunk } from "./store/auth/actions";

import "./App.css";
import Header from "./components/Header/Header";
import Blog from "./components/Blog/Blog";
import Map from "./components/Map/Map";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import Logout from "./components/Auth/Logout";
import UserProfile from "./components/Account/UserProfile";

function App() {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.auth.user?.id);

  useEffect(() => {
    dispatch(checkUserAuthThunk());
  });
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/signup" element={!userId && <Signup />} />
        <Route path="/signin" element={!userId && <Signin />} />
        <Route path="/logout" element={userId && <Logout />} />
        <Route path="/account" element={userId && <UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;
