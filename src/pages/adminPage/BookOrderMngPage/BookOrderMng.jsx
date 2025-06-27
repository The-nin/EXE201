import React, { useEffect, useState, useCallback } from "react";
import {
  Upload,
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
  changeStatus,
  deliverySuccess,
  designUploadSuccess,
  getImageDesign,
} from "../../../service/admin";
import "./styles/BookOrderMng.scss";
import { toast } from "react-toastify";
import { uploadToCloudinary } from "../../../service/cloundinary/index";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Step } = Steps;

const statusOrder = [
  "PENDING",
  "PAYMENT",
  "ASSIGNED_TASK",
  "CUSTOMER_RECEIVED",
  "CUSTOMER_ACCEPTED",
  "CUSTOMER_REJECTED",
  "DELIVERY",
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
  CUSTOMER_RECEIVED: "Khách đã nhận",
  CUSTOMER_ACCEPTED: "Khách chấp nhận",
  CUSTOMER_REJECTED: "Khách từ chối",
  DELIVERY: "Đang giao",
  FINISHED: "Hoàn tất",
  CANCELED: "Đã hủy",
};

function BookOrderMng() {
  const [orders, setOrders] = useState([]);
  const [designers, setDesigners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [imageDesignLoading, setImageDesignLoading] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedDesignerId, setSelectedDesignerId] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [addressDetails, setAddressDetails] = useState(null);
  const [addressLoading, setAddressLoading] = useState(false);
  const [deliveryFile, setDeliveryFile] = useState(null);
  const [imageDesign, setDesignImages] = useState([]);
  const [listImageDesign, setListImageDesign] = useState([]);
  const [formData, setFormData] = useState({
    designerId: 0,
    designName: "",
    imageDelivery: "",
    imageDesign: [],
    response: "",
  });

  // Fetch data (orders and designers)
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [ordersRes, designersRes] = await Promise.all([
        getAllBookOrders(),
        getAllDesigner(),
      ]);

      const ordersArr = Array.isArray(ordersRes) ? ordersRes : [];
      ordersArr.sort(
        (a, b) =>
          statusOrder.indexOf(a.enumBookOrder) -
          statusOrder.indexOf(b.enumBookOrder)
      );

      setOrders(ordersArr);
      setDesigners(Array.isArray(designersRes) ? designersRes : []);
    } catch (err) {
      message.error("Không thể tải dữ liệu");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch design images for the selected order
  useEffect(() => {
    const fetchImageDesign = async () => {
      if (!selectedOrder?.id) return;
      try {
        setImageDesignLoading(true);
        const data = await getImageDesign(selectedOrder.id);
        setListImageDesign(Array.isArray(data) ? data : []);
        setListImageDesign(data);

      } catch (err) {
        message.error("Không thể lấy danh sách thiết kế.");
      } finally {
        setImageDesignLoading(false);
      }
    };
    fetchImageDesign();
  }, [selectedOrder]);

  // Debug listImageDesign updates
  useEffect(() => {
    if (listImageDesign.length > 0) {
      console.log("Updated listImageDesign:", listImageDesign);
    }
  }, [listImageDesign]);

  // Fetch address details
  const fetchAddressDetails = useCallback(async (addressId) => {
    try {
      setAddressLoading(true);
      const address = await getAddressId(addressId);
      setAddressDetails(address || null);
    } catch {
      message.error("Không thể tải thông tin địa chỉ");
      setAddressDetails(null);
    } finally {
      setAddressLoading(false);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Open detail modal
  const openDetailModal = useCallback(
    (order) => {
      setSelectedOrder(order);
      setSelectedDesignerId(order.designerId || "");
      setDetailModalOpen(true);
      const addrId = order.addressId || order.address_id;
      if (addrId) {
        fetchAddressDetails(addrId);
      } else {
        setAddressDetails(null);
        setAddressLoading(false);
        message.warning("Đơn hàng không có thông tin địa chỉ");
      }
    },
    [fetchAddressDetails]
  );

  // Open cancel modal
  const openCancelModal = useCallback((order) => {
    setSelectedOrder(order);
    setCancelReason("");
    setCancelModalOpen(true);
  }, []);

  // Handle design upload
  const handleDesignUpload = async () => {
    if (!imageDesign.length) {
      message.error("Vui lòng chọn ít nhất một hình ảnh thiết kế.");
      return;
    }

    try {
      setUploadLoading(true);

      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      const invalidFiles = imageDesign.filter(
        (file) => !validTypes.includes(file.type)
      );
      if (invalidFiles.length > 0) {
        message.error("Chỉ hỗ trợ ảnh JPG, PNG, WEBP.");
        setUploadLoading(false);
        return;
      }

      const uploadedUrls = await Promise.all(
        imageDesign.map(async (item) => {
          const file = item.originFileObj;
          const url = await uploadToCloudinary(file);
          return url ? { image: url } : null;
        })
      );

      const filtered = uploadedUrls.filter(Boolean);
      if (!filtered.length) {
        message.error("Tải ảnh thất bại, vui lòng thử lại.");
        return;
      }

      const payload = {
        imageDesign: filtered,
      };
      await designUploadSuccess(selectedOrder.id, payload);
      message.success("Đã cập nhật thiết kế và chuyển đơn sang giao hàng.");
      await fetchData();
      setDetailModalOpen(false);
      setDesignImages([]);
    } catch (err) {
      console.error("Upload error:", err);
      message.error("Cập nhật thiết kế thất bại.");
    } finally {
      setUploadLoading(false);
    }
  };

  // Handle delivery file upload
  const handleDelivery = useCallback(async () => {
    if (!deliveryFile) {
      message.error("Vui lòng chọn file giao hàng.");
      return;
    }

    try {
      setUploadLoading(true);

      const validTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!validTypes.includes(deliveryFile.type)) {
        message.error("Chỉ hỗ trợ ảnh JPG, PNG hoặc file PDF.");
        setUploadLoading(false);
        return;
      }

      const deliveryUrl = await uploadToCloudinary(deliveryFile);
      if (!deliveryUrl) {
        throw new Error("Không lấy được đường dẫn từ Cloudinary.");
      }

      const payload = {
        imageDelivery: deliveryUrl,
      };

      await deliverySuccess(selectedOrder.id, payload);
      message.success("Đã cập nhật file giao hàng và hoàn tất đơn.");
      await fetchData();
      setDetailModalOpen(false);
      toast.success(`Đã giao hoàn thành đơn ${selectedOrder.id}`);
      setDeliveryFile(null);
    } catch (err) {
      console.error("Lỗi khi cập nhật file:", err);
      message.error("Cập nhật file giao hàng thất bại. Vui lòng thử lại.");
      toast.error("Cập nhật bị lỗi");
    } finally {
      setUploadLoading(false);
    }
  }, [deliveryFile, selectedOrder?.id, fetchData]);

  // Handle designer assignment
  const handleAssignDesigner = useCallback(async () => {
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
      toast.success(`Đã giao task cho ${designerInfo.fullName}`);
    } catch {
      message.error("Gán Designer thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }, [selectedDesignerId, designers, selectedOrder, fetchData]);

  // Handle order cancellation
  const handleCancelOrder = useCallback(async () => {
    if (!cancelReason.trim()) {
      message.error("Vui lòng nhập lý do hủy đơn.");
      return;
    }

    try {
      setLoading(true);
      await cancelBookOrder(selectedOrder.id, cancelReason);
      message.success(`Đã hủy đơn hàng #${selectedOrder.id}`);
      await fetchData();
      setCancelModalOpen(false);
      setCancelReason("");
    } catch {
      message.error("Hủy đơn hàng thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }, [cancelReason, selectedOrder, fetchData]);

  // Table columns
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
          ? `${address.street || "--"}, ${address.ward || "--"}, ${
              address.city || "--"
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

      {/* Detail Modal */}
      <Modal
        title={`Chi tiết đơn hàng #${selectedOrder?.id || ""}`}
        open={detailModalOpen}
        onCancel={() => {
          setDetailModalOpen(false);
          setAddressDetails(null);
          setAddressLoading(false);
          setDesignImages([]);
          setDeliveryFile(null);
          setListImageDesign([]);
        }}
        footer={[
          <Button
            key="close"
            onClick={() => {
              setDetailModalOpen(false);
              setAddressDetails(null);
              setAddressLoading(false);
              setDesignImages([]);
              setDeliveryFile(null);
              setListImageDesign([]);
            }}
          >
            Đóng
          </Button>,
          selectedOrder?.enumBookOrder === "PAYMENT" &&
            !selectedOrder?.designerId && (
              <Button
                key="assign"
                type="primary"
                onCancel={() => {
                  setDetailModalOpen(false);
                  setAddressDetails(null);
                  setAddressLoading(false);
                  setDesignImages([]);
                  setDeliveryFile(null);
                  setListImageDesign([]);
                }}
                onClick={handleAssignDesigner}
                disabled={!selectedDesignerId}
                loading={loading}
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
                <Col span={14}>{selectedOrder?.user?.phone || "--"}</Col>

                <Col span={10}>
                  <Text strong>Chi tiết địa chỉ:</Text>
                </Col>
                <Col span={14}>
                  {addressLoading ? (
                    <Text>Loading...</Text>
                  ) : addressDetails ? (
                    `${addressDetails.street || "--"}, ${
                      addressDetails.ward || "--"
                    }, ${addressDetails.district || "--"}`
                  ) : (
                    "--"
                  )}
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
                  <Text strong>Hình ảnh KH:</Text>
                </Col>
                <Col span={14}>
                  {Array.isArray(selectedOrder.imageSkins) &&
                  selectedOrder.imageSkins.length > 0 ? (
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {selectedOrder.imageSkins.map((img) => (
                        <img
                          key={img.id}
                          src={
                            img.image.startsWith("data:image")
                              ? img.image
                              : `data:image/jpeg;base64,${img.image}`
                          }
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

                <Col span={10}>
                  <Text strong>Hình ảnh áo:</Text>
                </Col>
                <Col span={14}>
                  {imageDesignLoading ? (
                    <Text>Loading...</Text>
                  ) : Array.isArray(listImageDesign) &&
                    listImageDesign.length > 0 ? (
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {listImageDesign.map((img) => (
                        <img
                          key={img.id}
                          src={
                            img.image.startsWith("data:image")
                              ? img.image
                              : `data:image/jpeg;base64,${img.image}`
                          }
                          alt="Design"
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

                {selectedOrder.enumBookOrder === "ASSIGNED_TASK" && (
                  <>
                    <Title level={5} style={{ marginTop: 24 }}>
                      Cập nhật thiết kế hoàn chỉnh
                    </Title>
                    <Upload
                      multiple
                      listType="picture-card"
                      beforeUpload={() => false}
                      onChange={({ fileList }) => setDesignImages(fileList)}
                      fileList={imageDesign}
                      accept=".jpg,.png,.jpeg"
                    >
                      {imageDesign.length >= 8 ? null : "+ Upload"}
                    </Upload>
                    <Button
                      type="primary"
                      style={{ marginTop: 12 }}
                      onClick={handleDesignUpload}
                      loading={uploadLoading}
                      disabled={!imageDesign.length}
                    >
                      Cập nhật thiết kế
                    </Button>
                  </>
                )}

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

              {selectedOrder.enumBookOrder === "DELIVERY" && (
                <>
                  <Title level={5} style={{ marginTop: 24 }}>
                    Cập nhật file giao hàng
                  </Title>
                  <Input
                    type="file"
                    accept=".zip,.rar,.pdf,.jpg,.png"
                    onChange={(e) => setDeliveryFile(e.target.files[0])}
                  />
                  <Button
                    type="primary"
                    style={{ marginTop: 12 }}
                    onClick={handleDelivery}
                    loading={uploadLoading}
                    disabled={!deliveryFile}
                  >
                    Cập nhật và hoàn tất đơn
                  </Button>
                </>
              )}
            </Col>
          </Row>
        ) : (
          <Text>Không có dữ liệu đơn hàng</Text>
        )}
      </Modal>

      {/* Cancel Modal */}
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