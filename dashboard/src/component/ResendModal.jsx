import { Button, Form, Input, Modal } from "antd";
import axios from "axios";
import { useState } from "react";

export default function ResendModal() {
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
  const onHandleCancle = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    setIsModalOpen(false);
    setLoading(true);
    console.log("Success:", values.email);
    const data = await axios.post(
      "http://localhost:8000/api/v1/auth/resendemail",
      {
        email: values.email,
      }
    );

    setLoading(data.data);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Button type="primary" onClick={showModal} style={{ marginLeft: "10px" }}>
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
          onFinish={onFinish}
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
            <Button onClick={onHandleCancle} style={{ marginRight: "10px" }}>
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
    </>
  );
}
