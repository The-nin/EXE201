import { Col, Divider, Row, Spin, Empty } from "antd";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";
import { useEffect, useState } from "react";
import { getAllProduct } from "../../service/admin";

export default function Product() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await getAllProduct();
        console.log(res);
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

      <Divider orientation="center" className="product_header">
        Sản phẩm của chúng tôi
      </Divider>

      {loading ? (
        <Spin />
      ) : !Array.isArray(products) || products?.length === 0 ? (
        <Empty description="Không có sản phẩm nào" />
      ) : (
        <Row gutter={[16, 24]} justify="center">
          {products.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
              <ProductCard
                id={product.id}
                image={product.imageThumbnail}
                title={product.productName}
                price={product.price}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
