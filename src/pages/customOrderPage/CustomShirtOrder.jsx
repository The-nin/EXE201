import React, { useEffect, useState } from "react";
import {
  getAllCategory,
  getAllFabric,
  getAllTypePrint,
  getAddressByUser,
} from "../../service/admin";
import { bookOrder, paymentBookOrder } from "../../service/user";

function CustomShirtForm() {
  const [formData, setFormData] = useState({
    size: "S",
    quantity: 1,
    description: "",
    color: "#ffffff",
    categoryId: "",
    fabricId: "",
    image: [],
    typePrintId: "",
    addressId: "",
  });

  const [categories, setCategories] = useState([]);
  const [fabrics, setFabrics] = useState([]);
  const [address, setAddress] = useState([]);
  const [typePrints, setTypePrints] = useState([]);
  const [error, setError] = useState("");
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [newOrderId, setNewOrderId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await getAllCategory();
        setCategories(catRes || []);

        const fabRes = await getAllFabric();
        setFabrics(fabRes || []);

        const printRes = await getAllTypePrint();
        setTypePrints(printRes || []);

        const addressRes = await getAddressByUser();
        const data = Array.isArray(addressRes)
          ? addressRes
          : addressRes?.result || addressRes?.data || [];

        setAddress(data);

        const defaultAddress = data.find((addr) => addr.isDefault);
        if (defaultAddress) {
          setFormData((prev) => ({ ...prev, addressId: defaultAddress.id }));
        }
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu:", err);
        setAddress([]);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files?.length > 0) {
      const fileList = Array.from(files).map((file) => ({
        image: URL.createObjectURL(file),
        file,
      }));
      setFormData((prev) => ({ ...prev, image: fileList }));
    } else if (
      [
        "quantity",
        "categoryId",
        "fabricId",
        "typePrintId",
        "addressId",
      ].includes(name)
    ) {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsApiLoading(true);
    setError("");

    try {
      const payload = {
        ...formData,
        image: (formData.image || []).map((img) => ({ image: img.image })),
      };

      const response = await bookOrder(payload);

      if (response.code === 201) {
        setNewOrderId(response.result.id);
        // setNewOrderId(6);
        console.log(response.result.id);
        console.log(newOrderId);
        setShowPaymentModal(true);
        console.log(newOrderId);
      } else {
        setError(response?.message || "Đặt hàng thất bại.");
      }
    } catch (err) {
      setError(err.response?.message || "Lỗi không xác định");
    } finally {
      setIsApiLoading(false);
    }
  };

  const handlePaymentConfirm = async () => {
    if (!newOrderId) return;

    setShowPaymentModal(false);

    try {
      const paymentRes = await paymentBookOrder(14, 50000);

      if (paymentRes?.code === 200 || paymentRes?.status === 200) {
        alert("Thanh toán thành công!");

        const checkoutUrl = paymentRes?.result?.checkoutUrl;

        if (checkoutUrl) {
          window.location.href = checkoutUrl;
        } else {
          console.warn("Không có checkoutUrl trong phản hồi");
          alert("Không tìm thấy link thanh toán.");
        }
      } else {
        alert("Thanh toán thất bại.");
      }
    } catch (err) {
      console.error("Lỗi khi thanh toán:", err);
      alert("Đã xảy ra lỗi khi thanh toán.");
    }

    setNewOrderId(null);
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="card shadow-sm">
        <div className="card-body pb-4">
          <h4 className="text-center mb-4">Đặt Áo Thun Theo Yêu Cầu</h4>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Kích cỡ</label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="form-select"
                >
                  {["S", "M", "L", "XL", "XXL"].map((sz) => (
                    <option key={sz} value={sz}>
                      {sz}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Số lượng</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="form-control"
                  min={1}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Danh mục</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Loại vải</label>
                <select
                  name="fabricId"
                  value={formData.fabricId}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">-- Chọn loại vải --</option>
                  {fabrics.map((fab) => (
                    <option key={fab.id} value={fab.id}>
                      {fab.fabricName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Loại in</label>
                <select
                  name="typePrintId"
                  value={formData.typePrintId}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">-- Chọn loại in --</option>
                  {typePrints.map((tp) => (
                    <option key={tp.id} value={tp.id}>
                      {tp.printName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Màu sắc</label>
                <input
                  type="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="form-control form-control-color"
                />
              </div>

              <div className="col-12">
                <label className="form-label">Địa chỉ giao hàng</label>
                {address.length > 0 ? (
                  <div className="list-group">
                    {address.map((addr) => (
                      <label
                        key={addr.id}
                        className="list-group-item border rounded p-3 mb-2"
                        style={{ cursor: "pointer" }}
                      >
                        <div className="d-flex align-items-start">
                          <input
                            className="form-check-input me-3 mt-1"
                            type="radio"
                            name="addressId"
                            value={addr.id}
                            checked={formData.addressId === addr.id}
                            onChange={handleChange}
                            required
                          />
                          <div className="w-100">
                            <strong>{addr.name}</strong>
                            {addr.isDefault && (
                              <span className="badge bg-success ms-2">
                                Mặc định
                              </span>
                            )}
                            <div>{addr.phone}</div>
                            <div>
                              {addr.addressLine}, {addr.ward}, {addr.district},{" "}
                              {addr.city}
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="form-text text-muted mt-1">
                    Không thể tải danh sách địa chỉ. Vui lòng thử lại sau.
                  </div>
                )}
              </div>

              <div className="col-12">
                <label className="form-label">Mô tả thiết kế</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control"
                  rows={2}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Tải ảnh thiết kế</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  multiple
                  onChange={handleChange}
                  className="form-control"
                />
                {Array.isArray(formData.image) && formData.image.length > 0 && (
                  <div className="mt-3 d-flex flex-wrap gap-3">
                    {formData.image.map((img, idx) => (
                      <div key={idx} className="text-center">
                        <img
                          src={img.image}
                          alt={`Ảnh ${idx + 1}`}
                          style={{ width: 100, height: "auto" }}
                        />
                        <div className="small">{img.file?.name}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="col-12 mt-4">
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isApiLoading}
                >
                  {isApiLoading ? "Đang gửi..." : "Gửi đơn đặt hàng"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Modal xác nhận thanh toán */}
      {showPaymentModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Xác nhận thanh toán</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowPaymentModal(false)}
                />
              </div>
              <div className="modal-body">
                <p>Bạn có muốn thanh toán đơn hàng ngay bây giờ không?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowPaymentModal(false)}
                >
                  Đóng
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handlePaymentConfirm}
                >
                  Thanh toán ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomShirtForm;
