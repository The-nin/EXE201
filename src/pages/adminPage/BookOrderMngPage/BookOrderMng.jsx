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
  Steps,
} from "antd";
import { EyeOutlined, CloseCircleOutlined } from "@ant-design/icons";
import {
  getAllBookOrders,
  getAllDesigner,
  assignDesigner,
  cancelBookOrder,
  getAddressId,
} from "../../../service/admin";
import "./styles/BookOrderMng.scss";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Step } = Steps;

const statusOrder = [
  "PENDING",
  "PAYMENT",
  "ASSIGNED_TASK",
  "DELIVERY",
  "CUSTOMER_RECEIVED",
  "CUSTOMER_ACCEPTED",
  "CUSTOMER_REJECTED",
  "FINISHED",
  "CANCELED",
];

const colorMap = {
  PENDING: "orange",
  PAYMENT: "gold",
  ASSIGNED_TASK: "geekblue",
  DELIVERY: "purple",
  CUSTOMER_RECEIVED: "cyan",
  CUSTOMER_ACCEPTED: "green",
  CUSTOMER_REJECTED: "red",
  FINISHED: "blue",
  CANCELED: "red",
};

const statusLabelMap = {
  PENDING: "Chờ xử lý",
  PAYMENT: "Đã thanh toán",
  ASSIGNED_TASK: "Đã gán Designer",
  DELIVERY: "Đang giao",
  CUSTOMER_RECEIVED: "Khách đã nhận",
  CUSTOMER_ACCEPTED: "Khách chấp nhận",
  CUSTOMER_REJECTED: "Khách từ chối",
  FINISHED: "Hoàn tất",
  CANCELED: "Đã hủy",
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
  const [addressDetails, setAddressDetails] = useState(null);
  const [addressLoading, setAddressLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ordersRes, designersRes] = await Promise.all([
        getAllBookOrders(),
        getAllDesigner(),
      ]);

      let ordersArr = Array.isArray(ordersRes) ? ordersRes : [];
      ordersArr.sort(
        (a, b) =>
          statusOrder.indexOf(a.enumBookOrder) -
          statusOrder.indexOf(b.enumBookOrder)
      );

      setOrders(ordersArr);
      console.log("Orders:", ordersArr);
      setDesigners(Array.isArray(designersRes) ? designersRes : []);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
      message.error("Không thể tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const fetchAddressDetails = async (addressId) => {
    try {
      setAddressLoading(true);
      const address = await getAddressId(addressId);
      setAddressDetails(address);
      console.log("Address details:", address);
    } catch (error) {
      console.error("Failed to fetch address details:", error);
      message.error("Không thể tải thông tin địa chỉ");
      setAddressDetails(null);
    } finally {
      setAddressLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openDetailModal = (order) => {
    console.log("Opening detail modal for order:", order);
    setSelectedOrder(order);
    setSelectedDesignerId(order.designerId || "");
    setDetailModalOpen(true);

    // Use consistent addressId key
    const addrId = order.addressId || order.address_id;
    if (addrId) {
      fetchAddressDetails(addrId);
    } else {
      setAddressDetails(null);
      setAddressLoading(false);
      console.warn("No address id found in order:", order.id);
      message.warning("Đơn hàng không có thông tin địa chỉ");
    }
  };

  const openCancelModal = (order) => {
    console.log("Opening cancel modal for order:", order);
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
      await assignDesigner(selectedOrder.id, {
        designName: designerInfo.fullName,
        designerId: designerInfo.id,
        response: "",
      });

      message.success(
        `Đã gán Designer "${designerInfo.fullName}" cho đơn hàng #${selectedOrder.id}`
      );

      await fetchData();
      setDetailModalOpen(false);
    } catch (error) {
      console.error("Gán Designer thất bại:", error);
      message.error("Gán Designer thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!cancelReason.trim()) {
      message.error("Vui lòng nhập lý do hủy đơn.");
      return;
    }

    console.log("Sending cancel request with:", {
      id: selectedOrder.id,
      response: cancelReason,
    });

    try {
      setLoading(true);
      const response = await cancelBookOrder(selectedOrder.id, cancelReason);
      console.log("Cancel order response:", response);
      message.success(`Đã hủy đơn hàng #${selectedOrder.id}`);
      await fetchData();
      setCancelModalOpen(false);
      setCancelReason("");
    } catch (err) {
      console.error("Hủy đơn hàng thất bại:", err.response?.data || err);
      const errorMessage =
        err.response?.data?.message ||
        "Hủy đơn hàng thất bại. Vui lòng thử lại.";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customerName",
      key: "customerName",
      ellipsis: true,
      width: 150,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (address) =>
        address
          ? `${address?.street || "--"},${address?.ward || "--"} ,${
              address?.city || "--"
            }`
          : "--",
      width: 200,
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdDate",
      key: "createdDate",
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
            backgroundColor: color || "#ccc",
            border: "1px solid #ddd",
          }}
        />
      ),
      width: 60,
    },
    {
      title: "Trạng thái",
      dataIndex: "enumBookOrder",
      key: "enumBookOrder",
      render: (status) => (
        <Tag color={colorMap[status] || "default"}>
          {statusLabelMap[status] || status}
        </Tag>
      ),
      width: 130,
    },
    {
      title: "Designer",
      dataIndex: "designName",
      key: "designName",
      render: (name) => name || "--",
      width: 150,
    },
    {
      title: "Giá tổng",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => `${(price ?? 0).toFixed(2)}₫`,
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
            disabled={record.enumBookOrder === "CANCELED"}
            onClick={() => openCancelModal(record)}
            title="Hủy đơn"
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
        scroll={{ x: 1100 }}
        bordered
      />

      {/* Modal chi tiết */}
      <Modal
        title={`Chi tiết đơn hàng #${selectedOrder?.id || ""}`}
        open={detailModalOpen}
        onCancel={() => {
          setDetailModalOpen(false);
          setAddressDetails(null);
          setAddressLoading(false);
        }}
        footer={[
          <Button
            key="close"
            onClick={() => {
              setDetailModalOpen(false);
              setAddressDetails(null);
              setAddressLoading(false);
            }}
          >
            Đóng
          </Button>,
          selectedOrder?.enumBookOrder === "PAYMENT" &&
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
        width={800}
      >
        {selectedOrder ? (
          <Row gutter={32}>
            <Col span={14}>
              <Row gutter={[16, 12]}>
                <Col span={10}>
                  <Text strong>Tên khách hàng:</Text>
                </Col>
                <Col span={14}>{selectedOrder.customerName || "--"}</Col>

                <Col span={10}>
                  <Text strong>Số điện thoại:</Text>
                </Col>
                <Col span={14}>{selectedOrder.user?.phone || "--"}</Col>

                <Col span={10}>
                  <Text strong>Chi tiết địa chỉ:</Text>
                </Col>
                <Col span={14}>
                  {selectedOrder
                    ? `${selectedOrder.address?.street || ""}, ${
                        selectedOrder.address?.ward || ""
                      }, ${selectedOrder.address?.district || ""}`
                    : "--"}
                </Col>

                <Col span={10}>
                  <Text strong>Số lượng:</Text>
                </Col>
                <Col span={14}>{selectedOrder.quantity ?? "--"}</Col>

                <Col span={10}>
                  <Text strong>Size:</Text>
                </Col>
                <Col span={14}>{selectedOrder.size || "--"}</Col>

                <Col span={10}>
                  <Text strong>Ngày đặt:</Text>
                </Col>
                <Col span={14}>
                  {selectedOrder.createdDate
                    ? new Date(selectedOrder.createdDate).toLocaleDateString(
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
                      backgroundColor: selectedOrder.color || "#ccc",
                      border: "1px solid #ddd",
                    }}
                  />
                </Col>

                <Col span={10}>
                  <Text strong>Trạng thái:</Text>
                </Col>
                <Col span={14}>
                  <Tag
                    color={colorMap[selectedOrder.enumBookOrder] || "default"}
                  >
                    {statusLabelMap[selectedOrder.enumBookOrder] ||
                      selectedOrder.enumBookOrder}
                  </Tag>
                </Col>

                <Col span={10}>
                  <Text strong>Designer đã gán:</Text>
                </Col>
                <Col span={14}>{selectedOrder.designName || "--"}</Col>

                <Col span={10}>
                  <Text strong>Giá tổng:</Text>
                </Col>
                <Col span={14}>
                  {(selectedOrder.totalPrice ?? 0).toFixed(2)}₫
                </Col>

                <Col span={10}>
                  <Text strong>Mô tả:</Text>
                </Col>
                <Col span={14}>
                  <Paragraph style={{ margin: 0 }}>
                    {selectedOrder.description || "--"}
                  </Paragraph>
                </Col>

                <Col span={10}>
                  <Text strong>Hình ảnh:</Text>
                </Col>
                <Col span={14}>
                  {Array.isArray(selectedOrder.imageSkins) &&
                  selectedOrder.imageSkins.length > 0 ? (
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {selectedOrder.imageSkins.map((img) => (
                        <img
                          key={img.id}
                          src={img.image} // Nếu ảnh là base64 thì thêm prefix: `data:image/jpeg;base64,${img.image}`
                          alt="Skin"
                          style={{
                            width: 80,
                            height: 80,
                            objectFit: "cover",
                            border: "1px solid #ccc",
                            borderRadius: 4,
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <Text>Không có hình ảnh</Text>
                  )}
                </Col>

                {selectedOrder.enumBookOrder === "CANCELED" && (
                  <>
                    <Col span={10}>
                      <Text strong>Lý do hủy:</Text>
                    </Col>
                    <Col span={14}>
                      {selectedOrder.response || "Không có lý do"}
                    </Col>
                  </>
                )}
              </Row>
            </Col>

            <Col span={10}>
              <Title level={5}>Trạng thái đơn hàng</Title>
              <Steps
                current={statusOrder.indexOf(selectedOrder.enumBookOrder)}
                direction="vertical"
                size="small"
              >
                {statusOrder.map((status) => (
                  <Step
                    key={status}
                    title={statusLabelMap[status]}
                    status={
                      status === selectedOrder.enumBookOrder
                        ? "process"
                        : statusOrder.indexOf(status) <
                          statusOrder.indexOf(selectedOrder.enumBookOrder)
                        ? "finish"
                        : "wait"
                    }
                  />
                ))}
              </Steps>

              {selectedOrder.enumBookOrder === "PAYMENT" &&
                !selectedOrder.designerId && (
                  <>
                    <Title level={5} style={{ marginTop: 24 }}>
                      Gán Designer
                    </Title>
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Chọn Designer"
                      optionFilterProp="children"
                      value={selectedDesignerId}
                      onChange={(value) => setSelectedDesignerId(value)}
                      filterOption={(input, option) =>
                        (option?.children ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                    >
                      {designers.map((designer) => (
                        <Option key={designer.id} value={designer.id}>
                          {designer.fullName}
                        </Option>
                      ))}
                    </Select>
                  </>
                )}
            </Col>
          </Row>
        ) : (
          <Text>Không có dữ liệu đơn hàng</Text>
        )}
      </Modal>

      {/* Modal hủy đơn */}
      <Modal
        title={`Hủy đơn hàng #${selectedOrder?.id || ""}`}
        open={cancelModalOpen}
        onCancel={() => {
          setCancelModalOpen(false);
          setCancelReason("");
        }}
        onOk={handleCancelOrder}
        okText="Xác nhận hủy"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
        confirmLoading={loading}
      >
        <Text>Vui lòng nhập lý do hủy đơn hàng:</Text>
        <Input.TextArea
          rows={4}
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
          placeholder="Nhập lý do..."
          maxLength={200}
          showCount
        />
      </Modal>
    </div>
  );
}

export default BookOrderMng;
