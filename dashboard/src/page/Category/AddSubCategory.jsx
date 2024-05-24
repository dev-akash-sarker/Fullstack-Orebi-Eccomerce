import { Alert, Button, Form, Input, Select, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AddSubCategory() {
  const userInfo = useSelector((state) => state.user.value);
  const [msg, setMsg] = useState();
  const [categorylist, setCategorylist] = useState([]);
  const [categoryid, setCategoryid] = useState("");
  const onFinish = async (values) => {
    console.log("Success:", values);
    const createCategory = await axios.post(
      "http://localhost:8000/api/v1/product/createsubcategory",
      {
        name: values.subcategoryName,
        categoryId: categoryid,
      }
    );

    setMsg(createCategory.data);
  };

  console.log(msg);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (value) => {
    setCategoryid(value);
  };

  useEffect(() => {
    async function viewcategory() {
      const data = await axios.get(
        "http://localhost:8000/api/v1/product/viewcategory"
      );

      let categoryData = [];
      data.data.map((item) => {
        categoryData.push({
          value: item._id,
          label: item.name,
        });
      });

      setCategorylist(categoryData);
    }

    viewcategory();
  }, []);
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
            wrapperCol={{
              offset: 2,
              span: 16,
            }}
          >
            <Space wrap>
              <Select
                defaultValue="Category Name"
                style={{
                  width: 150,
                }}
                onChange={handleChange}
                options={categorylist}
              />
            </Space>
          </Form.Item>
          <Form.Item
            label="SubCategory Name"
            name="subcategoryName"
            validateStatus="validating"
            rules={[
              {
                required: true,
                hideRequiredMark: true,
                message: "Please enter your subcategory name!",
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
              <Link to="/dashboard/viewsubcategory">View SubCategories</Link>
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
}
