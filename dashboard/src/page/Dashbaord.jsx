import {
  AppstoreAddOutlined,
  UserOutlined,
  UserAddOutlined,
  SettingOutlined,
  FundViewOutlined,
  ProductOutlined,
} from "@ant-design/icons";

import { Outlet, useNavigate } from "react-router-dom";

import { Menu, Col, Row } from "antd";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Users", "sub1", <UserOutlined />, [
    getItem("Add User", "/dashboard/adduser", <UserAddOutlined />),
    getItem("View User", "/dashboard/viewuser", <FundViewOutlined />),
  ]),
  getItem("Product", "sub2", <ProductOutlined />, [
    getItem("Add Product", "/dashboard/addproduct", <AppstoreAddOutlined />),
    getItem("View Product", "/dashboard/viewproduct", <FundViewOutlined />),
  ]),
  {
    type: "divider",
  },
  getItem("Category", "sub4", <SettingOutlined />, [
    getItem("Add Category", "/dashboard/addcategory", <AppstoreAddOutlined />),
    getItem("View Category", "/dashboard/viewcategory", <FundViewOutlined />),
    getItem("Add SubCategory", "7", <AppstoreAddOutlined />),
    getItem("View SubCategory", "8", <FundViewOutlined />),
  ]),
];
export default function Dashbaord() {
  const navigate = useNavigate();
  const onClick = (e) => {
    console.log("click ", e);
    navigate(e.key);
  };
  return (
    <>
      <div>
        <Row gutter={200}>
          <Col span={4}>
            <Menu
              onClick={onClick}
              style={{
                width: 256,
              }}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              items={items}
            />
          </Col>
          <Col span={20}>
            <Outlet />
          </Col>
        </Row>
      </div>
    </>
  );
}
