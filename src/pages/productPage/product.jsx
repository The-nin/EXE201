import React from "react";
import ProductCard from "../../components/ProductCard/ProductCard";

export default function product() {
  const handleAddToCart = () => {
    alert("Đã thêm vào giỏ!");
  };

  return (
    <div>
      <h1>Product</h1>
      <ProductCard
        image=""
        title="Áo Thun Nam Trơn"
        price={249000}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
