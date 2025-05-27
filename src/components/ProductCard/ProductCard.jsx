import React from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

function ProductCard({ image, title, price, slug, id }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${slug}`);
  };

  return (
    <Card
      hoverable
      onClick={handleClick}
      style={{ width: 250 }}
      cover={
        <img
          alt={title}
          src={image}
          style={{ height: 280, objectFit: "cover" }}
        />
      }
    >
      <Meta
        title={title}
        description={
          <span style={{ fontWeight: "bold", color: "#1890ff" }}>
            {price.toLocaleString()}₫
          </span>
        }
      />
    </Card>
  );
}

export default ProductCard;
