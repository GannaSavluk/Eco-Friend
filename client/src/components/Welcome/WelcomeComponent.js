import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signinThunk } from "../../../store/auth/actions";

const WelcomeComponent = () => {
  return (
    <div>
      <h3>Welcome</h3>
      <p>
        {" "}
        if you want to comment and add points to the map, please{" "}
        <Link to="/signip"> signin</Link> or 
        <Link to="/signup"> signup</Link> right now.
      </p>
    </div>
  );
};
export default WelcomeComponent;
