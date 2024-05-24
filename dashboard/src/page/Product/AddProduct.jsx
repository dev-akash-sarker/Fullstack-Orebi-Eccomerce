import { Alert, Button, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AddProduct() {
  const userInfo = useSelector((state) => state.user.value);
  const [images, setImages] = useState({});
  const [msg, setMsg] = useState();
  const onFinish = async (values) => {
    console.log("Success:", values);

    const createCategory = await axios.post(
      "http://localhost:8000/api/v1/product/createproduct",
      {
        name: values.productName,
        avatar: images,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setMsg(createCategory.data);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleImage = (e) => {
    setImages(e.target.files[0]);
    console.log({ ...e.target.files[0], hello: "hello" });
  };

  return (
    <>
      {msg?.success && (
        <Alert
          message={msg?.success}
          style={{ marginBottom: "10px" }}
          type="success"
          closable
          showIcon
        />
      )}
      {msg?.error && (
        <Alert
          message={msg?.error}
          style={{ marginBottom: "10px" }}
          type="error"
          closable
          showIcon
        />
      )}
      {userInfo.role !== "User" && (
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
            label="Product Name"
            name="productName"
            rules={[
              {
                required: true,
                message: "Please enter your product name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Image Upload" name="imageUpload">
            <Input onChange={handleImage} type="file" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button type="default" style={{ marginLeft: "10px" }}>
              <Link to="/dashboard/viewproduct">View Product</Link>
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
}
