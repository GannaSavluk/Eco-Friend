import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signupFetch } from "../../store/auth/actions";

const Signup = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState({ name: "", email: "", password: "" });
  const onInputName = ({ target: { value } }) => {
    setValue((prev) => ({ ...prev, name: value }));
  };
  const onInputPassword = ({ target: { value } }) => {
    setValue((prev) => ({ ...prev, password: value }));
  };
  const onInputEmail = ({ target: { value } }) => {
    setValue((prev) => ({ ...prev, email: value }));
  };

  const createNewPost = (event) => {
    // TODO
    event.preventDefault();
    console.log(value);
    dispatch(signupFetch(value));
  };

  return (
    <div className="Auth">
      <h1>Signup</h1>
      <form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onSubmit={createNewPost}
      >
        <input
          type="text"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
          onChange={onInputName}
        ></input>
        <input
          type="name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
          onChange={onInputEmail}
        />
        <input
          name="password"
          type="password"
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

export default Signup;
