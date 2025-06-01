import { PlusOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProduct } from "../../../service/user";
import "./styles/ProductMng.scss";

function ProductMng() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProduct();
        setProducts(res);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Ảnh bìa",
      dataIndex: "imageThumbnail",
      key: "imageThumbnail",
    },
    {
      title: "Ảnh",
      dataIndex: "images",
      key: "images",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Kích cỡ",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return (
          <Tag color={status === "ACTIVE" ? "green" : "red"}>
            {status ? "Hoạt động" : "Không hoạt động"}
          </Tag>
        );
      },
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: () => {
        return (
          <div className="product-actions">
            <button className="btn btn-primary">Chỉnh sửa</button>
            <button className="btn btn-danger">Xóa</button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="product_container">
      <div className="product-header">
        <h2>Quản lý sản phẩm</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/admin/product/add-product")}
        >
          Tạo mới sản phẩm
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={products}
        loading={{
          spinning: loading,
          tip: "Đang tải sản phẩm...",
        }}
      />
    </div>
  );
}

export default ProductMng;
