import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signinThunk } from "../../store/auth/actions";

const Signin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

  const [value, setValue] = useState({ email: "", password: "" });

  const onInputPassword = ({ target: { value } }) => {
    setValue((prev) => ({ ...prev, password: value }));
  };
  const onInputEmail = ({ target: { value } }) => {
    setValue((prev) => ({ ...prev, email: value }));
  };

  const loginFunction = (event) => {
    event.preventDefault();
    dispatch(signinThunk(value));
    navigate('/')
  };

  return (
    <div className="Auth">
      <h1>Signin</h1>
      <form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onSubmit={loginFunction}
      >
        <input
          type="email"
          name="email"
          placeholder="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
          onChange={onInputEmail}
        ></input>
        <input
          name="password"
          type="password"
          placeholder="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
          onChange={onInputPassword}
        />
        <button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </button>
        Or
        <Link to="/signup"> register now!</Link>
      </form>
    </div>
  );
};

export default Signin;
