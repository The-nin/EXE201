import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Row, Col, Image, Button } from "antd";

const { Title, Paragraph } = Typography;

const mockProductData = {
  1: {
    title: "Áo Thun Nam Trơn",
    image: "https://example.com/shirt.jpg",
    price: 249000,
    description:
      "Áo thun nam chất liệu cotton cao cấp, co giãn 4 chiều, thoải mái vận động.",
  },
  2: {
    title: "Áo Hoodie Nỉ",
    image: "https://example.com/hoodie.jpg",
    price: 399000,
    description:
      "Áo hoodie nỉ dày dặn, giữ ấm tốt, kiểu dáng trẻ trung phù hợp mùa đông.",
  },
};

function ProductDetail() {
  const { productId } = useParams();
  const product = mockProductData[productId];

  if (!product) return <div>Sản phẩm không tồn tại</div>;

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={32}>
        <Col xs={24} md={10}>
          <Image src={product.image} alt={product.title} width="100%" />
        </Col>
        <Col xs={24} md={14}>
          <Title level={2}>{product.title}</Title>
          <Title level={3} style={{ color: "#1890ff" }}>
            {product.price.toLocaleString()}₫
          </Title>
          <Paragraph>{product.description}</Paragraph>
          <Button type="primary" size="large">
            Thêm vào giỏ hàng
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default ProductDetail;
