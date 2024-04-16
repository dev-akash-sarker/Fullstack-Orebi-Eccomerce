import axios from "axios";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ResendModal from "./ResendModal";

export default function OtpForm() {
  const [loading, setLoading] = useState(false);
  const param = useParams();
  // console.log(param.email);
  const onFinish = (values) => {
    console.log("Success:", values.otp);
    setLoading(true);
    async function emailVerification() {
      const data = await axios.post(
        "http://localhost:8000/api/v1/auth/otpverification",
        {
          email: param.email,
          otp: values.otp,
        }
      );
      console.log(data);
    }
    emailVerification();
    setLoading(false);
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
      >
        <Form.Item
          label="Code"
          name="otp"
          rules={[
            {
              required: true,
              message: "Please input your OTP!",
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
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
          >
            Submit
          </Button>
          <ResendModal />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        ></Form.Item>
      </Form>
    </>
  );
}
