import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  Card,
  Tabs,
  Tab,
  ListGroup,
} from "react-bootstrap";
import {
  FiHeart,
  FiShare2,
  FiMinus,
  FiPlus,
  FiShoppingCart,
  FiStar,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiArrowLeft,
} from "react-icons/fi";
import { addToCart, getProductDetail } from "../../service/user";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const mockProduct = {
  description:
    "Áo thun cotton cao cấp, chất liệu mềm mại, thoáng mát. Thiết kế đơn giản, phù hợp cho mọi hoạt động hàng ngày. Được làm từ 100% cotton tự nhiên, đảm bảo độ bền và thoải mái khi mặc.",
  features: [
    "Chất liệu cotton 100% tự nhiên",
    "Thiết kế basic dễ phối đồ",
    "Form áo vừa vặn, thoải mái",
    "Màu sắc bền đẹp sau nhiều lần giặt",
  ],
};

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  // const [isFavorite, setIsFavorite] = useState(false);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredSizeId, setHoveredSizeId] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleQuantityChange = (type) => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const getAllProductDetail = async () => {
      setLoading(true);
      try {
        const response = await getProductDetail(id);
        console.log(response);
        setProduct(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getAllProductDetail();
  }, []);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      // You might want to handle this case - redirect to login or show login modal
      // toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
      return;
    }

    try {
      const response = await addToCart(product.id, quantity, selectedSize.size);
      if (response?.data?.code === 200) {
        toast.success("Thêm vào giỏ hàng thành công");
      } else {
        toast.error("Thêm vào giỏ hàng thất bại");
      }
    } catch (error) {
      console.error("Có lỗi:", error);
    }
  };

  const getAllImages = () => {
    if (!product) return [];

    const allImages = [];

    if (product.imageThumbnail) {
      allImages.push(product.imageThumbnail);
    }

    if (product.images && product.images.length > 0) {
      product.images.forEach((img) => {
        if (img.image && img.image !== product.imageThumbnail) {
          allImages.push(img.image);
        }
      });
    }

    return allImages;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // const renderStars = (rating) => {
  //   return Array.from({ length: 5 }, (_, i) => (
  //     <FiStar
  //       key={i}
  //       className={`${
  //         i < Math.floor(rating)
  //           ? "text-warning filled"
  //           : i < rating
  //           ? "text-warning half-filled"
  //           : "text-muted"
  //       }`}
  //       style={{
  //         fill:
  //           i < Math.floor(rating)
  //             ? "#ffc107"
  //             : i < rating
  //             ? "rgba(255, 193, 7, 0.5)"
  //             : "none",
  //       }}
  //     />
  //   ));
  // };

  // const colorMap = {
  //   Trắng: "#fffff",
  //   Đỏ: "#ff0000",
  // };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const allImages = getAllImages();

  return (
    <Container className="py-5">
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
      <div className="d-flex align-items-center mb-4">
        <Button
          variant="outline-secondary"
          className="me-3"
          onClick={() => navigate("/product")}
        >
          <FiArrowLeft className="me-2" />
          Tiếp tục mua sắm
        </Button>
      </div>

      <Row className="mb-5">
        {/* Product Images */}
        <Col lg={6} className="mb-4 mb-lg-0">
          <div className="position-relative mb-3">
            {/* {mockProduct.discount > 0 && (
              <Badge bg="danger" className="position-absolute" style={{ top: "15px", left: "15px", zIndex: 10 }}>
                -{mockProduct.discount}%
              </Badge>
            )} */}
            <img
              src={allImages[selectedImage] || "/placeholder.svg"}
              alt={product.productName}
              className="img-fluid rounded border"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </div>

          {allImages.length > 1 && (
            <Row className="g-2">
              {allImages.map((image, index) => (
                <Col xs={3} key={index}>
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.productName} ${index + 1}`}
                    className={`img-thumbnail cursor-pointer ${
                      selectedImage === index ? "border-primary border-2" : ""
                    }`}
                    style={{
                      cursor: "pointer",
                      borderWidth: selectedImage === index ? "3px" : "1px",
                      borderColor:
                        selectedImage === index ? "#007bff" : "#dee2e6",
                    }}
                    onClick={() => setSelectedImage(index)}
                  />
                </Col>
              ))}
            </Row>
          )}
        </Col>

        {/* Product Info */}
        <Col lg={6}>
          <div className="mb-3">
            <Badge bg="secondary" className="mb-2">
              {product.category?.categoryName}
            </Badge>
            <h1 className="fs-2 fw-bold mb-2">{product?.productName}</h1>

            {/* <div className="d-flex align-items-center gap-2 mb-3">
              <div className="d-flex align-items-center">
                {renderStars(mockProduct.rating)}
              </div>
              <span className="text-muted small">
                {mockProduct.rating} ({mockProduct.reviewCount} đánh giá)
              </span>
            </div> */}
          </div>

          <div className="mb-4">
            <div className="d-flex align-items-center gap-3 mb-2">
              <span className="fs-2 fw-bold text-danger">
                {formatPrice(product?.price)}
              </span>
            </div>
            <p className="text-muted">{product?.description}</p>
          </div>

          {/* Color */}
          <div className="mb-4">
            <h5 className="fw-semibold mb-2">Màu sắc:</h5>
            <div className="d-flex align-items-center gap-2">
              <div
                className="rounded-circle border border-2"
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "#fff",
                  borderColor: "#dee2e6",
                }}
              ></div>
              <span className="fw-medium">Màu trắng</span>
            </div>
          </div>

          {/* Size Selection */}
          {product?.sizes?.length > 0 && (
            <div className="mb-4">
              <h5 className="fw-semibold mb-2">Kích thước:</h5>
              <div className="d-flex flex-wrap gap-2">
                {product.sizes.map((sizeObj) => {
                  const isSelected = selectedSize?.id === sizeObj.id;
                  const isHovered = hoveredSizeId === sizeObj.id;

                  return (
                    <Button
                      key={sizeObj.id}
                      className="px-3 py-2"
                      style={{
                        minWidth: "50px",
                        transition: "all 0.3s ease",
                        backgroundColor: isSelected
                          ? "#fc9e78"
                          : isHovered
                          ? "#fc9e78"
                          : "transparent",
                        color: isSelected || isHovered ? "#fff" : "#f76025",
                        borderColor: "#fc9e78",
                      }}
                      onClick={() => setSelectedSize(sizeObj)}
                      onMouseEnter={() => setHoveredSizeId(sizeObj.id)}
                      onMouseLeave={() => setHoveredSizeId(null)}
                    >
                      {sizeObj.size}
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-4">
            <h5 className="fw-semibold mb-2">Số lượng:</h5>
            <div className="d-flex align-items-center gap-3">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => handleQuantityChange("decrease")}
                disabled={quantity <= 1}
              >
                <FiMinus />
              </Button>
              <span
                className="fs-5 fw-semibold"
                style={{ minWidth: "40px", textAlign: "center" }}
              >
                {quantity}
              </span>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => handleQuantityChange("increase")}
              >
                <FiPlus />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mb-4">
            <Button
              variant="primary"
              size="lg"
              className="w-100 mb-3 py-2 fw-semibold"
              onClick={handleAddToCart}
              // disabled={!mockProduct.inStock}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                backgroundColor: isHovered ? "#fc9e78" : "#FDB293",
                border: "none",
                transition: "background-color 0.3s ease",
              }}
            >
              <FiShoppingCart className="me-2" />
              <span>Thêm Vào giỏ hàng</span>
              {/* {product.inStock ? "Thêm vào giỏ hàng" : "Hết hàng"} */}
            </Button>

            {/* <div className="d-flex gap-2">
              <Button
                variant="outline-danger"
                className="flex-grow-1"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <FiHeart
                  className="me-2"
                  style={{ fill: isFavorite ? "#dc3545" : "none" }}
                />
                Yêu thích
              </Button>
              <Button variant="outline-secondary">
                <FiShare2 />
              </Button>
            </div> */}
          </div>

          {/* Features */}
          <Card className="mb-4">
            <Card.Body className="p-3">
              <Row>
                <Col md={4} className="mb-2 mb-md-0">
                  <div className="d-flex align-items-center gap-2">
                    <FiTruck className="text-success" />
                    <span className="small">Miễn phí vận chuyển</span>
                  </div>
                </Col>
                <Col md={4} className="mb-2 mb-md-0">
                  <div className="d-flex align-items-center gap-2">
                    <FiShield className="text-primary" />
                    <span className="small">Bảo hành chất lượng</span>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="d-flex align-items-center gap-2">
                    <FiRefreshCw className="text-warning" />
                    <span className="small">Đổi trả 7 ngày</span>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Product Details Tabs */}
      <Tabs defaultActiveKey="specifications" className="mb-5">
        <Tab eventKey="specifications" title="Thông tin sản phẩm">
          <Card className="border-top-0 rounded-top-0">
            <Card.Body className="p-4">
              <Row>
                <Col md={6}>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex justify-content-between py-3">
                      <span className="fw-medium">Tên sản phẩm:</span>
                      <span className="text-muted">{product?.productName}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between py-3">
                      <span className="fw-medium">Kiểu in:</span>
                      <span className="text-muted">
                        {product?.typePrint?.printName || "Đang tải"}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between py-3">
                      <span className="fw-medium">Màu sắc:</span>
                      <span className="text-muted">
                        {product?.color || "Đang tải"}
                      </span>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={6}>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex justify-content-between py-3">
                      <span className="fw-medium">Chất liệu:</span>
                      <span className="text-muted">
                        {product?.fabric?.fabricName || " Đang tải"}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between py-3">
                      <span className="fw-medium">Danh mục:</span>
                      <span className="text-muted">
                        {product?.category?.categoryName}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between py-3">
                      <span className="fw-medium">Size có sẵn:</span>
                      <span className="text-muted">
                        {product?.sizes
                          ?.map((sizeObj) => sizeObj.size)
                          .join(", ") || "Đang tải"}
                      </span>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="description" title="Mô tả chi tiết">
          <Card className="border-top-0 rounded-top-0">
            <Card.Body className="p-4">
              <p className="text-muted mb-4">{mockProduct.description}</p>

              <hr className="my-4" />

              <div className="mb-4">
                <h5 className="fw-semibold mb-3">Đặc điểm nổi bật:</h5>
                <ul className="list-unstyled">
                  {mockProduct.features.map((feature, index) => (
                    <li key={index} className="d-flex align-items-start mb-2">
                      <div
                        className="rounded-circle bg-primary me-2 mt-2"
                        style={{ width: "6px", height: "6px" }}
                      ></div>
                      <span className="text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <hr className="my-4" />

              <div>
                <h5 className="fw-semibold mb-3">Hướng dẫn bảo quản:</h5>
                <ul className="list-unstyled text-muted">
                  <li className="mb-2">• Giặt máy ở nhiệt độ không quá 40°C</li>
                  <li className="mb-2">• Không sử dụng chất tẩy trắng</li>
                  <li className="mb-2">
                    • Phơi khô tự nhiên, tránh ánh nắng trực tiếp
                  </li>
                  <li className="mb-2">• Ủi ở nhiệt độ trung bình</li>
                </ul>
              </div>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
}
