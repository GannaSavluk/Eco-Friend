import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signupThunk } from "../../store/auth/actions";

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

  const loginFunction = (event) => {
    event.preventDefault();
    dispatch(signupThunk(value));
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
        onSubmit={loginFunction}
      >
        <input
          type="text"
          name="name"
          placeholder="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
          onChange={onInputName}
        ></input>
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
        />
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
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
