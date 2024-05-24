import {
  AppstoreAddOutlined,
  UserOutlined,
  UserAddOutlined,
  SettingOutlined,
  FundViewOutlined,
  ProductOutlined,
} from "@ant-design/icons";

import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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

export default function Dashbaord() {
  const userInfo = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const onClick = (e) => {
    console.log("click ", e);
    navigate(e.key);
  };
  const items = [
    userInfo.role !== "User" &&
      getItem("Users", "sub1", <UserOutlined />, [
        getItem("Add User", "/dashboard/adduser", <UserAddOutlined />),
        getItem("View User", "/dashboard/viewuser", <FundViewOutlined />),
      ]),
    userInfo.role !== "User" &&
      getItem("Product", "sub2", <ProductOutlined />, [
        getItem(
          "Add Product",
          "/dashboard/addproduct",
          <AppstoreAddOutlined />
        ),
        getItem("View Product", "/dashboard/viewproduct", <FundViewOutlined />),
      ]),
    {
      type: "divider",
    },
    userInfo.role !== "User" &&
      getItem("Category", "sub4", <SettingOutlined />, [
        getItem(
          "Add Category",
          "/dashboard/addcategory",
          <AppstoreAddOutlined />
        ),
        getItem(
          "View Category",
          "/dashboard/viewcategory",
          <FundViewOutlined />
        ),
        getItem(
          "Add SubCategory",
          "/dashboard/addsubcategory",
          <AppstoreAddOutlined />
        ),
        getItem(
          "View SubCategory",
          "/dashboard/viewsubcategory",
          <FundViewOutlined />
        ),
      ]),
    userInfo.role == "User" &&
      getItem("My Profile", "sub1", <UserOutlined />, [
        getItem("parchase detail", ""),
        getItem("profile", ""),
      ]),
  ];
  return (
    <>
      <div>
        <Row gutter={0}>
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
