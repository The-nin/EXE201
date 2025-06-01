import { PlusOutlined } from "@ant-design/icons";
import { Button, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllFabric } from "../../../service/admin";
import "./styles/FabricMng.scss";

function ProductMng() {
  const [fabric, setFabric] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFabrics = async () => {
      try {
        const res = await getAllFabric();
        console.log(res);
        setFabric(res);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFabrics();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Loại vải",
      dataIndex: "fabricName",
      key: "fabricName",
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
          <div className="fabric_actions">
            <button className="btn btn-primary">Chỉnh sửa</button>
            <button className="btn btn-danger">Xóa</button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="fabric_container">
      <div className="fabric_header">
        <h2>Quản lý loại vải</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/admin/fabric/add-fabric")}
        >
          Tạo mới loại vải
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={fabric}
        loading={{
          spinning: loading,
          tip: "Đang tải danh mục...",
        }}
      />
    </div>
  );
}

export default ProductMng;
