import { Table } from "antd";
import axios from "axios";

import { useEffect, useState } from "react";

export default function ViewSubCategory() {
  const [categorylist, setCategorylist] = useState([]);

  useEffect(() => {
    async function categoryNames() {
      const data = await axios.get(
        "http://localhost:8000/api/v1/product/viewsubcategory"
      );

      let categoryData = [];
      data.data.map((item) => {
        categoryData.push({
          key: item._id,
          name: item.name,
          status: item.status,
          categoryName: item.categoryId.name,
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
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
    },
  ];
  return (
    <>
      <Table dataSource={categorylist} columns={columns} />;
    </>
  );
}
