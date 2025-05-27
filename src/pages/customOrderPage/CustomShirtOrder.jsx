import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CustomShirtOrder.scss";

function CustomShirtOrder() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [openModalPayment, setOpenModalPayment] = useState(false);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    console.log("Uploaded files:", e?.fileList);
    return e?.fileList || [];
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleUploadChange = ({ fileList }) => setFileList(fileList);

  const onFinish = (values) => {
    console.log("Dữ liệu form:", values);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenModalPayment(true);
      toast.success("Form đã được gửi, vui lòng xác nhận thanh toán");
    }, 1000); // Giả lập thời gian xử lý
  };

  const handleLater = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenModalPayment(false);
      form.resetFields();
      setFileList([]);
      toast.success("Đặt áo thành công, bạn có thể thanh toán sau");
    }, 1000); // Giả lập thời gian xử lý
  };

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenModalPayment(false);
      toast.success("Chuyển hướng đến trang thanh toán...");
    }, 1000); // Giả lập thời gian xử lý
  };

  return (
    <div className="custom-shirt-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Card
        title={<h2 className="custom-shirt-title">Đặt áo in theo yêu cầu</h2>}
        className="custom-shirt-card"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          className="custom-shirt-form"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Họ"
                rules={[
                  { required: true, message: "Vui lòng nhập họ" },
                  { min: 1, message: "Họ cần tối thiểu 1 ký tự" },
                ]}
              >
                <Input placeholder="Nhập họ của bạn" className="form-input" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="Tên"
                rules={[
                  { required: true, message: "Vui lòng nhập tên" },
                  { min: 1, message: "Tên cần tối thiểu 1 ký tự" },
                ]}
              >
                <Input placeholder="Nhập tên của bạn" className="form-input" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="shirtType"
                label="Loại áo"
                rules={[{ required: true, message: "Vui lòng chọn loại áo" }]}
              >
                <Select placeholder="Chọn loại áo" className="form-select">
                  <Select.Option value="TSHIRT">Áo thun</Select.Option>
                  <Select.Option value="POLO">Áo polo</Select.Option>
                  <Select.Option value="HOODIE">Áo hoodie</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="size"
                label="Kích thước"
                rules={[{ required: true, message: "Vui lòng chọn kích thước" }]}
              >
                <Select placeholder="Chọn kích thước" className="form-select">
                  <Select.Option value="S">S</Select.Option>
                  <Select.Option value="M">M</Select.Option>
                  <Select.Option value="L">L</Select.Option>
                  <Select.Option value="XL">XL</Select.Option>
                  <Select.Option value="XXL">XXL</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="color"
                label="Màu sắc"
                rules={[{ required: true, message: "Vui lòng chọn màu sắc" }]}
              >
                <Select placeholder="Chọn màu sắc" className="form-select">
                  <Select.Option value="WHITE">Trắng</Select.Option>
                  <Select.Option value="BLACK">Đen</Select.Option>
                  <Select.Option value="BLUE">Xanh dương</Select.Option>
                  <Select.Option value="RED">Đỏ</Select.Option>
                  <Select.Option value="GREY">Xám</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="deliveryDate"
                label="Ngày giao hàng mong muốn"
                rules={[{ required: true, message: "Vui lòng chọn ngày giao hàng" }]}
              >
                <DatePicker
                  placeholder="Chọn ngày"
                  showTime
                  disabledDate={(current) => current && current < moment().startOf("day")}
                  className="form-input"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="designDescription"
            label="Mô tả thiết kế"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả thiết kế" },
              { min: 10, message: "Mô tả cần tối thiểu 10 ký tự" },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Mô tả thiết kế áo (hình in, chữ, vị trí in, v.v.)"
              maxLength={500}
              showCount
              className="form-textarea"
            />
          </Form.Item>

          <Form.Item
            name="note"
            label="Ghi chú bổ sung"
          >
            <Input.TextArea
              rows={2}
              placeholder="Nhập ghi chú nếu có"
              maxLength={200}
              showCount
              className="form-textarea"
            />
          </Form.Item>

          <Form.Item
            name="image"
            label="Hình ảnh thiết kế"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Vui lòng tải lên ít nhất một ảnh" }]}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              fileList={fileList}
              onChange={handleUploadChange}
              multiple
              accept="image/*"
              onPreview={handlePreview}
              className="form-upload"
            >
              <Button icon={<UploadOutlined />} className="form-upload-button">
                Chọn ảnh
              </Button>
            </Upload>
          </Form.Item>

          {previewImage && (
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="form-submit-button"
            >
              Gửi đơn hàng
            </Button>
          </Form.Item>
        </Form>

        <Modal
          onCancel={() => setOpenModalPayment(false)}
          open={openModalPayment}
          footer={null}
          className="payment-modal"
        >
          <div className="payment-modal-content">
            <h2 className="payment-modal-title">Xác nhận đặt áo</h2>
            <p className="payment-modal-description">
              Bạn có thể thanh toán ngay hoặc kiểm tra đơn hàng trong trang cá nhân để thanh toán sau.
            </p>
            <div className="payment-modal-buttons">
              <Button
                onClick={handleLater}
                loading={loading}
                className="payment-modal-button-later"
              >
                Thanh toán sau
              </Button>
              <Button
                onClick={handlePayment}
                loading={loading}
                className="payment-modal-button-pay"
              >
                Thanh toán ngay
              </Button>
            </div>
          </div>
        </Modal>
      </Card>
    </div>
  );
}

export default CustomShirtOrder;