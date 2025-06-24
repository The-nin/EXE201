import { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Tag,
  Space,
  Input,
  Select,
  DatePicker,
  Empty,
  Spin,
  Modal,
  message,
  Avatar,
  Divider,
  Descriptions,
  Steps,
} from "antd";
import {
  ShoppingOutlined,
  EyeOutlined,
  SearchOutlined,
  FilterOutlined,
  CalendarOutlined,
  DollarOutlined,
  TruckOutlined,
  ReloadOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  PrinterOutlined,
  ShareAltOutlined,
  HomeOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { getOrderDetail, getOrderHistory } from "../../service/user";

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

export default function OrderHistory() {
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(
    location.state?.orderInfo || null
  );
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [orderHistory, setOrderHistory] = useState([]);

  const getOrderHistoryList = async () => {
    try {
      const response = await getOrderHistory();
      console.log(response);

      const sortedLatestOrders = response.data.result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setOrderHistory(sortedLatestOrders);
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  const handleGetDetail = async () => {
    try {
      const response = await getOrderDetail();
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  useEffect(() => {
    getOrderHistoryList();
  }, []);

  // Mock data - replace with real API call
  const mockOrders = [
    {
      orderId: "ORD-2024-001234",
      orderDate: "2024-01-20 14:30:25",
      status: "delivered",
      statusText: "Đã giao hàng",
      paymentMethod: "COD",
      totalAmount: 897000,
      itemCount: 3,
      shippingAddress: {
        fullName: "Nguyen Van A",
        phone: "0909123456",
        address: "123 Nguyễn Huệ",
        ward: "P.Bến Nghé",
        district: "Q.1",
        city: "TP.HCM",
      },
      items: [
        {
          productName: "Áo thun custom design",
          quantity: 2,
          price: 299000,
          image: "/placeholder.svg?height=60&width=60",
          color: "Trắng",
          size: "M",
        },
        {
          productName: "Áo hoodie premium",
          quantity: 1,
          price: 599000,
          image: "/placeholder.svg?height=60&width=60",
          color: "Đen",
          size: "L",
        },
      ],
    },
    {
      orderId: "ORD-2024-001235",
      orderDate: "2024-01-18 10:15:30",
      status: "shipping",
      statusText: "Đang giao hàng",
      paymentMethod: "VNPAY",
      totalAmount: 1250000,
      itemCount: 2,
      shippingAddress: {
        fullName: "Tran Thi B",
        phone: "0918234567",
        address: "456 Lê Lợi",
        ward: "P.Bến Thành",
        district: "Q.1",
        city: "TP.HCM",
      },
      items: [
        {
          productName: "Áo polo custom",
          quantity: 1,
          price: 450000,
          image: "/placeholder.svg?height=60&width=60",
          color: "Xanh",
          size: "L",
        },
        {
          productName: "Áo khoác bomber",
          quantity: 1,
          price: 800000,
          image: "/placeholder.svg?height=60&width=60",
          color: "Đen",
          size: "XL",
        },
      ],
    },
    {
      orderId: "ORD-2024-001236",
      orderDate: "2024-01-15 16:45:12",
      status: "processing",
      statusText: "Đang xử lý",
      paymentMethod: "COD",
      totalAmount: 599000,
      itemCount: 1,
      shippingAddress: {
        fullName: "Le Van C",
        phone: "0987345678",
        address: "789 Trần Hưng Đạo",
        ward: "P.Cầu Kho",
        district: "Q.1",
        city: "TP.HCM",
      },
      items: [
        {
          productName: "Áo sweater premium",
          quantity: 1,
          price: 599000,
          image: "/placeholder.svg?height=60&width=60",
          color: "Xám",
          size: "M",
        },
      ],
    },
    {
      orderId: "ORD-2024-001237",
      orderDate: "2024-01-10 09:20:45",
      status: "cancelled",
      statusText: "Đã hủy",
      paymentMethod: "VNPAY",
      totalAmount: 750000,
      itemCount: 2,
      shippingAddress: {
        fullName: "Pham Thi D",
        phone: "0976456789",
        address: "321 Pasteur",
        ward: "P.Võ Thị Sáu",
        district: "Q.3",
        city: "TP.HCM",
      },
      items: [
        {
          productName: "Áo thun oversize",
          quantity: 2,
          price: 375000,
          image: "/placeholder.svg?height=60&width=60",
          color: "Trắng",
          size: "L",
        },
      ],
    },
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchText, statusFilter, dateRange]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setOrders(mockOrders);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching orders:", error);
      message.error("Không thể tải danh sách đơn hàng");
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];

    if (searchText) {
      filtered = filtered.filter(
        (order) =>
          order.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
          order.items.some((item) =>
            item.productName.toLowerCase().includes(searchText.toLowerCase())
          )
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    if (dateRange && dateRange.length === 2) {
      const [startDate, endDate] = dateRange;
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.orderDate);
        return orderDate >= startDate.toDate() && orderDate <= endDate.toDate();
      });
    }

    setFilteredOrders(filtered);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getStatusColor = (status) => {
    const statusColors = {
      pending: "orange",
      processing: "blue",
      shipping: "cyan",
      delivered: "green",
      cancelled: "red",
    };
    return statusColors[status] || "default";
  };

  const getStatusIcon = (status) => {
    const statusIcons = {
      pending: <ClockCircleOutlined />,
      processing: <ClockCircleOutlined />,
      shipping: <TruckOutlined />,
      delivered: <CheckCircleOutlined />,
      cancelled: <CloseCircleOutlined />,
    };
    return statusIcons[status] || <ClockCircleOutlined />;
  };

  const handleViewDetail = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handleReorder = (order) => {
    Modal.confirm({
      title: "Xác nhận đặt lại",
      content: `Bạn có muốn đặt lại đơn hàng ${order.orderId}?`,
      onOk: () => {
        message.success("Đã thêm sản phẩm vào giỏ hàng");
      },
    });
  };

  const handleCancelOrder = (order) => {
    if (order.status === "delivered" || order.status === "cancelled") {
      message.warning("Không thể hủy đơn hàng này");
      return;
    }

    Modal.confirm({
      title: "Xác nhận hủy đơn hàng",
      content: `Bạn có chắc chắn muốn hủy đơn hàng ${order.orderId}?`,
      okText: "Hủy đơn hàng",
      okType: "danger",
      onOk: () => {
        setOrders((prevOrders) =>
          prevOrders.map((o) =>
            o.orderId === order.orderId
              ? { ...o, status: "cancelled", statusText: "Đã hủy" }
              : o
          )
        );
        message.success("Đã hủy đơn hàng thành công");
      },
    });
  };

  const handlePrintOrder = () => {
    window.print();
  };

  const handleShareOrder = () => {
    alert("Chia sẻ đơn hàng: " + selectedOrder?.orderId);
  };

  const getCurrentStep = (status) => {
    const statusOrder = {
      pending: 0,
      processing: 1,
      shipping: 2,
      delivered: 3,
      cancelled: -1,
    };
    return statusOrder[status] !== undefined ? statusOrder[status] : 0;
  };

  const OrderCard = ({ order }) => (
    <Card
      style={{
        marginBottom: "16px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
      hoverable
    >
      <div style={{ marginBottom: "16px" }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Space>
              <Text strong style={{ color: "#1890ff", fontSize: "16px" }}>
                {order.orderId}
              </Text>
              <Tag
                color={getStatusColor(order.status)}
                icon={getStatusIcon(order.status)}
              >
                {order.statusText}
              </Tag>
            </Space>
          </Col>
          <Col>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              <CalendarOutlined style={{ marginRight: "4px" }} />
              {new Date(order.orderDate).toLocaleDateString("vi-VN")}
            </Text>
          </Col>
        </Row>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <Row gutter={[12, 12]}>
          {order.items.slice(0, 3).map((item, index) => (
            <Col key={index} xs={24} sm={12} md={8}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <Avatar
                  src={item.image || "/placeholder.svg"}
                  size={50}
                  shape="square"
                  style={{ borderRadius: "8px" }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Text
                    strong
                    style={{
                      display: "block",
                      fontSize: "14px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.productName}
                  </Text>
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    {item.color} | {item.size} | x{item.quantity}
                  </Text>
                  <Text strong style={{ color: "#ff4d4f", fontSize: "13px" }}>
                    {formatPrice(item.price)}
                  </Text>
                </div>
              </div>
            </Col>
          ))}
          {order.items.length > 3 && (
            <Col xs={24} sm={12} md={8}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "50px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                  border: "1px dashed #d9d9d9",
                }}
              >
                <Text type="secondary">
                  +{order.items.length - 3} sản phẩm khác
                </Text>
              </div>
            </Col>
          )}
        </Row>
      </div>

      <Divider style={{ margin: "16px 0" }} />

      <Row justify="space-between" align="middle">
        <Col>
          <Space>
            <Text type="secondary">
              <DollarOutlined style={{ marginRight: "4px" }} />
              {order.paymentMethod === "COD"
                ? "Thanh toán khi nhận hàng"
                : "Đã thanh toán online"}
            </Text>
          </Space>
        </Col>
        <Col>
          <Space>
            <Text strong style={{ fontSize: "16px", color: "#ff4d4f" }}>
              {formatPrice(order.totalAmount)}
            </Text>
          </Space>
        </Col>
      </Row>

      <div style={{ marginTop: "16px", textAlign: "right" }}>
        <Space>
          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(order)}
          >
            Chi tiết
          </Button>
          {order.status !== "cancelled" && (
            <Button
              size="small"
              type="primary"
              ghost
              onClick={() => handleReorder(order)}
            >
              Đặt lại
            </Button>
          )}
          {(order.status === "pending" || order.status === "processing") && (
            <Button
              size="small"
              danger
              ghost
              icon={<DeleteOutlined />}
              onClick={() => handleCancelOrder(order)}
            >
              Hủy đơn
            </Button>
          )}
        </Space>
      </div>
    </Card>
  );

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px", textAlign: "center" }}>
        <Title level={2} style={{ marginBottom: "8px" }}>
          <ShoppingOutlined /> Đơn hàng của tôi
        </Title>
        <Text type="secondary" style={{ fontSize: "16px" }}>
          Theo dõi và quản lý tất cả đơn hàng của bạn
        </Text>
      </div>

      <Card style={{ marginBottom: "24px", borderRadius: "12px" }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Tìm kiếm đơn hàng, sản phẩm..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
              size="large"
            />
          </Col>
          <Col xs={24} sm={6} md={4}>
            <Select
              placeholder="Trạng thái"
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: "100%" }}
              size="large"
              suffixIcon={<FilterOutlined />}
            >
              <Option value="all">Tất cả</Option>
              <Option value="pending">Chờ xác nhận</Option>
              <Option value="processing">Đang xử lý</Option>
              <Option value="shipping">Đang giao hàng</Option>
              <Option value="delivered">Đã giao hàng</Option>
              <Option value="cancelled">Đã hủy</Option>
            </Select>
          </Col>
          <Col xs={24} sm={6} md={6}>
            <RangePicker
              placeholder={["Từ ngày", "Đến ngày"]}
              value={dateRange}
              onChange={setDateRange}
              style={{ width: "100%" }}
              size="large"
            />
          </Col>
          <Col xs={24} sm={24} md={6}>
            <Space style={{ width: "100%", justifyContent: "space-between" }}>
              <Button
                icon={<ReloadOutlined />}
                onClick={fetchOrders}
                loading={loading}
                size="large"
              >
                Làm mới
              </Button>
              <Text type="secondary">{filteredOrders.length} đơn hàng</Text>
            </Space>
          </Col>
        </Row>
      </Card>

      {loading ? (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Spin size="large" />
          <div style={{ marginTop: "16px" }}>
            Đang tải danh sách đơn hàng...
          </div>
        </div>
      ) : filteredOrders.length === 0 ? (
        <Card
          style={{ textAlign: "center", padding: "50px", borderRadius: "12px" }}
        >
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <div>
                <Title level={4} style={{ color: "#999" }}>
                  Không tìm thấy đơn hàng nào
                </Title>
                <Text type="secondary">
                  Thử thay đổi bộ lọc hoặc tạo đơn hàng mới
                </Text>
              </div>
            }
          >
            <Button type="primary" icon={<ShoppingOutlined />} size="large">
              Mua sắm ngay
            </Button>
          </Empty>
        </Card>
      ) : (
        <div>
          {filteredOrders.map((order) => (
            <OrderCard key={order.orderId} order={order} />
          ))}
        </div>
      )}

      <Modal
        title={
          <Space>
            <ShoppingOutlined />
            Chi tiết đơn hàng {selectedOrder?.orderId}
          </Space>
        }
        open={showDetailModal}
        onCancel={() => setShowDetailModal(false)}
        footer={[
          <Button key="close" onClick={() => setShowDetailModal(false)}>
            Đóng
          </Button>,
          selectedOrder?.status !== "cancelled" && (
            <Button
              key="reorder"
              type="primary"
              onClick={() => handleReorder(selectedOrder)}
            >
              Đặt lại
            </Button>
          ),
        ]}
        width={1000}
      >
        {selectedOrder && (
          <div>
            <Row gutter={[24, 24]}>
              {/* Order Details */}
              <Col xs={24} lg={14}>
                {/* Order Info */}
                <Card
                  title="Thông tin đơn hàng"
                  style={{ marginBottom: "16px" }}
                >
                  <Descriptions column={2} size="small">
                    <Descriptions.Item label="Mã đơn hàng" span={2}>
                      <Text strong style={{ color: "#1890ff" }}>
                        {selectedOrder?.orderId}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày đặt hàng">
                      <CalendarOutlined style={{ marginRight: "4px" }} />
                      {new Date(selectedOrder?.orderDate).toLocaleDateString(
                        "vi-VN"
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Trạng thái">
                      <Tag color={getStatusColor(selectedOrder.status)}>
                        {selectedOrder.statusText}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Phương thức thanh toán">
                      <DollarOutlined style={{ marginRight: "4px" }} />
                      {selectedOrder?.paymentMethod === "COD"
                        ? "Thanh toán khi nhận hàng"
                        : "VNPAY"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Dự kiến giao hàng">
                      <TruckOutlined style={{ marginRight: "4px" }} />
                      {selectedOrder.status === "delivered"
                        ? "Đã giao"
                        : "2-3 ngày làm việc"}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                {/* Order Items */}
                <Card title="Sản phẩm đã đặt">
                  <Space direction="vertical" style={{ width: "100%" }}>
                    {selectedOrder?.items.map((item, index) => (
                      <div key={index}>
                        <Row align="middle" gutter={16}>
                          <Col flex="60px">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.productName}
                              style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "cover",
                                borderRadius: "6px",
                                border: "1px solid #f0f0f0",
                              }}
                            />
                          </Col>
                          <Col flex="auto">
                            <div>
                              <Text strong>{item.productName}</Text>
                              <br />
                              <Text
                                type="secondary"
                                style={{ fontSize: "12px" }}
                              >
                                Màu: {item.color} | Size: {item.size}
                              </Text>
                            </div>
                          </Col>
                          <Col>
                            <Text>x{item.quantity}</Text>
                          </Col>
                          <Col>
                            <Text strong style={{ color: "#ff4d4f" }}>
                              {formatPrice(item.price)}
                            </Text>
                          </Col>
                        </Row>
                        {index < selectedOrder.items.length - 1 && (
                          <Divider style={{ margin: "12px 0" }} />
                        )}
                      </div>
                    ))}
                  </Space>
                </Card>

                {/* Shipping Address */}
                <Card title="Địa chỉ giao hàng" style={{ marginTop: "16px" }}>
                  <Space direction="vertical" size="small">
                    <div>
                      <HomeOutlined
                        style={{ marginRight: "8px", color: "#1890ff" }}
                      />
                      <Text strong>
                        {selectedOrder?.shippingAddress.fullName}
                      </Text>
                    </div>
                    <div>
                      <PhoneOutlined
                        style={{ marginRight: "8px", color: "#1890ff" }}
                      />
                      <Text>{selectedOrder?.shippingAddress.phone}</Text>
                    </div>
                    <div>
                      <MailOutlined
                        style={{ marginRight: "8px", color: "#1890ff" }}
                      />
                      <Text>
                        {selectedOrder?.shippingAddress.address},{" "}
                        {selectedOrder?.shippingAddress.ward},{" "}
                        {selectedOrder?.shippingAddress.district},{" "}
                        {selectedOrder?.shippingAddress.city}
                      </Text>
                    </div>
                  </Space>
                </Card>
              </Col>

              {/* Order Summary & Timeline */}
              <Col xs={24} lg={10}>
                {/* Order Summary */}
                <Card title="Tóm tắt đơn hàng" style={{ marginBottom: "16px" }}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text>Tạm tính:</Text>
                      <Text>
                        {formatPrice((selectedOrder?.totalAmount || 0) - 30000)}
                      </Text>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text>Phí vận chuyển:</Text>
                      <Text>{formatPrice(30000)}</Text>
                    </div>
                    <Divider style={{ margin: "8px 0" }} />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text strong style={{ fontSize: "16px" }}>
                        Tổng cộng:
                      </Text>
                      <Text
                        strong
                        style={{ fontSize: "18px", color: "#ff4d4f" }}
                      >
                        {formatPrice(selectedOrder?.totalAmount || 0)}
                      </Text>
                    </div>
                  </Space>

                  <Divider />

                  <Space style={{ width: "100%" }}>
                    <Button
                      icon={<PrinterOutlined />}
                      onClick={handlePrintOrder}
                      block
                    >
                      In đơn hàng
                    </Button>
                    <Button
                      icon={<ShareAltOutlined />}
                      onClick={handleShareOrder}
                      block
                    >
                      Chia sẻ
                    </Button>
                  </Space>
                </Card>

                {/* Order Timeline */}
                <Card title="Tiến trình đơn hàng">
                  <Steps
                    direction="vertical"
                    size="small"
                    current={getCurrentStep(selectedOrder.status)}
                  >
                    <Steps.Step
                      status={
                        selectedOrder.status === "delivered" ? "finish" : "wait"
                      }
                      title="Đặt hàng thành công"
                      description="Đơn hàng đã được tiếp nhận"
                      icon={<CheckCircleOutlined />}
                    />
                    <Steps.Step
                      status={
                        selectedOrder.status === "processing" ||
                        selectedOrder.status === "shipping" ||
                        selectedOrder.status === "delivered"
                          ? "finish"
                          : "wait"
                      }
                      title="Đang xử lý"
                      description="Đang chuẩn bị hàng hóa"
                      icon={<ShoppingOutlined />}
                    />
                    <Steps.Step
                      status={
                        selectedOrder.status === "shipping" ||
                        selectedOrder.status === "delivered"
                          ? "finish"
                          : "wait"
                      }
                      title="Đang giao hàng"
                      description="Đơn hàng đang được vận chuyển"
                      icon={<TruckOutlined />}
                    />
                    <Steps.Step
                      status={
                        selectedOrder.status === "delivered" ? "finish" : "wait"
                      }
                      title="Đã giao hàng"
                      description="Giao hàng thành công"
                      icon={<HomeOutlined />}
                    />
                  </Steps>
                </Card>

                {/* Contact Info */}
                <Card title="Hỗ trợ khách hàng" style={{ marginTop: "16px" }}>
                  <Space direction="vertical" size="small">
                    <Text>
                      <PhoneOutlined
                        style={{ marginRight: "8px", color: "#1890ff" }}
                      />
                      Hotline: 1900-1234
                    </Text>
                    <Text>
                      <MailOutlined
                        style={{ marginRight: "8px", color: "#1890ff" }}
                      />
                      Email: support@example.com
                    </Text>
                    <Divider style={{ margin: "8px 0" }} />
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      Thời gian hỗ trợ: 8:00 - 22:00 (Thứ 2 - Chủ nhật)
                    </Text>
                  </Space>
                </Card>
              </Col>
            </Row>

            {/* Additional Info */}
            <Card style={{ marginTop: "24px" }}>
              <Title level={5}>Lưu ý quan trọng:</Title>
              <ul style={{ paddingLeft: "20px", margin: 0 }}>
                <li>Đơn hàng sẽ được giao trong vòng 2-3 ngày làm việc</li>
                <li>Vui lòng kiểm tra kỹ sản phẩm khi nhận hàng</li>
                <li>Liên hệ hotline nếu có bất kỳ thắc mắc nào về đơn hàng</li>
                <li>
                  Chúng tôi hỗ trợ đổi trả trong vòng 7 ngày kể từ ngày nhận
                  hàng
                </li>
              </ul>
            </Card>
          </div>
        )}
      </Modal>
    </div>
  );
}
