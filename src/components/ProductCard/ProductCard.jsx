import { Card } from "antd";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

function ProductCard({ image, title, price, id }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/product-detail/${id}`);
  };

  return (
    <Card
      hoverable
      onClick={handleClick}
      style={{ width: 250, boxShadow: "0 6px 10px rgba(0, 0, 0, 0.2)" }}
      cover={
        <img
          alt={title}
          src={image}
          style={{
            height: 280,
            objectFit: "cover",
            padding: "10px",
            borderRadius: "16px",
          }}
        />
      }
    >
      <Meta
        title={title}
        description={
          <span style={{ fontWeight: "bold", color: "#f38280" }}>
            {price.toLocaleString()} VNĐ
          </span>
        }
      />
    </Card>
  );
}

export default ProductCard;
