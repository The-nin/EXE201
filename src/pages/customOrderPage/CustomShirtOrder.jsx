import React, { useState } from "react";
import "./CustomShirtOrder.scss";

function CustomShirtForm() {
  const [formData, setFormData] = useState({
    size: "",
    quantity: 0,
    description: "",
    color: "",
    categoryId: 0,
    fabricId: 0,
    image: [{ image: "" }],
    typePrintId: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Với image là mảng, xử lý riêng
    if (name.startsWith("image")) {
      const index = Number(name.split("-")[1]);
      const newImages = [...formData.image];
      newImages[index].image = value;
      setFormData({ ...formData, image: newImages });
    } else if (
      name === "quantity" ||
      name === "categoryId" ||
      name === "fabricId" ||
      name === "typePrintId"
    ) {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addImageField = () => {
    setFormData({ ...formData, image: [...formData.image, { image: "" }] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Request body to send:", formData);
    // Gửi lên API ở đây
  };

  return (
    <div className="custom-shirt-container">
      <div className="custom-shirt-card">
        <h2 className="custom-shirt-title">Custom Shirt Form</h2>
        <form className="custom-shirt-form" onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="text"
            name="size"
            placeholder="Size"
            value={formData.size}
            onChange={handleChange}
            required
          />
          <input
            className="form-input"
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            min={0}
            required
          />
          <input
            className="form-input"
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            className="form-input"
            type="text"
            name="color"
            placeholder="Color"
            value={formData.color}
            onChange={handleChange}
          />
          <input
            className="form-input"
            type="number"
            name="categoryId"
            placeholder="Category ID"
            value={formData.categoryId}
            onChange={handleChange}
            min={0}
            required
          />
          <input
            className="form-input"
            type="number"
            name="fabricId"
            placeholder="Fabric ID"
            value={formData.fabricId}
            onChange={handleChange}
            min={0}
            required
          />
          {formData.image.map((img, idx) => (
            <input
              key={idx}
              className="form-input"
              type="text"
              name={`image-${idx}`}
              placeholder="Image URL"
              value={img.image}
              onChange={handleChange}
              required
            />
          ))}
          <button
            type="button"
            className="form-upload-button"
            onClick={addImageField}
          >
            Add Image
          </button>
          <input
            className="form-input"
            type="number"
            name="typePrintId"
            placeholder="Type Print ID"
            value={formData.typePrintId}
            onChange={handleChange}
            min={0}
            required
          />
          <button type="submit" className="form-submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CustomShirtForm;
