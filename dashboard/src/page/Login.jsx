import { Button, Form, Input } from "antd";
import Alert from "antd/es/alert/Alert";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { Loginusers } from "../Features/slice/loginSlice";
export default function Login() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [msg, setMsg] = useState();
  const onFinish = async (values) => {
    const data = await axios.post(
      "http://localhost:8000/api/v1/auth/login",
      {
        email: values.email,
        password: values.password,
      },
      {
        headers: {
          Authorization: "3_t5X`G0x!{2",
        },
      }
    );

    setLoading(false);
    setMsg(data.data);

    dispatch(Loginusers(data.config.data));
    localStorage.setItem("users", JSON.stringify(data.config.data));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {msg?.success && (
        <Alert message={msg?.success} type="success" closable showIcon />
      )}
      {msg?.error && (
        <Alert message={msg?.error} type="error" closable showIcon />
      )}

      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="center"
      >
        <Form.Item
          label="Email"
          name="email"
          autocomplete="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          //   autocomplete="current-password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
          >
            Submit
          </Button>
          <Button type="default" style={{ marginLeft: "10px" }}>
            <Link to="/forgetpassword">Forget Password</Link>
          </Button>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <p>
            if you does not have a account, here
            <Link to={"/"}> Sign Up</Link>
          </p>
        </Form.Item>
      </Form>
    </>
  );
}
