import { PlusOutlined } from "@ant-design/icons";
import { Button, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllCategory } from "../../../service/admin";
import "./styles/CategoryMng.scss";

function CategoryMng() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await getAllCategory();
        console.log(res);
        setCategory(res);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên danh mục",
      dataIndex: "categoryName",
      key: "categoryName",
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
          <div className="category-actions">
            <button className="btn btn-primary">Chỉnh sửa</button>
            <button className="btn btn-danger">Xóa</button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="category_container">
      <div className="category_header">
        <h2>Quản lý danh mục</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/admin/category/add-category")}
        >
          Tạo mới danh mục
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={category}
        loading={{
          spinning: loading,
          tip: "Đang tải danh mục...",
        }}
      />
    </div>
  );
}

export default CategoryMng;
