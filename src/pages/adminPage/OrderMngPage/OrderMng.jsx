import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Container, Row, Col, Button, Badge, Card, Tabs, Tab, Table, Modal, Alert } from "react-bootstrap"
import {
  FiEdit,
  FiTrash2,
  FiEye,
  FiEyeOff,
  FiArrowLeft,
  FiStar,
  FiCalendar,
  FiPackage,
  FiImage,
  FiMessageSquare,
} from "react-icons/fi"

export default function AdminProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true)
        // const response = await getProductDetail(id);
        // Mock data theo cấu trúc API
        const response = {
          result: {
            id: "1",
            productName: "Áo Thun Cotton Premium",
            price: 299000,
            description:
              "Áo thun cotton cao cấp, chất liệu mềm mại, thoáng mát. Thiết kế đơn giản, phù hợp cho mọi hoạt động hàng ngày.",
            imageThumbnail: "https://via.placeholder.com/600x600/007bff/ffffff?text=Thumbnail",
            status: "ACTIVE",
            createdAt: "2024-01-15T10:30:00.000Z",
            updatedAt: "2024-06-10T14:20:00.000Z",
            sizes: [
              { id: 1, size: "S" },
              { id: 2, size: "M" },
              { id: 3, size: "L" },
              { id: 4, size: "XL" },
              { id: 5, size: "XXL" },
            ],
            category: {
              id: 1,
              categoryName: "Áo Thun",
              description: "Danh mục áo thun các loại",
              status: "ACTIVE",
              createdAt: "2024-01-01T00:00:00.000Z",
              updatedAt: "2024-01-01T00:00:00.000Z",
              isDeleted: false,
            },
            fabric: {
              id: 2,
              fabricName: "Cotton 100%",
              price: 50000,
              status: "ACTIVE",
              createdAt: "2024-01-01T00:00:00.000Z",
              updatedAt: "2024-01-01T00:00:00.000Z",
              isDeleted: false,
            },
            typePrint: {
              id: 3,
              printName: "In Lụa",
              price: 30000,
              status: "ACTIVE",
              createdAt: "2024-01-01T00:00:00.000Z",
              updatedAt: "2024-01-01T00:00:00.000Z",
              isDeleted: false,
            },
            feedbacks: [
              {
                id: 1,
                description: "Chất lượng áo rất tốt, vải mềm mại và thoáng mát. Size vừa vặn như mô tả.",
                rating: 5,
              },
              {
                id: 2,
                description: "Áo đẹp, chất lượng tốt. Giao hàng nhanh. Tuy nhiên màu sắc hơi đậm hơn so với hình ảnh.",
                rating: 4,
              },
              {
                id: 3,
                description: "Sản phẩm tốt, giá cả hợp lý. Sẽ mua lại.",
                rating: 5,
              },
            ],
            images: [
              {
                id: "img1",
                image: "https://via.placeholder.com/600x600/007bff/ffffff?text=Image+1",
                createdAt: "2024-01-15T10:30:00.000Z",
                updatedAt: "2024-01-15T10:30:00.000Z",
                isDeleted: false,
              },
              {
                id: "img2",
                image: "https://via.placeholder.com/600x600/28a745/ffffff?text=Image+2",
                createdAt: "2024-01-15T10:30:00.000Z",
                updatedAt: "2024-01-15T10:30:00.000Z",
                isDeleted: false,
              },
              {
                id: "img3",
                image: "https://via.placeholder.com/600x600/dc3545/ffffff?text=Image+3",
                createdAt: "2024-01-15T10:30:00.000Z",
                updatedAt: "2024-01-15T10:30:00.000Z",
                isDeleted: false,
              },
            ],
          },
        }

        if (response && response.result) {
          setProduct(response.result)
        }
      } catch (err) {
        console.error("Error fetching product:", err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchDetail()
    }
  }, [id])

  const getAllImages = () => {
    if (!product) return []

    const allImages = []

    if (product.imageThumbnail) {
      allImages.push(product.imageThumbnail)
    }

    if (product.images && product.images.length > 0) {
      product.images.forEach((img) => {
        if (img.image && img.image !== product.imageThumbnail) {
          allImages.push(img.image)
        }
      })
    }

    return allImages
  }

  const calculateRating = () => {
    if (!product?.feedbacks || product?.feedbacks.length === 0) {
      return { rating: 0, reviewCount: 0 }
    }

    const totalRating = product.feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0)
    const averageRating = totalRating / product.feedbacks.length

    return {
      rating: Math.round(averageRating * 10) / 10,
      reviewCount: product.feedbacks.length,
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("vi-VN")
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={`${i < Math.floor(rating) ? "text-warning" : "text-muted"}`}
        style={{
          fill: i < Math.floor(rating) ? "#ffc107" : "none",
        }}
      />
    ))
  }

  const handleEdit = () => {
    navigate(`/admin/products/edit/${id}`)
  }

  const handleDelete = () => {
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    try {
      // await deleteProduct(id)
      console.log("Deleting product:", id)
      setShowDeleteModal(false)
      navigate("/admin/products")
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  const handleStatusChange = () => {
    setShowStatusModal(true)
  }

  const confirmStatusChange = async () => {
    try {
      const newStatus = product.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
      // await updateProductStatus(id, newStatus)
      console.log("Changing status to:", newStatus)
      setProduct((prev) => ({ ...prev, status: newStatus }))
      setShowStatusModal(false)
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  if (loading) {
    return (
      <Container className="py-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    )
  }

  if (!product) {
    return (
      <Container className="py-4">
        <Alert variant="danger">
          <h4>Không tìm thấy sản phẩm</h4>
          <p>Sản phẩm có ID "{id}" không tồn tại hoặc đã bị xóa.</p>
          <Button variant="outline-danger" onClick={() => navigate("/admin/products")}>
            <FiArrowLeft className="me-2" />
            Quay lại danh sách
          </Button>
        </Alert>
      </Container>
    )
  }

  const { rating, reviewCount } = calculateRating()
  const allImages = getAllImages()

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Button variant="outline-secondary" className="me-3" onClick={() => navigate("/admin/products")}>
                <FiArrowLeft className="me-2" />
                Quay lại
              </Button>
              <h2 className="d-inline-block mb-0">Chi tiết sản phẩm</h2>
            </div>
            <div className="d-flex gap-2">
              <Button variant="primary" onClick={handleEdit}>
                <FiEdit className="me-2" />
                Chỉnh sửa
              </Button>
              <Button variant={product.status === "ACTIVE" ? "warning" : "success"} onClick={handleStatusChange}>
                {product.status === "ACTIVE" ? <FiEyeOff className="me-2" /> : <FiEye className="me-2" />}
                {product.status === "ACTIVE" ? "Ẩn sản phẩm" : "Hiện sản phẩm"}
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                <FiTrash2 className="me-2" />
                Xóa
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Product Overview */}
      <Row className="mb-4">
        <Col lg={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <FiImage className="me-2" />
                Hình ảnh sản phẩm
              </h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <img
                  src={allImages[selectedImage] || "/placeholder.svg"}
                  alt={product.productName}
                  className="img-fluid rounded border"
                  style={{ width: "100%", height: "300px", objectFit: "cover" }}
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
                        style={{ cursor: "pointer", height: "60px", objectFit: "cover" }}
                        onClick={() => setSelectedImage(index)}
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <FiPackage className="me-2" />
                Thông tin cơ bản
              </h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <strong>Tên sản phẩm:</strong>
                    <p className="mb-0">{product.productName}</p>
                  </div>
                  <div className="mb-3">
                    <strong>Giá bán:</strong>
                    <p className="mb-0 text-danger fs-5 fw-bold">{formatPrice(product.price)}</p>
                  </div>
                  <div className="mb-3">
                    <strong>Trạng thái:</strong>
                    <div>
                      <Badge bg={product.status === "ACTIVE" ? "success" : "secondary"}>
                        {product.status === "ACTIVE" ? "Đang bán" : "Ngừng bán"}
                      </Badge>
                    </div>
                  </div>
                  <div className="mb-3">
                    <strong>Đánh giá:</strong>
                    <div className="d-flex align-items-center gap-2">
                      <div className="d-flex">{renderStars(rating)}</div>
                      <span>
                        {rating}/5 ({reviewCount} đánh giá)
                      </span>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <strong>Danh mục:</strong>
                    <p className="mb-0">{product.category?.categoryName || "N/A"}</p>
                  </div>
                  <div className="mb-3">
                    <strong>Chất liệu:</strong>
                    <p className="mb-0">{product.fabric?.fabricName || "N/A"}</p>
                  </div>
                  <div className="mb-3">
                    <strong>Loại in:</strong>
                    <p className="mb-0">{product.typePrint?.printName || "N/A"}</p>
                  </div>
                  <div className="mb-3">
                    <strong>Size có sẵn:</strong>
                    <div className="d-flex flex-wrap gap-1">
                      {product.sizes?.map((sizeObj) => (
                        <Badge key={sizeObj.id} bg="outline-primary" text="primary">
                          {sizeObj.size}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="mb-3">
                <strong>Mô tả:</strong>
                <p className="mb-0">{product.description}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Detailed Information Tabs */}
      <Tabs defaultActiveKey="details" className="mb-4">
        <Tab eventKey="details" title="Chi tiết kỹ thuật">
          <Card>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <td>
                          <strong>ID sản phẩm</strong>
                        </td>
                        <td>{product.id}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Ngày tạo</strong>
                        </td>
                        <td>
                          <FiCalendar className="me-2" />
                          {formatDate(product.createdAt)}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Cập nhật lần cuối</strong>
                        </td>
                        <td>
                          <FiCalendar className="me-2" />
                          {formatDate(product.updatedAt)}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Giá chất liệu</strong>
                        </td>
                        <td>{formatPrice(product.fabric?.price || 0)}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Giá in ấn</strong>
                        </td>
                        <td>{formatPrice(product.typePrint?.price || 0)}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col md={6}>
                  <h6>Thông tin danh mục</h6>
                  <Table striped bordered hover size="sm">
                    <tbody>
                      <tr>
                        <td>
                          <strong>Tên danh mục</strong>
                        </td>
                        <td>{product.category?.categoryName}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Mô tả danh mục</strong>
                        </td>
                        <td>{product.category?.description}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Trạng thái danh mục</strong>
                        </td>
                        <td>
                          <Badge bg={product.category?.status === "ACTIVE" ? "success" : "secondary"}>
                            {product.category?.status}
                          </Badge>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="images" title={`Hình ảnh (${product.images?.length || 0})`}>
          <Card>
            <Card.Body>
              <Row>
                {product.images?.map((img, index) => (
                  <Col md={4} key={img.id} className="mb-3">
                    <Card>
                      <Card.Img variant="top" src={img.image} style={{ height: "200px", objectFit: "cover" }} />
                      <Card.Body className="p-2">
                        <small className="text-muted">
                          <div>ID: {img.id}</div>
                          <div>Tạo: {formatDate(img.createdAt)}</div>
                          <div>Cập nhật: {formatDate(img.updatedAt)}</div>
                        </small>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="reviews" title={`Đánh giá (${reviewCount})`}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <FiMessageSquare className="me-2" />
                Đánh giá từ khách hàng
              </h5>
            </Card.Header>
            <Card.Body>
              {product.feedbacks && product.feedbacks.length > 0 ? (
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Đánh giá</th>
                      <th>Nội dung</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.feedbacks.map((feedback) => (
                      <tr key={feedback.id}>
                        <td>{feedback.id}</td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div className="d-flex">{renderStars(feedback.rating)}</div>
                            <span>{feedback.rating}/5</span>
                          </div>
                        </td>
                        <td>
                          <div style={{ maxWidth: "300px" }}>{feedback.description}</div>
                        </td>
                        <td>
                          <Button variant="outline-danger" size="sm">
                            <FiTrash2 />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <Alert variant="info">Chưa có đánh giá nào cho sản phẩm này.</Alert>
              )}
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Bạn có chắc chắn muốn xóa sản phẩm <strong>"{product.productName}"</strong>?
          </p>
          <Alert variant="warning">
            <strong>Cảnh báo:</strong> Hành động này không thể hoàn tác!
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Hủy
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            <FiTrash2 className="me-2" />
            Xóa sản phẩm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Status Change Confirmation Modal */}
      <Modal show={showStatusModal} onHide={() => setShowStatusModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận thay đổi trạng thái</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Bạn có chắc chắn muốn {product.status === "ACTIVE" ? "ẩn" : "hiện"} sản phẩm{" "}
            <strong>"{product.productName}"</strong>?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStatusModal(false)}>
            Hủy
          </Button>
          <Button variant={product.status === "ACTIVE" ? "warning" : "success"} onClick={confirmStatusChange}>
            {product.status === "ACTIVE" ? <FiEyeOff className="me-2" /> : <FiEye className="me-2" />}
            {product.status === "ACTIVE" ? "Ẩn sản phẩm" : "Hiện sản phẩm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}
