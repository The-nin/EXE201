"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Table,
  Badge,
  Modal,
  Form,
} from "react-bootstrap";
import {
  FiShoppingCart,
  FiTrash2,
  FiPlus,
  FiMinus,
  FiArrowLeft,
  FiCreditCard,
  FiMapPin,
  FiTruck,
  FiUser,
  FiPhone,
} from "react-icons/fi";

export default function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  // Shipping address state
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    ward: "",
    district: "",
    city: "",
    note: "",
  });

  // Mock data cho demo
  useEffect(() => {
    const mockCartItems = [
      {
        id: "cart1",
        productId: "1",
        productName: "Áo Thun Cotton Premium",
        price: 299000,
        quantity: 2,
        size: "L",
        sizeId: "3",
        color: "Xanh Navy",
        image: "https://via.placeholder.com/150x150/007bff/ffffff?text=Ao+1",
        inStock: true,
        maxQuantity: 10,
      },
      {
        id: "cart2",
        productId: "2",
        productName: "Áo Polo Nam Cao Cấp",
        price: 450000,
        quantity: 1,
        size: "M",
        sizeId: "2",
        color: "Trắng",
        image: "https://via.placeholder.com/150x150/28a745/ffffff?text=Ao+2",
        inStock: true,
        maxQuantity: 5,
      },
      {
        id: "cart3",
        productId: "3",
        productName: "Áo Sơ Mi Công Sở",
        price: 380000,
        quantity: 1,
        size: "XL",
        sizeId: "4",
        color: "Xanh Đậm",
        image: "https://via.placeholder.com/150x150/dc3545/ffffff?text=Ao+3",
        inStock: false,
        maxQuantity: 0,
      },
    ];
    setCartItems(mockCartItems);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleQuantityChange = (itemId, type) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          let newQuantity = item.quantity;

          if (type === "increase" && item.quantity < item.maxQuantity) {
            newQuantity = item.quantity + 1;
          } else if (type === "decrease" && item.quantity > 1) {
            newQuantity = item.quantity - 1;
          }

          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (item) => {
    setItemToRemove(item);
    setShowRemoveModal(true);
  };

  const confirmRemoveItem = () => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemToRemove.id)
    );
    setShowRemoveModal(false);
    setItemToRemove(null);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleAddressChange = (field, value) => {
    setShippingAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    if (subtotal >= 500000) return 0; // Free shipping for orders over 500k
    return 30000;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = calculateShipping();
    return subtotal + shipping;
  };

  const validateAddress = () => {
    const required = [
      "fullName",
      "phone",
      "address",
      "ward",
      "district",
      "city",
    ];
    return required.every((field) => shippingAddress[field].trim() !== "");
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }

    const outOfStockItems = cartItems.filter((item) => !item.inStock);
    if (outOfStockItems.length > 0) {
      alert("Có sản phẩm hết hàng trong giỏ hàng. Vui lòng xóa hoặc thay thế!");
      return;
    }

    if (!validateAddress()) {
      alert("Vui lòng điền đầy đủ thông tin địa chỉ nhận hàng!");
      return;
    }

    // Navigate to checkout page
    navigate("/checkout", {
      state: {
        cartItems,
        shippingAddress,
        subtotal: calculateSubtotal(),
        shipping: calculateShipping(),
        total: calculateTotal(),
      },
    });
  };

  if (loading) {
    return (
      <Container className="py-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <Button
                variant="outline-secondary"
                className="me-3"
                onClick={() => navigate("/product")}
              >
                <FiArrowLeft className="me-2" />
                Tiếp tục mua sắm
              </Button>
              <h2 className="mb-0">
                <FiShoppingCart className="me-2" />
                Giỏ hàng ({cartItems.length})
              </h2>
            </div>
            {cartItems.length > 0 && (
              <Button variant="outline-danger" onClick={handleClearCart}>
                <FiTrash2 className="me-2" />
                Xóa tất cả
              </Button>
            )}
          </div>
        </Col>
      </Row>

      {cartItems.length === 0 ? (
        /* Empty Cart */
        <Row>
          <Col>
            <Card className="text-center py-5">
              <Card.Body>
                <FiShoppingCart size={64} className="text-muted mb-3" />
                <h4>Giỏ hàng trống</h4>
                <p className="text-muted mb-4">
                  Bạn chưa có sản phẩm nào trong giỏ hàng
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate("/products")}
                >
                  Khám phá sản phẩm
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row>
          {/* Cart Items */}
          <Col lg={8}>
            <Card>
              <Card.Header>
                <h5 className="mb-0">Sản phẩm trong giỏ hàng</h5>
              </Card.Header>
              <Card.Body className="p-0">
                <Table responsive className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Sản phẩm</th>
                      <th>Giá</th>
                      <th>Số lượng</th>
                      <th>Tổng</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr
                        key={item.id}
                        className={!item.inStock ? "table-warning" : ""}
                      >
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.productName}
                              className="rounded me-3"
                              style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover",
                              }}
                            />
                            <div>
                              <h6 className="mb-1">{item.productName}</h6>
                              <div className="text-muted small">
                                <div>Màu: {item.color}</div>
                                <div>Size: {item.size}</div>
                                {!item.inStock && (
                                  <Badge bg="warning" text="dark">
                                    Hết hàng
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle">
                          <strong>{formatPrice(item.price)}</strong>
                        </td>
                        <td className="align-middle">
                          <div className="d-flex align-items-center gap-2">
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() =>
                                handleQuantityChange(item.id, "decrease")
                              }
                              disabled={item.quantity <= 1 || !item.inStock}
                            >
                              <FiMinus />
                            </Button>
                            <span
                              className="mx-2"
                              style={{ minWidth: "30px", textAlign: "center" }}
                            >
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() =>
                                handleQuantityChange(item.id, "increase")
                              }
                              disabled={
                                item.quantity >= item.maxQuantity ||
                                !item.inStock
                              }
                            >
                              <FiPlus />
                            </Button>
                          </div>
                          {item.quantity >= item.maxQuantity && (
                            <small className="text-muted d-block mt-1">
                              Tối đa: {item.maxQuantity}
                            </small>
                          )}
                        </td>
                        <td className="align-middle">
                          <strong className="text-danger">
                            {formatPrice(item.price * item.quantity)}
                          </strong>
                        </td>
                        <td className="align-middle">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleRemoveItem(item)}
                          >
                            <FiTrash2 />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            {/* Shipping Address Section */}
            <Card className="mt-4">
              <Card.Header>
                <h6 className="mb-0">
                  <FiMapPin className="me-2" />
                  Địa chỉ nhận hàng
                </h6>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <FiUser className="me-1" />
                        Họ và tên <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập họ và tên"
                        value={shippingAddress.fullName}
                        onChange={(e) =>
                          handleAddressChange("fullName", e.target.value)
                        }
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <FiPhone className="me-1" />
                        Số điện thoại <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Nhập số điện thoại"
                        value={shippingAddress.phone}
                        onChange={(e) =>
                          handleAddressChange("phone", e.target.value)
                        }
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Email (tùy chọn)</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Nhập email để nhận thông báo đơn hàng"
                    value={shippingAddress.email}
                    onChange={(e) =>
                      handleAddressChange("email", e.target.value)
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    Địa chỉ cụ thể <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Số nhà, tên đường"
                    value={shippingAddress.address}
                    onChange={(e) =>
                      handleAddressChange("address", e.target.value)
                    }
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Phường/Xã <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Select
                        value={shippingAddress.ward}
                        onChange={(e) =>
                          handleAddressChange("ward", e.target.value)
                        }
                        required
                      >
                        <option value="">Chọn phường/xã</option>
                        <option value="Phường 1">Phường 1</option>
                        <option value="Phường 2">Phường 2</option>
                        <option value="Phường 3">Phường 3</option>
                        <option value="Phường Bến Nghé">Phường Bến Nghé</option>
                        <option value="Phường Bến Thành">
                          Phường Bến Thành
                        </option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Quận/Huyện <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Select
                        value={shippingAddress.district}
                        onChange={(e) =>
                          handleAddressChange("district", e.target.value)
                        }
                        required
                      >
                        <option value="">Chọn quận/huyện</option>
                        <option value="Quận 1">Quận 1</option>
                        <option value="Quận 2">Quận 2</option>
                        <option value="Quận 3">Quận 3</option>
                        <option value="Quận Bình Thạnh">Quận Bình Thạnh</option>
                        <option value="Quận Tân Bình">Quận Tân Bình</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Tỉnh/Thành phố <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Select
                        value={shippingAddress.city}
                        onChange={(e) =>
                          handleAddressChange("city", e.target.value)
                        }
                        required
                      >
                        <option value="">Chọn tỉnh/thành</option>
                        <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                        <option value="Hà Nội">Hà Nội</option>
                        <option value="Đà Nẵng">Đà Nẵng</option>
                        <option value="Cần Thơ">Cần Thơ</option>
                        <option value="Hải Phòng">Hải Phòng</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-0">
                  <Form.Label>Ghi chú (tùy chọn)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Ghi chú thêm cho đơn hàng (thời gian giao hàng, yêu cầu đặc biệt...)"
                    value={shippingAddress.note}
                    onChange={(e) =>
                      handleAddressChange("note", e.target.value)
                    }
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          {/* Order Summary */}
          <Col lg={4}>
            <Card className="sticky-top" style={{ top: "20px" }}>
              <Card.Header>
                <h5 className="mb-0">Tóm tắt đơn hàng</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tạm tính:</span>
                  <span>{formatPrice(calculateSubtotal())}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>
                    <FiTruck className="me-1" />
                    Phí vận chuyển:
                  </span>
                  <span>
                    {calculateShipping() === 0 ? (
                      <span className="text-success">Miễn phí</span>
                    ) : (
                      formatPrice(calculateShipping())
                    )}
                  </span>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-3">
                  <strong>Tổng cộng:</strong>
                  <strong className="text-danger fs-5">
                    {formatPrice(calculateTotal())}
                  </strong>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-100 mb-3"
                  onClick={handleCheckout}
                  disabled={!validateAddress()}
                >
                  <FiCreditCard className="me-2" />
                  Đặt hàng
                </Button>

                <div className="text-center">
                  <small className="text-muted">
                    <FiTruck className="me-1" />
                    Miễn phí vận chuyển cho đơn hàng từ {formatPrice(500000)}
                  </small>
                </div>

                {/* Address Summary */}
                {validateAddress() && (
                  <div className="mt-3 p-3 bg-light rounded">
                    <h6 className="mb-2">
                      <FiMapPin className="me-1" />
                      Giao đến:
                    </h6>
                    <div className="small">
                      <div className="fw-bold">{shippingAddress.fullName}</div>
                      <div>{shippingAddress.phone}</div>
                      <div>
                        {shippingAddress.address}, {shippingAddress.ward},{" "}
                        {shippingAddress.district}, {shippingAddress.city}
                      </div>
                      {shippingAddress.note && (
                        <div className="text-muted mt-1">
                          <em>Ghi chú: {shippingAddress.note}</em>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>

            {/* Shipping Info */}
            <Card className="mt-3">
              <Card.Body className="p-3">
                <h6 className="mb-2">
                  <FiTruck className="me-2" />
                  Thông tin vận chuyển
                </h6>
                <ul className="list-unstyled mb-0 small text-muted">
                  <li className="mb-1">• Giao hàng trong 2-3 ngày làm việc</li>
                  <li className="mb-1">
                    • Miễn phí vận chuyển cho đơn từ 500.000đ
                  </li>
                  <li className="mb-1">• Hỗ trợ đổi trả trong 7 ngày</li>
                  <li>• Thanh toán khi nhận hàng</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Remove Item Confirmation Modal */}
      <Modal show={showRemoveModal} onHide={() => setShowRemoveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {itemToRemove && (
            <div>
              <p>Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?</p>
              <div className="d-flex align-items-center">
                <img
                  src={itemToRemove.image || "/placeholder.svg"}
                  alt={itemToRemove.productName}
                  className="rounded me-3"
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                />
                <div>
                  <h6 className="mb-1">{itemToRemove.productName}</h6>
                  <div className="text-muted small">
                    Size: {itemToRemove.size} | Màu: {itemToRemove.color}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRemoveModal(false)}>
            Hủy
          </Button>
          <Button variant="danger" onClick={confirmRemoveItem}>
            <FiTrash2 className="me-2" />
            Xóa sản phẩm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
