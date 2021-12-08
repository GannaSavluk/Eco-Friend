import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupThunk } from "../../store/auth/actions";
import { Input, Button } from "antd";

const Signup = () => {
  const navigate = useNavigate();
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
    navigate("/");
  };

  return (
    <div className="Auth">
      <div>
        <h1>Signup</h1>
      </div>
      <div>
        <form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onSubmit={loginFunction}
        >
          <Input
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
          />
          <Input
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
          <Input
            placeholder="Basic usage"
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
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Signup
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
