import { Table } from "antd";
import axios from "axios";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ViewProduct() {
  const userInfo = useSelector((state) => state.user.value);
  const [productlist, setProductlist] = useState([]);

  useEffect(() => {
    async function productsNames() {
      const data = await axios.get(
        "http://localhost:8000/api/v1/product/allproducts"
      );

      let productData = [];

      data.data.map((item) => {
        productData.push({
          key: item._id,
          name: item.name,
          image: item.image,
        });
      });

      setProductlist(productData);
    }

    productsNames();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <img
          className="productimagecss"
          src={`http://localhost:8000${record.image}`}
          alt="image"
        />
      ),
    },
  ];

  return (
    <>
      {userInfo.role !== "User" && (
        <Table dataSource={productlist} columns={columns} />
      )}
    </>
  );
}
