import { Button, Form, Input } from "antd";
import Alert from "antd/es/alert/Alert";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Registration() {
  const [loading, setLoading] = useState(false);

  const [msg, setMsg] = useState();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    const data = await axios
      .post(
        "http://localhost:8000/api/v1/auth/registration",
        {
          name: values.username,
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            Authorization: "3_t5X`G0x!{2",
          },
        }
      )
      .then((e) => {
        if (!e.data.error) {
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      });

    console.log("hello", data.data.error);

    setLoading(false);
    setMsg("Registration successfull , please check you mail");
    if (data.data.error.length > 0) {
      setMsg({
        error: "error",
        msg: `Please try different email, email already use`,
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {msg && (
        <Alert
          message={msg.error == "error" ? msg.msg : msg}
          type={msg.error == "error" ? msg.error : "success"}
          closable
          showIcon
        />
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
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
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
        </Form.Item>
      </Form>
    </>
  );
}
