import { Button, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    console.log("Success:", values);
    setLoading(true);
    const data = await axios.post(
      "http://localhost:8000/api/v1/auth/forgetpass",
      {
        email: values.email,
      }
    );
    setLoading(false);
    console.log("hello", data);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
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
          rules={[
            {
              required: true,
              message: "Please enter your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            loading={loading}
            disabled={loading}
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
