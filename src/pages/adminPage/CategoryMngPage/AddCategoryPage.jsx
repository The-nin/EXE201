import { useState } from "react";
import { Button, Card, Form, Input, Upload } from "antd";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./styles/AddCategory.scss";
import { createCategory } from "../../../service/admin";

export default function AddCategory() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const requestData = {
        categoryName: values.categoryName,
        description: values.description,
      };

      const response = await createCategory(requestData);

      if (response?.code === 201) {
        navigate("/admin/category");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-category-container">
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      <div className="add-category-wrapper">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/admin/category")}
          className="add-category-back-button"
        >
          Quay lại quản lý danh mục
        </Button>

        <Card
          title="Thêm Danh Mục Mới"
          className="add-category-card"
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
            className="add-category-form"
          >
            <Form.Item
              name="categoryName"
              label="Tên Danh Mục"
              rules={[
                { required: true, message: "Vui lòng nhập tên danh mục" },
                { min: 3, message: "Tên phải có ít nhất 3 ký tự" },
                { whitespace: true, message: "Tên không được để trống" },
              ]}
            >
              <Input
                placeholder="Nhập tên danh mục"
                maxLength={100}
                className="add-category-input"
              />
            </Form.Item>

            <Form.Item
              name="description"
              label="Mô tả"
              rules={[
                { required: true, message: "Vui lòng nhập mô tả" },
                { min: 10, message: "Mô tả phải có ít nhất 10 ký tự" },
              ]}
            >
              <Input.TextArea
                placeholder="Nhập mô tả danh mục"
                rows={6}
                maxLength={1000}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="add-category-submit-btn"
              >
                Thêm Danh Mục
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}
