import { Button, Form, Input } from "antd";
import Alert from "antd/es/alert/Alert";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Registration() {
  const [loading, setLoading] = useState(false);

  const [msg, setMsg] = useState();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    // eslint-disable-next-line no-unused-vars
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
        console.log("dekhi", e);
        if (!e.data.error) {
          setTimeout(() => {
            navigate("/login");
          }, 1000);
          setMsg("Registration successfull , please check you mail");
        } else {
          setMsg({
            error: "error",
            msg: `Please try different email, email already use`,
          });
        }
      });

    console.log("hello", msg);

    if (!msg.error) {
      setLoading(false);
    } else {
      setLoading(true);
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
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <p>
            if you have a account, here <Link to={"/login"}>Log in</Link>
          </p>
        </Form.Item>
      </Form>
    </>
  );
}
