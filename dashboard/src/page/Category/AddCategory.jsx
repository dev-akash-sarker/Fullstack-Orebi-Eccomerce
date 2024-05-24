import { Alert, Button, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AddCategory() {
  const userInfo = useSelector((state) => state.user.value);

  const [msg, setMsg] = useState();
  const onFinish = async (values) => {
    console.log("Success:", values);

    const createCategory = await axios.post(
      "http://localhost:8000/api/v1/product/createcategory",
      {
        name: values.categoryName,
      },
      {
        headers: {
          Authorization: "3_t5X`G0x!{2",
          token: userInfo.token,
        },
      }
    );

    setMsg(createCategory.data);
  };

  console.log(msg);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
            label="Category Name"
            name="categoryName"
            rules={[
              {
                required: true,
                message: "Please enter your category name!",
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
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button type="default" style={{ marginLeft: "10px" }}>
              <Link to="/dashboard/viewcategory">View Categories</Link>
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
}
