import { Table } from "antd";
import axios from "axios";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ViewCategory() {
  const userInfo = useSelector((state) => state.user.value);
  const [categorylist, setCategorylist] = useState([]);

  useEffect(() => {
    async function categoryNames() {
      const data = await axios.get(
        "http://localhost:8000/api/v1/product/viewcategory"
      );

      let categoryData = [];

      data.data.map((item) => {
        categoryData.push({
          key: item._id,
          name: item.name,
          status: item.status,
        });
      });

      setCategorylist(categoryData);
    }

    categoryNames();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <>
      {userInfo.role !== "User" && (
        <Table dataSource={categorylist} columns={columns} />
      )}
    </>
  );
}
