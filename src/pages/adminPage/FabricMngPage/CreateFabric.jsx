import { useState } from "react";
import { Button, Card, Col, Form, Input, InputNumber, Row, Upload } from "antd";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createFabric } from "../../../service/admin";
import "./styles/CreateFabric.scss";

export default function AddFabric() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const requestData = {
        fabricName: values.fabricName,
        price: values.price,
      };

      const response = await createFabric(requestData);

      if (response?.code === 201) {
        navigate("/admin/fabric");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-fabric-container">
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      <div className="add-fabric-wrapper">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/admin/fabric")}
          className="add-fabric-back-button"
        >
          Quay lại quản lý loại vải
        </Button>

        <Card
          title="Thêm Loại vải"
          className="add-fabric-card"
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
            className="add-fabric-form"
          >
            <Row>
              <Col span={16}>
                <Form.Item
                  name="fabricName"
                  label="Loại vải"
                  rules={[
                    { required: true, message: "Vui lòng nhập loại" },
                    { min: 3, message: "Loại vải phải có ít nhất 3 ký tự" },
                    { whitespace: true, message: "Không được để trống" },
                  ]}
                >
                  <Input
                    placeholder="Nhập Loại vải"
                    maxLength={100}
                    className="add-fabric-input"
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
                    placeholder="Giá loại vải"
                    min={0.01}
                    step={0.01}
                    className="add-fabric-input"
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
                className="add-fabric-submit-btn"
              >
                Thêm Loại vải
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}
