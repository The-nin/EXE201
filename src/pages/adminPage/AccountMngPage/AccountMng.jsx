import { Table, Spin } from "antd";
import { useEffect, useState } from "react";
import { getAllUser } from "../../../service/admin";
import "./AccountMng.scss";

function AccountMng() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllUser();
      if (response.code === 200) {
        setUsers(response.result);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên người dùng",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Vị trí",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Trang thái",
      dataIndex: "status",
      key: "status",
    },
    // {
    //   title: "",
    //   dataIndex: "action",
    //   key: "action",
    //   render: () => {
    //     return (
    //       <div>
    //         <button className="btn btn-primary">Xem</button>
    //         <button className="btn btn-danger">Xoa</button>
    //       </div>
    //     );
    //   },
    // },
  ];

  return (
    <div className="user_container">
      <h2>Quản lý tài khoản người dùng</h2>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={users}
          loading={loading}
          rowKey="id"
        />
      </Spin>
    </div>
  );
}

export default AccountMng;
