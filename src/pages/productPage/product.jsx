import { Col, Divider, Row, Spin, Empty, Pagination } from "antd";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";
import { useEffect, useState } from "react";
import { getAllProduct } from "../../service/admin";
import { Container } from "react-bootstrap";

export default function Product() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
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

  // Tính toán sản phẩm cho trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div
      style={{
        padding: "24px",
        minHeight: "100vh",
        backgroundColor: "#fffaf3",
      }}
    >
      <ProductCarousel />

      <Divider orientation="center" className="product_header">
        Sản phẩm của chúng tôi
      </Divider>

      {loading ? (
        <div style={{ textAlign: "center", marginTop: 50 }}>
          <Spin size="large" />
        </div>
      ) : !Array.isArray(currentProducts) || currentProducts?.length === 0 ? (
        <Empty description="Không có sản phẩm nào" />
      ) : (
        <>
          <Container>
            <Row gutter={[16, 24]}>
              {currentProducts?.map((product) => (
                <Col key={product.id} xs={24} sm={12} md={6} lg={6}>
                  <ProductCard
                    id={product.id}
                    image={product.imageThumbnail}
                    title={product.productName}
                    price={product.price}
                  />
                </Col>
              ))}
            </Row>

            <div
              style={{
                marginTop: 40,
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination
                current={currentPage}
                total={products.length}
                pageSize={itemsPerPage}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
              />
            </div>
          </Container>
        </>
      )}
    </div>
  );
}
