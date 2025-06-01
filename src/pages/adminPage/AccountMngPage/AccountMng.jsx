import { Table } from "antd";
import "./AccountMng.scss";

function AccountMng() {
  const data = [
    {
      id: 1,
      username: "admin",
      role: "Quản lý",
    },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên người dùng",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Vị trí",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: () => {
        return (
          <div>
            <button className="btn btn-primary">Xem</button>
            <button className="btn btn-danger">Xoa</button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="user_container">
      <h2>Quản lý tài khoản người dùng</h2>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default AccountMng;
