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
  FiPlusCircle,
} from "react-icons/fi";
import {
  createOrder,
  deleteCart,
  getCart,
  updateCart,
} from "../../service/user";
import { getAddressByUser } from "../../service/admin";
import { toast, ToastContainer } from "react-toastify";
import { instance } from "../../service/instance";

export default function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [addressList, setAddressList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    district: "",
    ward: "",
    street: "",
    addressLine: "",
    isDefault: false,
  });

  const [shippingAddress, setShippingAddress] = useState({
    addressId: "",
    fullName: "",
    phone: "",
    addressLine: "",

    ward: "",
    district: "",
    city: "",
    paymentMethod: "",
  });

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await getCart();
      setCart(response);
      setCartItems(response.items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAddress = async () => {
    setLoading(true);
    try {
      const addressRes = await getAddressByUser();
      let addressData = [];
      if (Array.isArray(addressRes)) addressData = addressRes;
      else if (addressRes?.result && Array.isArray(addressRes.result))
        addressData = addressRes.result;
      else if (addressRes?.data && Array.isArray(addressRes.data))
        addressData = addressRes.data;

      setAddressList(addressData);

      const defaultAddress = addressData.find((addr) => addr.isDefault);
      if (defaultAddress) {
        setShippingAddress({
          addressId: defaultAddress.id,
          fullName: defaultAddress.name,
          phone: defaultAddress.phone,
          addressLine: defaultAddress.addressLine,
          ward: defaultAddress.ward,
          district: defaultAddress.district,
          city: defaultAddress.city,
          paymentMethod: "",
        });
      }
    } catch (error) {
      console.error("Lỗi khi tải địa chỉ:", error);
      setAddressList([]);
      toast.error("Không thể tải danh sách địa chỉ.");
    } finally {
      setLoading(false);
    }
  };

  const createNewAddress = async () => {
    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      const response = await instance.post("/api/addresses", newAddress, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      console.log("Response data:", data); // Kiểm tra response

      if (data.code === 201 && data.message === "Thêm mới địa chỉ thành công") {
        toast.success("Thêm địa chỉ thành công!");
        // Làm mới danh sách địa chỉ từ server
        await fetchAddress();
      } else {
        toast.error(
          "Thêm địa chỉ thất bại: " +
            (data.message || "Không nhận được phản hồi hợp lệ")
        );
      }
    } catch (error) {
      console.error(
        "Lỗi khi tạo địa chỉ:",
        error.response ? error.response.data : error.message
      );
      if (error.response && error.response.status === 404) {
        toast.error(
          "Endpoint /api/addresses không tồn tại. Vui lòng kiểm tra server hoặc URL."
        );
      } else {
        toast.error(
          "Có lỗi xảy ra khi tạo địa chỉ: " +
            (error.response?.data?.message || error.message)
        );
      }
    } finally {
      setShowAddAddressModal(false); // Đảm bảo modal tắt
      setLoading(false);
      setNewAddress({
        name: "",
        phone: "",
        district: "",
        ward: "",
        street: "",
        addressLine: "",
        isDefault: false,
      });
    }
  };

  useEffect(() => {
    fetchCart();
    fetchAddress();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      const response = await updateCart(productId, newQuantity);
      if (response.data.code === 200) {
        toast.success(response.data.message);
      }
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: newQuantity,
                totalItemPrice: item.price * newQuantity,
              }
            : item
        )
      );
    } catch (error) {
      console.error("Có lỗi trong việc thay đổi số lượng:", error);
    }
  };

  const handleDeleteItem = (item) => {
    setItemToRemove(item);
    setShowRemoveModal(true);
  };

  const confirmRemoveItem = async (productId) => {
    try {
      const response = await deleteCart(productId);
      if (response.data.code === 200) {
        toast.success("Xóa thành công");
        fetchCart();
      } else {
        toast.error(response.data.message || "Xóa thất bại");
      }
    } catch (err) {
      console.error("Có lỗi trong việc xóa:", err);
      toast.error("Có lỗi trong việc xóa sản phẩm");
    } finally {
      setShowRemoveModal(false);
    }
  };

  const handleAddressSelect = (addr) => {
    setShippingAddress({
      addressId: addr.id,
      fullName: addr.name,
      phone: addr.phone,
      addressLine: addr.addressLine,
      ward: addr.ward,
      district: addr.district,
      city: addr.city,
      paymentMethod: shippingAddress.paymentMethod,
    });
  };

  const handleNewAddressChange = (field, value) => {
    setNewAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckout = async () => {
    if (!cartItems || cartItems.length === 0) {
      toast.warning("Giỏ hàng trống!");
      return;
    }

    if (!validateAddress()) {
      toast.warning(
        "Vui lòng chọn địa chỉ giao hàng và phương thức thanh toán!"
      );
      return;
    }

    try {
      const response = await createOrder(
        cart?.cartId,
        shippingAddress.addressId,
        shippingAddress.paymentMethod
      );

      if (response?.data?.code === 200) {
        toast.success("Đặt hàng thành công!");
        navigate("/order-complete");
      } else {
        toast.error(response?.data?.message || "Đặt hàng thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      toast.error("Có lỗi xảy ra khi tạo đơn hàng!");
    }
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
    if (subtotal >= 500000) return 0;
    return 30000;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const validateAddress = () => {
    //return !!shippingAddress.addressId && !!shippingAddress.paymentMethod;
    const required = [
      "fullName",
      "phone",
      "addressLine",
      "ward",
      "district",
      "city",
    ];
    // return required.every((field) => shippingAddress[field].trim() !== "");
    const addressValid = required.every(
      (field) =>
        typeof shippingAddress[field] === "string" &&
        shippingAddress[field].trim() !== ""
    );

    // Also check if payment method is selected
    const paymentMethodValid =
      shippingAddress.paymentMethod &&
      shippingAddress.paymentMethod.trim() !== "";

    return addressValid && paymentMethodValid;
  };

  // const handleCheckout = () => {
  //   if (cartItems.length === 0) {
  //     alert("Giỏ hàng trống!");
  //     return;
  //   }

  //   // const outOfStockItems = cartItems.filter((item) => !item.inStock);
  //   // if (outOfStockItems.length > 0) {
  //   //   alert("Có sản phẩm hết hàng trong giỏ hàng. Vui lòng xóa hoặc thay thế!");
  //   //   return;
  //   // }

  //   if (!validateAddress()) {
  //     alert("Vui lòng điền đầy đủ thông tin địa chỉ nhận hàng!");
  //     return;
  //   }

  //   // Navigate to checkout page
  //   navigate("/checkout", {
  //     state: {
  //       cartItems,
  //       shippingAddress,
  //       subtotal: calculateSubtotal(),
  //       shipping: calculateShipping(),
  //       total: calculateTotal(),
  //     },
  //   });
  // };

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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
                Giỏ hàng ({cartItems?.length})
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
                  onClick={() => navigate(-1)}
                >
                  Khám phá sản phẩm
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row>
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
                      <tr key={item.productId}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={item?.image || "/placeholder.svg"}
                              alt={item?.productName}
                              className="rounded me-3"
                              style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover",
                              }}
                            />
                            <div>
                              <h6 className="mb-1">{item?.productName}</h6>
                              <div className="text-muted small">
                                <div>Màu: {item?.color}</div>
                                <div>Size: {item?.size}</div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle">
                          <strong>{formatPrice(item?.price)}</strong>
                        </td>
                        <td className="align-middle">
                          <div className="d-flex align-items-center gap-2">
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() =>
                                handleQuantityChange(
                                  item.productId,
                                  item.quantity - 1
                                )
                              }
                              disabled={item.quantity <= 1}
                            >
                              <FiMinus />
                            </Button>
                            <span
                              className="mx-2"
                              style={{ minWidth: "30px", textAlign: "center" }}
                            >
                              {item?.quantity}
                            </span>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() =>
                                handleQuantityChange(
                                  item.productId,
                                  item.quantity + 1
                                )
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
                            onClick={() => handleDeleteItem(item)}
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
                {addressList.length > 0 ? (
                  <div className="mb-3">
                    <Form.Label>Chọn địa chỉ giao hàng</Form.Label>
                    <div className="list-group">
                      {addressList.map((addr) => (
                        <label
                          key={addr.id}
                          className="list-group-item border rounded p-3 mb-2"
                          style={{ cursor: "pointer" }}
                        >
                          <div className="d-flex align-items-start">
                            <Form.Check
                              type="radio"
                              name="addressId"
                              value={addr.id}
                              checked={shippingAddress.addressId === addr.id}
                              onChange={() => handleAddressSelect(addr)}
                              className="me-3 mt-1"
                              required
                            />
                            <div className="w-100">
                              <div className="mb-1">
                                <FiUser className="text-primary me-2" />
                                <strong>{addr.name}</strong>
                                {addr.isDefault && (
                                  <Badge bg="success" className="ms-2">
                                    Mặc định
                                  </Badge>
                                )}
                              </div>
                              <div className="mb-1">
                                <FiPhone className="text-secondary me-2" />
                                {addr.phone}
                              </div>
                              <div>
                                <FiMapPin className="text-danger me-2" />
                                {addr.addressLine}, {addr.ward}, {addr.district}
                                , {addr.city}
                              </div>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-muted mb-3">
                    Không có địa chỉ nào được lưu.
                  </div>
                )}
                <Button
                  variant="outline-primary"
                  onClick={() => setShowAddAddressModal(true)}
                  className="mb-3"
                >
                  <FiPlusCircle className="me-2" />
                  Thêm địa chỉ mới
                </Button>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Phương thức thanh toán{" "}
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    value={shippingAddress.paymentMethod}
                    onChange={(e) =>
                      handleAddressChange("paymentMethod", e.target.value)
                    }
                    required
                  >
                    <option value="">Chọn phương thức thanh toán</option>
                    <option value="COD">COD</option>
                    {/* <option value="VNPAY">VNPAY</option> */}
                  </Form.Select>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

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
                    Miễn phí vận chuyển cho đơn hàng từ {formatPrice(250000)}
                  </small>
                </div>

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
                        {shippingAddress.addressLine}, {shippingAddress.ward},{" "}
                        {shippingAddress.district}, {shippingAddress.city}
                      </div>
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>

            <Card className="mt-3">
              <Card.Body className="p-3">
                <h6 className="mb-2">
                  <FiTruck className="me-2" />
                  Thông tin vận chuyển
                </h6>
                <ul className="list-unstyled mb-0 small text-muted">
                  <li className="mb-1">• Giao hàng trong 2-3 ngày làm việc</li>
                  <li className="mb-1">
                    • Miễn phí vận chuyển cho đơn từ 250.000đ
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
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRemoveModal(false)}>
            Hủy
          </Button>
          <Button
            variant="danger"
            onClick={() => confirmRemoveItem(itemToRemove?.productId)}
          >
            <FiTrash2 className="me-2" />
            Xóa sản phẩm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add New Address Modal */}
      <Modal
        show={showAddAddressModal}
        onHide={() => setShowAddAddressModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm địa chỉ mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                Họ và tên <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={newAddress.name}
                onChange={(e) => handleNewAddressChange("name", e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Số điện thoại <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="tel"
                value={newAddress.phone}
                onChange={(e) =>
                  handleNewAddressChange("phone", e.target.value)
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Tỉnh/Tp <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={newAddress.city}
                onChange={(e) => handleNewAddressChange("city", e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Quận/Huyện <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={newAddress.district}
                onChange={(e) =>
                  handleNewAddressChange("district", e.target.value)
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Phường/Xã <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={newAddress.ward}
                onChange={(e) => handleNewAddressChange("ward", e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Đường/Phố <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={newAddress.street}
                onChange={(e) =>
                  handleNewAddressChange("street", e.target.value)
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Địa chỉ chi tiết <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={newAddress.addressLine}
                onChange={(e) =>
                  handleNewAddressChange("addressLine", e.target.value)
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Đặt làm địa chỉ mặc định"
                checked={newAddress.isDefault}
                onChange={(e) =>
                  handleNewAddressChange("isDefault", e.target.checked)
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAddAddressModal(false)}
          >
            Hủy
          </Button>
          <Button variant="primary" onClick={createNewAddress}>
            Thêm địa chỉ
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
