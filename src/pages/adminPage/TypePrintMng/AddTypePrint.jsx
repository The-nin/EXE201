import { useState } from "react";
import { Button, Card, Col, Form, Input, InputNumber, Row, Upload } from "antd";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addTypePrint } from "../../../service/admin";
import "./styles/AddTypePrint.scss";

export default function AddTypePrint() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const requestData = {
        name: values.name,
        price: values.price,
      };

      const response = await addTypePrint(requestData);

      if (response?.code === 201) {
        navigate("/admin/type-print");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-type-container">
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      <div className="add-type-wrapper">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/admin/type-print")}
          className="add-type-back-button"
        >
          Quay lại quản lý kiểu in
        </Button>

        <Card
          title="Thêm kiểu in"
          className="add-type-card"
          styles={{
            header: {
              fontSize: "1.5rem",
              fontWeight: "bold",
              borderBottom: "2px solid #f0f0f0",
            },
          }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            className="add-type-form"
          >
            <Row>
              <Col span={16}>
                <Form.Item
                  name="name"
                  label="Kiểu in"
                  rules={[
                    { required: true, message: "Vui lòng nhập kiểu in" },
                    { min: 3, message: "Kiểu in phải có ít nhất 3 ký tự" },
                    { whitespace: true, message: "Không được để trống" },
                  ]}
                >
                  <Input
                    placeholder="Nhập kiểu in"
                    maxLength={100}
                    className="add-type-input"
                  />
                </Form.Item>
              </Col>

              <Col span={8} style={{ paddingLeft: "20px" }}>
                <Form.Item
                  name="price"
                  label="Giá"
                  rules={[{ required: true, message: "Vui lòng nhập giá" }]}
                >
                  <InputNumber
                    placeholder="Giá loại loại in"
                    min={0.01}
                    step={0.01}
                    className="add-type-input"
                    formatter={(value) =>
                      `Đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/Đ\s?|(,*)/g, "")}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="add-type-submit-btn"
              >
                Thêm Kiểu in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}
