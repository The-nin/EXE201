import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import { BsFillPlayCircleFill } from "react-icons/bs";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";
import headerStyles from "./LandingPage.module.scss";

function LandingPage() {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in-up, .slide-in-right");
    elements.forEach((el) => {
      el.classList.add("animate");
    });
  }, []);

  return (
    <div>
      <ProductCarousel />

      <header className={headerStyles.header}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="display-4 fw-bold text-dark fade-in-up">
                Chào mừng đến với ICOT
              </h1>
              <p className="lead text-dark fade-in-up">
                Tạo dựng phong cách cá nhân qua từng sản phẩm áo in. Chất lượng
                vượt trội – Thiết kế sáng tạo!
              </p>
              <Button
                variant="primary"
                size="lg"
                as={Link}
                to="/products"
                className="cta-btn mt-3 fade-in-up"
              >
                Khám Phá Ngay
              </Button>
            </Col>
            <Col md={6}>
              <img
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"
                alt="Hero"
                className="img-fluid rounded shadow slide-in-right"
              />
            </Col>
          </Row>
        </Container>
      </header>

      {/* Features Section */}
      <section className="features bg-light py-5">
        <Container>
          <h2 className="text-center mb-4">Tại sao chọn ICOT?</h2>
          <Row>
            <Col md={4} className="text-center fade-in-up">
              <BsFillPlayCircleFill size={50} className="mb-3 text-primary" />
              <h4>Thiết Kế Độc Đáo</h4>
              <p>
                Chúng tôi biến những ý tưởng của bạn thành các thiết kế độc đáo
                và ấn tượng.
              </p>
            </Col>
            <Col md={4} className="text-center fade-in-up">
              <BsFillPlayCircleFill size={50} className="mb-3 text-primary" />
              <h4>Chất Lượng Cao</h4>
              <p>
                Sản phẩm được làm từ chất liệu vải cao cấp, bền đẹp theo thời
                gian.
              </p>
            </Col>
            <Col md={4} className="text-center fade-in-up">
              <BsFillPlayCircleFill size={50} className="mb-3 text-primary" />
              <h4>Giao Hàng Nhanh</h4>
              <p>
                Đảm bảo giao hàng nhanh chóng và đúng hẹn, đem lại sự hài lòng
                cho bạn.
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="text-center fade-in-up">
              <BsFillPlayCircleFill size={50} className="mb-3 text-primary" />
              <h4>Đội ngũ chuyên nghiệp & thân thiện</h4>
              <p>
                Nhân viên nhiệt huyết, tư vấn tận tình và luôn sẵn sàng hỗ trợ
                bạn trong mọi khâu từ thiết kế đến giao hàng.
              </p>
            </Col>
            <Col md={4} className="text-center fade-in-up">
              <BsFillPlayCircleFill size={50} className="mb-3 text-primary" />
              <h4>Luôn lắng nghe</h4>
              <p>
                Chúng tôi luôn lắng nghe, ghi nhận và cải tiến theo từng phản
                hồi của bạn.
              </p>
            </Col>
            <Col md={4} className="text-center fade-in-up">
              <BsFillPlayCircleFill size={50} className="mb-3 text-primary" />
              <h4>Đổi mới không ngừng</h4>
              <p>
                Liên tục cập nhật công nghệ in ấn và xu hướng thiết kế hiện đại.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="process py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Quy Trình Đặt Hàng</h2>
            <p className="lead text-muted">
              Chỉ với 4 bước đơn giản, bạn đã có ngay sản phẩm ưng ý
            </p>
          </div>
          <Row>
            <Col md={3} className="text-center mb-4 fade-in-up">
              <div className="process-step">
                <div className="step-number">1</div>
                <h5 className="mt-3">Chọn Sản Phẩm</h5>
                <p>Duyệt qua danh mục và chọn sản phẩm yêu thích</p>
              </div>
            </Col>
            <Col md={3} className="text-center mb-4 fade-in-up">
              <div className="process-step">
                <div className="step-number">2</div>
                <h5 className="mt-3">Tùy Chỉnh</h5>
                <p>Chọn size, màu sắc và thiết kế theo ý muốn</p>
              </div>
            </Col>
            <Col md={3} className="text-center mb-4 fade-in-up">
              <div className="process-step">
                <div className="step-number">3</div>
                <h5 className="mt-3">Thanh Toán</h5>
                <p>Thanh toán an toàn qua nhiều phương thức</p>
              </div>
            </Col>
            <Col md={3} className="text-center mb-4 fade-in-up">
              <div className="process-step">
                <div className="step-number">4</div>
                <h5 className="mt-3">Nhận Hàng</h5>
                <p>Nhận sản phẩm tại nhà trong 2-3 ngày</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* <section className="process py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Sản phẩm nổi bật</h2>
            <div>Xem thêm</div>
          </div>
          <ProductCarousel />
        </Container>
      </section> */}
    </div>
  );
}

export default LandingPage;
