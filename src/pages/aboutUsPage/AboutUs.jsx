// AboutUsPage.jsx
import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./AboutUs.scss";

export default function AboutUsPage() {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in-up, .slide-in-right");
    elements.forEach((el) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) el.classList.add("animate");
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
    });
  }, []);

  return (
    <Container className="my-5">
      {/* Tiêu đề chính */}
      <Row className="mb-5 text-center fade-in-up">
        <Col>
          <h1 className="display-4 fw-bold">Về Chúng Tôi</h1>
          <p className="lead">
            Sáng tạo trong từng thiết kế – Chất lượng trong từng đường may.
          </p>
        </Col>
      </Row>

      <Row className="mb-5 align-items-center fade-in-up">
        <Col md={6}>
          <img
            src="https://th.bing.com/th/id/OIF.5Q30erg4V9B60fXHhxz5Sg?w=313&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7"
            alt="Mission"
            className="img-fluid rounded shadow float-animation"
          />
        </Col>
        <Col md={6}>
          <h2>Sứ mệnh của chúng tôi</h2>
          <p>
            Chúng tôi cung cấp dịch vụ in áo thun chất lượng cao, thiết kế độc
            quyền, hỗ trợ khách hàng tận tâm, giúp bạn thể hiện cá tính qua từng
            sản phẩm.
          </p>
        </Col>
      </Row>

      {/* Tại sao chọn chúng tôi */}
      <Row className="mb-4 text-center fade-in-up">
        <Col>
          <h2 className="mb-4">Tại sao chọn chúng tôi?</h2>
        </Col>
      </Row>

      <Row className="g-4 mb-4 fade-in-up">
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>🎨 Thiết kế độc quyền</Card.Title>
              <Card.Text>
                Đội ngũ sáng tạo biến mọi ý tưởng của bạn thành thiết kế cá nhân
                độc đáo.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>👕 Chất lượng hàng đầu</Card.Title>
              <Card.Text>
                Sử dụng vải cotton mềm mại, in ấn sắc nét, bền màu theo thời
                gian.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>🚚 Giao hàng nhanh chóng</Card.Title>
              <Card.Text>
                Giao hàng toàn quốc, hỗ trợ đổi trả, đúng hẹn – luôn đảm bảo
                trải nghiệm khách hàng.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4 mb-5 fade-in-up">
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>👥 Đội ngũ chuyên nghiệp & thân thiện</Card.Title>
              <Card.Text>
                Nhân viên nhiệt huyết, tư vấn tận tình và luôn sẵn sàng hỗ trợ
                bạn trong mọi khâu từ thiết kế đến giao hàng.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>🗣️ Luôn lắng nghe</Card.Title>
              <Card.Text>
                Chúng tôi luôn lắng nghe, ghi nhận và cải tiến theo từng phản
                hồi của bạn.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>💡 Đổi mới không ngừng</Card.Title>
              <Card.Text>
                Liên tục cập nhật công nghệ in ấn và xu hướng thiết kế hiện đại.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Đội ngũ */}
      <Row className="mb-5 align-items-center">
        <Col md={6} className="order-md-2 slide-in-right">
          <img
            src="https://images.unsplash.com/photo-1556761175-129418cb2dfe"
            alt="Team"
            className="img-fluid rounded shadow"
          />
        </Col>
        <Col md={6} className="order-md-1 fade-in-up">
          <h2>Đội ngũ của chúng tôi</h2>
          <p>
            Gồm những người trẻ đầy sáng tạo, các designer chuyên nghiệp và thợ
            in nhiều năm kinh nghiệm – tất cả cùng tạo nên sự khác biệt trong
            từng sản phẩm.
          </p>
        </Col>
      </Row>

      {/* Liên hệ */}
      <Row className="text-center fade-in-up">
        <Col>
          <h3 className="mb-3">Liên hệ với chúng tôi</h3>
          <p>
            Bạn có ý tưởng thiết kế áo riêng? Hãy nhắn cho chúng tôi – đội ngũ
            sẽ hỗ trợ bạn từ A-Z.
          </p>
          <Button variant="primary" size="lg" href="/contact" className="pulse">
            Gửi yêu cầu ngay
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
