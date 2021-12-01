import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signinFetch } from "../../store/auth/actions";

const Signin = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState({ email: "", password: "" });

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
    dispatch(signinFetch(value));
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
        onSubmit={createNewPost}
      >
        <input
          type="email"
          name="email"
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
