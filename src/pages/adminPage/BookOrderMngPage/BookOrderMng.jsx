import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Modal,
  Select,
  Row,
  Input,
  Col,
  Typography,
  message,
  Button,
} from "antd";
import { EyeOutlined, CloseCircleOutlined } from "@ant-design/icons";
import {
  getAllBookOrders,
  getAllDesigner,
  assignDesigner,
} from "../../../service/admin";
import "./styles/BookOrderMng.scss";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const statusOrder = [
  "CANCELED",
  "FINISHED",
  "DELIVERY",
  "CUSTOMER_REJECTED",
  "CUSTOMER_ACCEPTED",
  "CUSTOMER_RECEIVED",
  "ASSIGNED_TASK",
  "PAYMENT",
  "PENDING",
];

const colorMap = {
  PENDING: "orange",
  APPROVED: "green",
  REJECTED: "red",
  CANCELED: "red",
  FINISHED: "blue",
  DELIVERY: "purple",
  CUSTOMER_REJECTED: "red",
  CUSTOMER_ACCEPTED: "green",
  CUSTOMER_RECEIVED: "cyan",
  ASSIGNED_TASK: "geekblue",
  PAYMENT: "gold",
};

function BookOrderMng() {
  const [orders, setOrders] = useState([]);
  const [designers, setDesigners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedDesignerId, setSelectedDesignerId] = useState("");
  const [cancelReason, setCancelReason] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ordersRes, designersRes] = await Promise.all([
        getAllBookOrders(),
        getAllDesigner(),
      ]);

      let ordersArr = Array.isArray(ordersRes) ? ordersRes : [];

      ordersArr.sort(
        (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
      );

      setOrders(ordersArr);
      setDesigners(Array.isArray(designersRes) ? designersRes : []);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
      message.error("Không thể tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openDetailModal = (order) => {
    setSelectedOrder(order);
    setSelectedDesignerId(order.designerId || "");
    setDetailModalOpen(true);
  };

  const openCancelModal = (order) => {
    setSelectedOrder(order);
    setCancelReason("");
    setCancelModalOpen(true);
  };

  const handleAssignDesigner = async () => {
    if (!selectedDesignerId) {
      message.error("Vui lòng chọn Designer để gán.");
      return;
    }

    const designerInfo = designers.find((d) => d.id === selectedDesignerId);
    if (!designerInfo) {
      message.error("Không tìm thấy thông tin Designer.");
      return;
    }

    try {
      setLoading(true);

      await assignDesigner(
        {
          designName: designerInfo.fullName,
          designerId: designerInfo.id,
          response: "",
        },
        selectedOrder.id
      );

      message.success(
        `Đã gán Designer "${designerInfo.fullName}" cho đơn hàng #${selectedOrder.id}`
      );

      await fetchData(); // reload từ server

      setDetailModalOpen(false);
    } catch (error) {
      console.error("Gán Designer thất bại:", error);
      message.error("Gán Designer thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = () => {
    if (!cancelReason.trim()) {
      message.error("Vui lòng nhập lý do huỷ đơn.");
      return;
    }

    message.success(`Đã huỷ đơn hàng #${selectedOrder.id}`);
    setCancelModalOpen(false);
    setOrders((prev) =>
      prev.map((o) =>
        o.id === selectedOrder.id ? { ...o, status: "REJECTED" } : o
      )
    );
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: 80,
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customerName",
      key: "customerName",
      ellipsis: true,
      width: 150,
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) =>
        value ? new Date(value).toLocaleDateString("vi-VN") : "--",
      width: 110,
    },
    {
      title: "Màu",
      dataIndex: "color",
      key: "color",
      render: (color) => (
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: 6,
            backgroundColor: color,
            border: "1px solid #ddd",
          }}
        />
      ),
      width: 60,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={colorMap[status] || "default"}>{status}</Tag>
      ),
      width: 110,
    },
    {
      title: "Designer",
      dataIndex: "designName",
      key: "designName",
      width: 150,
      render: (name) => name || "--",
    },
    {
      title: "Giá tổng",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => `${price?.toFixed(2) || "0.00"}₫`,
      width: 110,
    },
    {
      title: "Hành động",
      key: "action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <div style={{ display: "flex", gap: 12 }}>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => openDetailModal(record)}
            title="Xem chi tiết"
          />
          <Button
            type="link"
            icon={<CloseCircleOutlined />}
            danger
            disabled={record.status === "REJECTED"}
            onClick={() => openCancelModal(record)}
            title="Huỷ đơn"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="book-order-container" style={{ padding: 24 }}>
      <Title level={3} style={{ marginBottom: 24 }}>
        Quản lý đơn đặt hàng
      </Title>

      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 900 }}
        bordered
      />

      {/* Modal chi tiết */}
      <Modal
        title={`Chi tiết đơn hàng #${selectedOrder?.id || ""}`}
        open={detailModalOpen}
        onCancel={() => setDetailModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalOpen(false)}>
            Đóng
          </Button>,
          !selectedOrder?.designerId && (
            <Button
              key="assign"
              type="primary"
              onClick={handleAssignDesigner}
              disabled={!selectedDesignerId}
            >
              Gán Designer
            </Button>
          ),
        ]}
        width={600}
      >
        {selectedOrder ? (
          <div>
            <Row gutter={[16, 12]}>
              <Col span={10}>
                <Text strong>Số lượng:</Text>
              </Col>
              <Col span={14}>{selectedOrder.quantity}</Col>

              <Col span={10}>
                <Text strong>Tên khách hàng:</Text>
              </Col>
              <Col span={14}>{selectedOrder.customerName || "--"}</Col>

              <Col span={10}>
                <Text strong>Ngày đặt:</Text>
              </Col>
              <Col span={14}>
                {selectedOrder.createdAt
                  ? new Date(selectedOrder.createdAt).toLocaleDateString(
                      "vi-VN"
                    )
                  : "--"}
              </Col>

              <Col span={10}>
                <Text strong>Màu sắc:</Text>
              </Col>
              <Col span={14}>
                <div
                  style={{
                    display: "inline-block",
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    backgroundColor: selectedOrder.color,
                    border: "1px solid #ddd",
                  }}
                />
              </Col>

              <Col span={10}>
                <Text strong>Trạng thái:</Text>
              </Col>
              <Col span={14}>
                <Tag color={colorMap[selectedOrder.status] || "default"}>
                  {selectedOrder.status}
                </Tag>
              </Col>

              <Col span={10}>
                <Text strong>Designer đã gán:</Text>
              </Col>
              <Col span={14}>{selectedOrder.designerName || "--"}</Col>

              <Col span={10}>
                <Text strong>Giá tổng:</Text>
              </Col>
              <Col span={14}>
                {selectedOrder.totalPrice?.toFixed(2) || "0.00"}₫
              </Col>

              <Col span={10}>
                <Text strong>Mô tả:</Text>
              </Col>
              <Col span={14}>
                <Paragraph style={{ margin: 0 }}>
                  {selectedOrder.description || "--"}
                </Paragraph>
              </Col>

              <Col span={24} style={{ marginTop: 16 }}>
                {!selectedOrder.designerId ? (
                  <>
                    <Text strong>Chọn Designer để gán:</Text>
                    <Select
                      placeholder="Chọn Designer..."
                      value={selectedDesignerId}
                      onChange={setSelectedDesignerId}
                      style={{ width: "100%", marginTop: 8 }}
                      allowClear
                    >
                      {designers.map((designer) => (
                        <Option key={designer.id} value={designer.id}>
                          {designer.fullName}
                        </Option>
                      ))}
                    </Select>
                  </>
                ) : null}
              </Col>
            </Row>
          </div>
        ) : (
          <Text>Không có dữ liệu đơn hàng</Text>
        )}
      </Modal>

      {/* Modal huỷ đơn */}
      <Modal
        title={`Huỷ đơn hàng #${selectedOrder?.id || ""}`}
        open={cancelModalOpen}
        onCancel={() => setCancelModalOpen(false)}
        onOk={handleCancelOrder}
        okText="Xác nhận huỷ"
        okButtonProps={{ danger: true }}
        width={500}
      >
        <Text>Vui lòng nhập lý do huỷ đơn hàng:</Text>
        <Input.TextArea
          rows={4}
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
          placeholder="Lý do huỷ đơn..."
          maxLength={500}
          allowClear
          style={{ marginTop: 8 }}
        />
      </Modal>
    </div>
  );
}

export default BookOrderMng;
