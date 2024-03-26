import axios from "axios";
import { Button, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import { useParams } from "react-router-dom";

export default function Otpverification() {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (values) => {
    setIsModalOpen(false);
    console.log("valie", values);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
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

  const onFinishHello = async (values) => {
    setIsModalOpen(false);
    console.log("Success:", values.email);
    const data = await axios.post(
      "http://localhost:8000/api/v1/auth/resendemail",
      {
        email: values.email,
      }
    );

    console.log(data);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onHandleCancle = () => {
    setIsModalOpen(false);
  };

  // const param = useParams();
  // console.log(param);
  // console.log("hello world");
  useEffect(() => {});
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
          <Button
            type="primary"
            onClick={showModal}
            style={{ marginLeft: "10px" }}
          >
            Resend Email
          </Button>
          <Modal
            title="Resend Email"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <Form
              name="basic"
              labelCol={{
                span: -8,
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
              onFinish={onFinishHello}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
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
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
                style={{ textAlign: "right" }}
              >
                <Button
                  onClick={onHandleCancle}
                  style={{ marginRight: "10px" }}
                >
                  Cancle
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={loading}
                >
                  ok
                </Button>
              </Form.Item>
            </Form>
          </Modal>
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
