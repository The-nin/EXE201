import { Col, Divider, Row, Spin, Empty } from "antd";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";
import { useEffect, useState } from "react";
import { getAllProduct } from "../../service/user";

export default function Product() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const handleAddToCart = (product) => {
    alert(`Đã thêm "${product.title}" vào giỏ hàng!`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProduct();
        setProducts(res);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <ProductCarousel />

      <Divider orientation="center">Sản phẩm của chúng tôi</Divider>

      {loading ? (
        <Spin />
      ) : products.length === 0 ? (
        <Empty description="Không có sản phẩm nào" />
      ) : (
        <Row gutter={[16, 24]} justify="center">
          {products.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
              <ProductCard
                image={product.image}
                title={product.title}
                price={product.price}
                onAddToCart={() => handleAddToCart(product)}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
