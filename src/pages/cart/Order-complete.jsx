import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FiCheckCircle, FiPackage, FiShoppingBag } from "react-icons/fi";

export default function OrderComplete() {
  const navigate = useNavigate();

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <div className="mb-4">
              <FiCheckCircle size={80} className="text-success" />
            </div>
            <h1 className="text-success mb-3">Đặt hàng thành công!</h1>
            <p className="text-muted fs-5 mb-4">
              Cảm ơn bạn đã mua sắm tại cửa hàng. Đơn hàng của bạn đã được xác
              nhận và đang được xử lý.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/order-history")}
              >
                <FiPackage className="me-2" />
                Theo dõi đơn hàng
              </Button>
              <Button
                variant="outline-primary"
                size="lg"
                onClick={() => navigate("/product")}
              >
                <FiShoppingBag className="me-2" />
                Tiếp tục mua sắm
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
