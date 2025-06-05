import { PlusOutlined } from "@ant-design/icons";
import { Button, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllTypePrint } from "../../../service/admin";
import "./styles/TypePrint.scss";

function TypePrintMng() {
  const [type, setType] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await getAllTypePrint();
        console.log(res);
        setType(res);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTypes();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Kiểu in",
      dataIndex: "printName",
      key: "printName",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
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
          <div className="type_actions">
            <button className="btn btn-primary">Chỉnh sửa</button>
            <button className="btn btn-danger">Xóa</button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="type_container">
      <div className="type_header">
        <h2>Quản lý kiểu in</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/admin/type-print/add-type-print")}
        >
          Tạo mới kiểu in
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={type}
        loading={{
          spinning: loading,
          tip: "Đang tải kiểu in...",
        }}
      />
    </div>
  );
}

export default TypePrintMng;
