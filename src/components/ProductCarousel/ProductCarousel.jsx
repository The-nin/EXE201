import Carousel from "react-bootstrap/Carousel";
import "./ProductCarousel.scss"; // tạo thêm file CSS nếu muốn tùy chỉnh

function ProductCarousel() {
  return (
    <Carousel fade interval={3000} controls indicators>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src="https://plus.unsplash.com/premium_photo-1679056833362-f6e9b53774c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNsb3RoZXxlbnwwfHwwfHx8MA%3D%3D"
          alt="Áo thiết kế riêng"
        />
        <Carousel.Caption>
          <h3>Thiết kế độc quyền</h3>
          <p>Biến ý tưởng của bạn thành sản phẩm thật.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src="https://plus.unsplash.com/premium_photo-1673514503608-a9e6c3f5af0d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGRyYXd8ZW58MHx8MHx8fDA%3D"
          alt="Chất lượng cao"
        />
        <Carousel.Caption>
          <h3>Chất lượng hàng đầu</h3>
          <p>Vải cotton cao cấp – bền đẹp theo thời gian.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Giao hàng nhanh"
        />
        <Carousel.Caption>
          <h3>Giao hàng toàn quốc</h3>
          <p>Đúng hẹn – đổi trả dễ dàng – hỗ trợ tận tâm.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ProductCarousel;
