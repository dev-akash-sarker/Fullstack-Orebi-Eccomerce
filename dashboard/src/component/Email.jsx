import { Button, Form, Input, Modal } from "antd";
import axios from "axios";
import { useState } from "react";

export default function Email() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [myemail, setMyemail] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  //   const [modalText, setModalText] = useState("Content of the modal");
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async (e) => {
    console.log(e.target);
    // setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    const data = await axios.post(
      "http://localhost:8000/api/v1/auth/email",
      {
        email: myemail,
      },
      {
        headers: {
          Authorization: "3_t5X`G0x!{2",
        },
      }
    );

    setMyemail("");

    console.log(data);
    setTimeout(() => {
      setOpen(false);
      setLoading(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      <Button type="default" style={{ marginLeft: "10px" }} onClick={showModal}>
        Forget Password
      </Button>
      <Modal
        title="Email"
        open={open}
        onOk={handleOk}
        htmlType="submit"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{
            span: 0,
          }}
          wrapperCol={{
            span: 32,
          }}
          style={{
            maxWidth: 600,
            marginTop: 30,
          }}
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            title="email"
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
            <Input onChange={(e) => setMyemail(e.target.value)} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 0,
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
      </Modal>
    </>
  );
}
