import { PlusOutlined } from "@ant-design/icons";
import { Button, Image, Space, Table, Tag, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProduct } from "../../../service/admin";
import "./styles/ProductMng.scss";

function ProductMng() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProduct();
        console.log("Products:", res);
        setProducts(res);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  console.log(products.id);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
      width: 100,
    },
    {
      title: "Ảnh bìa",
      dataIndex: "imageThumbnail",
      key: "imageThumbnail",
      width: 120,
      render: (imageThumbnail) => {
        return imageThumbnail ? (
          <Image
            src={imageThumbnail}
            alt="Thumbnail"
            width={80}
            height={80}
            style={{ objectFit: "cover" }}
          />
        ) : (
          <Text type="secondary">No image</Text>
        );
      },
    },
    {
      title: "Ảnh",
      dataIndex: "images",
      key: "images",
      width: 200,
      render: (images) => {
        if (!images || !Array.isArray(images) || images.length === 0) {
          return <Typography.Text type="secondary">No images</Typography.Text>;
        }
        return (
          <Space size={[8, 8]} wrap>
            {images.map((img, index) => (
              <Image
                key={index}
                src={img.image || "/placeholder.svg"}
                alt={`Product ${index + 1}`}
                width={50}
                height={50}
                style={{ objectFit: "cover" }}
              />
            ))}
          </Space>
        );
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Kích cỡ",
      dataIndex: "sizes",
      key: "sizes",
      width: 150,
      render: (sizes) => {
        if (!sizes || !Array.isArray(sizes) || sizes.length === 0) {
          return <Typography.Text type="secondary">No sizes</Typography.Text>;
        }

        return (
          <Space size={[4, 4]} wrap>
            {sizes.map((sizeObj, index) => (
              <Tag key={`size-${index}`} color="blue">
                {sizeObj.size}
              </Tag>
            ))}
          </Space>
        );
      },
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
      render: (_, record) => {
        return (
          <div className="product-actions">
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/admin/product/detail/${record.id}`)}
            >
              Chi tiết
            </button>
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
        rowKey="id"
        loading={{
          spinning: loading,
          tip: "Đang tải sản phẩm...",
        }}
      />
    </div>
  );
}

export default ProductMng;
