// import { useEffect, useState } from "react";
// import {
//   Button,
//   Card,
//   Form,
//   Input,
//   InputNumber,
//   Select,
//   Upload,
//   Image,
//   Col,
//   Row,
// } from "antd";
// import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
// import { ToastContainer, toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import {
//   getAllCategory,
//   getAllFabric,
//   getAllTypePrint,
//   createProduct,
// } from "../../../service/admin";
// import "./styles/AddProduct.scss";

// const { Option } = Select;

// const getBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });

// const normFile = (e) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e?.fileList;
// };

// export default function AddProduct() {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [fileListThumbnail, setFileListThumbnail] = useState([]);
//   const [fileListImages, setFileListImages] = useState([]);
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   const [fabric, setFabric] = useState([]);
//   const [typePrint, setTypePrint] = useState([]);
//   const [category, setCategory] = useState([]);

//   const navigate = useNavigate();

//   // Xử lý preview ảnh
//   const handlePreview = async (file) => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj);
//     }
//     setPreviewImage(file.url || file.preview);
//     setPreviewOpen(true);
//   };

//   const handleThumbnailChange = ({ fileList }) => {
//     setFileListThumbnail(fileList.slice(-1)); // Giới hạn 1 ảnh
//   };

//   const handleImagesChange = ({ fileList }) => {
//     setFileListImages(fileList);
//   };

//   useEffect(() => {
//     const fetchFabrics = async () => {
//       try {
//         const res = await getAllFabric();
//         console.log(res);
//         setFabric(res);
//       } catch (error) {
//         console.error("Lỗi khi gọi API:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFabrics();
//   }, []);

//   useEffect(() => {
//     const fetchCategory = async () => {
//       try {
//         const res = await getAllCategory();
//         console.log(res);
//         setCategory(res);
//       } catch (error) {
//         console.error("Lỗi khi gọi API:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategory();
//   }, []);

//   useEffect(() => {
//     const fetchTypes = async () => {
//       try {
//         const res = await getAllTypePrint();
//         console.log(res);
//         setTypePrint(res);
//       } catch (error) {
//         console.error("Lỗi khi gọi API:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTypes();
//   }, []);

//   // const onFinish = async (values) => {
//   //   console.log("Received values of form:", values);

//   //   try {
//   //     setLoading(true);

//   //     const uploadImage = async (file) => {
//   //       return URL.createObjectURL(file.originFileObj);
//   //     };

//   //     let imageThumbnailUrl = "";
//   //     if (fileListThumbnail.length > 0) {
//   //       imageThumbnailUrl = await uploadImage(fileListThumbnail[0]);
//   //     }

//   //     const imageUrls = await Promise.all(
//   //       fileListImages.map(async (file) => ({
//   //         url: await uploadImage(file),
//   //       }))
//   //     );

//   //     const requestData = {
//   //       productName: values.productName,
//   //       price: values.price,
//   //       description: values.description,
//   //       imageThumbnail: imageThumbnailUrl,
//   //       size: values.size,
//   //       categoryId: values.categoryId,
//   //       typePrintId: values.typePrintId,
//   //       fabricId: values.fabricId,
//   //       images: imageUrls,
//   //     };

//   //     const response = await createProduct(requestData);

//   //     if (response?.code === 201) {
//   //       toast.success("Thêm sản phẩm thành công!");
//   //       navigate("/admin/product");
//   //     } else {
//   //       toast.error("Thêm sản phẩm thất bại!");
//   //     }
//   //   } catch (error) {
//   //     toast.error("Lỗi khi thêm sản phẩm!");
//   //     console.log("error", error);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const onFinish = async (values) => {
//     console.log("Received values of form:", values);

//     try {
//       setLoading(true);

//       // Kiểm tra các trường bắt buộc
//       if (!values.categoryId || isNaN(values.categoryId)) {
//         throw new Error("Vui lòng chọn danh mục hợp lệ");
//       }
//       if (!values.fabricId || isNaN(values.fabricId)) {
//         throw new Error("Vui lòng chọn loại vải hợp lệ");
//       }
//       if (!values.typePrintId || isNaN(values.typePrintId)) {
//         throw new Error("Vui lòng chọn kiểu in hợp lệ");
//       }
//       if (!values.color) {
//         throw new Error("Vui lòng nhập màu sắc");
//       }

//       // Hàm upload giả lập (giữ nguyên)
//       const uploadImage = async (file) => {
//         return URL.createObjectURL(file.originFileObj);
//       };

//       // Upload imageThumbnail
//       let imageThumbnailUrl = "";
//       if (fileListThumbnail.length > 0) {
//         imageThumbnailUrl = await uploadImage(fileListThumbnail[0]);
//       }

//       // Upload images
//       const imageUrls = await Promise.all(
//         fileListImages.map(async (file) => ({
//           image: await uploadImage(file), // Đổi key từ "url" thành "image"
//         }))
//       );

//       // Xử lý sizes
//       const sizes = values.size.map((s) => ({ size: s }));

//       // Định dạng dữ liệu theo Swagger
//       const requestData = {
//         productName: values.productName,
//         price: parseFloat(values.price),
//         description: values.description,
//         imageThumbnail: imageThumbnailUrl,
//         sizes: sizes.length > 0 ? sizes : [{ size: "Unknown" }], // Đảm bảo có ít nhất 1 size
//         categoryId: parseInt(values.categoryId),
//         color: values.color,
//         fabricId: parseInt(values.fabricId),
//         typePrintId: parseInt(values.typePrintId),
//         images: imageUrls,
//       };

//       console.log("Request data:", requestData); // Debug dữ liệu gửi đi

//       const response = await createProduct(requestData);
//       console.log("API Response:", response); // Debug response

//       if (response?.code === 201 || response?.status === 201) {
//         toast.success("Thêm sản phẩm thành công", {
//           onClose: () => navigate("/admin/product"), // Navigate sau khi toast đóng
//         });
//       } else {
//         toast.error(response?.message || "Thêm sản phẩm thất bại!");
//       }
//     } catch (error) {
//       console.error("Lỗi khi thêm sản phẩm:", error);
//       toast.error(error.message || "Lỗi khi thêm sản phẩm!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="add-product-container">
//       {/* <ToastContainer position="top-right" autoClose={3000} theme="light" /> */}

//       <div className="add-product-wrapper">
//         <Button
//           icon={<ArrowLeftOutlined />}
//           onClick={() => navigate("/admin/product")}
//           className="add-product-back-button"
//         >
//           Quay lại quản lý sản phẩm
//         </Button>

//         <Card
//           title="Thêm Sản Phẩm Mới"
//           className="add-product-card"
//           styles={{
//             header: {
//               fontSize: "1.5rem",
//               fontWeight: "bold",
//               borderBottom: "2px solid #f0f0f0",
//             },
//           }}
//         >
//           <Form
//             form={form}
//             layout="vertical"
//             onFinish={onFinish}
//             autoComplete="off"
//             className="add-product-form"
//           >
//             <Row gutter={12}>
//               <Col span={12}>
//                 <Form.Item
//                   name="productName"
//                   label="Tên Sản Phẩm"
//                   rules={[
//                     { required: true, message: "Vui lòng nhập tên sản phẩm" },
//                     { min: 3, message: "Tên phải có ít nhất 3 ký tự" },
//                     { whitespace: true, message: "Tên không được để trống" },
//                   ]}
//                 >
//                   <Input
//                     placeholder="Nhập tên sản phẩm"
//                     maxLength={100}
//                     className="add-product-input"
//                   />
//                 </Form.Item>
//               </Col>

//               <Col span={12}>
//                 <Form.Item
//                   name="color"
//                   label="Màu sắc"
//                   rules={[{ required: true, message: "Vui lòng nhập màu sắc" }]}
//                 >
//                   <Input
//                     placeholder="Nhập màu sắc"
//                     className="add-product-input"
//                   />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Form.Item
//               name="description"
//               label="Mô tả"
//               rules={[
//                 { required: true, message: "Vui lòng nhập mô tả" },
//                 { min: 10, message: "Mô tả phải có ít nhất 10 ký tự" },
//               ]}
//             >
//               <Input.TextArea
//                 placeholder="Nhập mô tả sản phẩm"
//                 rows={6}
//                 maxLength={1000}
//               />
//             </Form.Item>

//             <Row gutter={12}>
//               <Col span={8}>
//                 <Form.Item
//                   name="size"
//                   label="Kích Thước"
//                   rules={[
//                     { required: true, message: "Vui lòng chọn kích thước" },
//                   ]}
//                 >
//                   <Select
//                     placeholder="Chọn kích thước"
//                     className="add-product-input"
//                     mode="multiple"
//                     allowClear
//                   >
//                     <Select.Option value="S">S</Select.Option>
//                     <Select.Option value="M">M</Select.Option>
//                     <Select.Option value="L">L</Select.Option>
//                     <Select.Option value="XL">XL</Select.Option>
//                   </Select>
//                 </Form.Item>
//               </Col>

//               <Col span={8}>
//                 <Form.Item
//                   name="typePrintId"
//                   label="Kiểu in"
//                   rules={[
//                     { required: true, message: "Vui lòng chọn kích thước" },
//                   ]}
//                 >
//                   <Select
//                     placeholder="Chọn kiểu in"
//                     className="add-product-input"
//                     options={
//                       typePrint && typePrint.length > 0
//                         ? typePrint.map((typePrint) => ({
//                             label: typePrint.printName,
//                             value: typePrint.id,
//                           }))
//                         : []
//                     }
//                   />
//                 </Form.Item>
//               </Col>

//               <Col span={8}>
//                 <Form.Item
//                   name="fabricId"
//                   label="Loại vải"
//                   rules={[
//                     {
//                       required: true,
//                       message: "Vui lòng chọn loại vải chọn loại vải",
//                     },
//                   ]}
//                 >
//                   <Select
//                     placeholder="Chọn loại vải"
//                     className="add-product-input"
//                     options={
//                       fabric && fabric.length > 0
//                         ? fabric.map((fabric) => ({
//                             label: fabric.fabricName,
//                             value: fabric.id,
//                           }))
//                         : []
//                     }
//                   />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Row gutter={12}>
//               <Col span={12}>
//                 <Form.Item
//                   name="price"
//                   label="Giá"
//                   rules={[
//                     { required: true, message: "Vui lòng nhập giá sản phẩm" },
//                     {
//                       type: "number",
//                       min: 0,
//                       message: "Giá phải lớn hơn hoặc bằng 0",
//                     },
//                   ]}
//                 >
//                   <InputNumber
//                     placeholder="Giá loại vải"
//                     min={0.01}
//                     step={0.01}
//                     style={{ width: "100%" }}
//                     className="add-product-input"
//                     formatter={(value) =>
//                       `Đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
//                     }
//                     parser={(value) => value.replace(/Đ\s?|(,*)/g, "")}
//                   />
//                 </Form.Item>
//               </Col>

//               <Col span={12}>
//                 <Form.Item
//                   name="categoryId"
//                   label="Danh Mục"
//                   rules={[
//                     { required: true, message: "Vui lòng nhập danh mục" },
//                     {
//                       type: "number",
//                       min: 1,
//                       message: "ID danh mục phải là số dương",
//                     },
//                   ]}
//                 >
//                   <Select
//                     placeholder="Chọn danh mục"
//                     className="add-product-input"
//                     options={
//                       category && category.length > 0
//                         ? category.map((category) => ({
//                             label: category.categoryName,
//                             value: category.id,
//                           }))
//                         : []
//                     }
//                   />
//                 </Form.Item>
//               </Col>
//             </Row>

//             <Form.Item
//               name="imageThumbnail"
//               label="Hình Ảnh Đại Diện"
//               valuePropName="fileList"
//               getValueFromEvent={normFile}
//               rules={[
//                 {
//                   required: true,
//                   message: "Vui lòng tải lên hình ảnh đại diện",
//                 },
//               ]}
//             >
//               <Upload
//                 listType="picture"
//                 beforeUpload={() => false}
//                 fileList={fileListThumbnail}
//                 onChange={handleThumbnailChange}
//                 onPreview={handlePreview}
//                 maxCount={1}
//                 accept="image/*"
//                 className="upload-list-inline"
//               >
//                 <Button icon={<UploadOutlined />} className="rounded-md h-12">
//                   Chọn ảnh đại diện
//                 </Button>
//               </Upload>
//             </Form.Item>

//             <Form.Item
//               name="images"
//               label="Danh Sách Hình Ảnh Sản Phẩm"
//               valuePropName="fileList"
//               getValueFromEvent={normFile}
//               rules={[{ required: false }]}
//             >
//               <Upload
//                 listType="picture"
//                 beforeUpload={() => false}
//                 fileList={fileListImages}
//                 onChange={handleImagesChange}
//                 onPreview={handlePreview}
//                 multiple
//                 accept="image/*"
//                 className="upload-list-inline"
//               >
//                 <Button icon={<UploadOutlined />} className="rounded-md h-12">
//                   Chọn ảnh sản phẩm
//                 </Button>
//               </Upload>
//             </Form.Item>

//             <Form.Item>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 loading={loading}
//                 className="add-product-submit-btn"
//               >
//                 Thêm Sản Phẩm
//               </Button>
//             </Form.Item>
//           </Form>
//         </Card>

//         {previewImage && (
//           <Image
//             wrapperStyle={{ display: "none" }}
//             preview={{
//               visible: previewOpen,
//               onVisibleChange: (visible) => setPreviewOpen(visible),
//               afterOpenChange: (visible) => !visible && setPreviewImage(""),
//             }}
//             src={previewImage}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Image,
  Col,
  Row,
  message,
} from "antd";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { uploadToCloudinary } from "../../../service/cloundinary/index";
import {
  getAllCategory,
  getAllFabric,
  getAllTypePrint,
  createProduct,
} from "../../../service/admin";
import "./styles/AddProduct.scss";

const { Option } = Select;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function AddProduct() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileListThumbnail, setFileListThumbnail] = useState([]);
  const [fileListImages, setFileListImages] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fabric, setFabric] = useState([]);
  const [typePrint, setTypePrint] = useState([]);
  const [category, setCategory] = useState([]);

  const navigate = useNavigate();

  // Xử lý preview ảnh
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleThumbnailChange = ({ fileList }) => {
    setFileListThumbnail(fileList.slice(-1));
  };

  const handleImagesChange = ({ fileList }) => {
    setFileListImages(fileList);
  };

  useEffect(() => {
    const fetchFabrics = async () => {
      try {
        const res = await getAllFabric();
        console.log("Fabrics:", res);
        setFabric(res);
      } catch (error) {
        console.error("Lỗi khi gọi API fabric:", error);
      }
    };

    fetchFabrics();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await getAllCategory();
        console.log("Categories:", res);
        setCategory(res);
      } catch (error) {
        console.error("Lỗi khi gọi API category:", error);
      }
    };

    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await getAllTypePrint();
        console.log("TypePrints:", res);
        setTypePrint(res);
      } catch (error) {
        console.error("Lỗi khi gọi API typePrint:", error);
      }
    };

    fetchTypes();
  }, []);

  const onFinish = async (values) => {
    console.log("Received values of form:", values);

    try {
      setLoading(true);
      message.loading({ content: "Đang xử lý...", key: "addProduct" });

      // 🔧 Validate required fields với kiểu dữ liệu chính xác
      if (!values.categoryId) {
        throw new Error("Vui lòng chọn danh mục");
      }
      if (!values.fabricId) {
        throw new Error("Vui lòng chọn loại vải");
      }
      if (!values.typePrintId) {
        throw new Error("Vui lòng chọn kiểu in");
      }
      if (!values.color || values.color.trim() === "") {
        throw new Error("Vui lòng nhập màu sắc");
      }
      if (!values.productName || values.productName.trim() === "") {
        throw new Error("Vui lòng nhập tên sản phẩm");
      }
      if (!values.description || values.description.trim() === "") {
        throw new Error("Vui lòng nhập mô tả");
      }
      if (!values.price || values.price <= 0) {
        throw new Error("Vui lòng nhập giá hợp lệ");
      }
      if (!values.size || values.size.length === 0) {
        throw new Error("Vui lòng chọn ít nhất một kích thước");
      }

      // Upload imageThumbnail to Cloudinary
      let imageThumbnailUrl = "";
      if (fileListThumbnail.length > 0) {
        try {
          message.loading({
            content: "Đang upload ảnh đại diện...",
            key: "uploadThumbnail",
          });
          imageThumbnailUrl = await uploadToCloudinary(
            fileListThumbnail[0].originFileObj
          );
          message.success({
            content: "Upload ảnh đại diện thành công!",
            key: "uploadThumbnail",
          });
        } catch (error) {
          message.error({
            content: "Lỗi upload ảnh đại diện",
            key: "uploadThumbnail",
          });
          throw new Error("Lỗi upload ảnh đại diện");
        }
      } else {
        throw new Error("Vui lòng chọn ảnh đại diện");
      }

      // Upload images to Cloudinary
      const imageUrls = [];
      if (fileListImages.length > 0) {
        try {
          message.loading({
            content: "Đang upload ảnh sản phẩm...",
            key: "uploadImages",
          });

          for (const file of fileListImages) {
            const url = await uploadToCloudinary(file.originFileObj);
            imageUrls.push({ image: url });
          }

          message.success({
            content: "Upload ảnh sản phẩm thành công!",
            key: "uploadImages",
          });
        } catch (error) {
          message.error({
            content: "Lỗi upload ảnh sản phẩm",
            key: "uploadImages",
          });
          throw new Error("Lỗi upload ảnh sản phẩm");
        }
      }

      // 🔧 Process sizes theo đúng format backend expects
      const sizes = values.size.map((s) => ({ size: s }));

      // 🔧 Định dạng dữ liệu CHÍNH XÁC theo backend ProductCreateRequest
      const requestData = {
        productName: String(values.productName).trim(), // String
        price: Number(values.price), // Double (sẽ được convert thành Double ở backend)
        description: String(values.description).trim(), // String
        imageThumbnail: String(imageThumbnailUrl), // String
        sizes: sizes, // List<SizeRequest> với {size: String}
        categoryId: Number(values.categoryId), // Long (JavaScript number sẽ được convert)
        color: String(values.color).trim(), // String
        fabricId: Number(values.fabricId), // Long
        typePrintId: Number(values.typePrintId), // Long
        images: imageUrls, // List<ImageRequest> với {image: String}
      };

      console.log("🚀 Request data (matching backend):", requestData);

      // 🔧 Gọi API với headers chính xác
      const response = await createProduct(requestData);
      console.log("✅ API Response:", response);

      if (response?.code === 201 || response?.status === 201) {
        message.success({
          content: "Thêm sản phẩm thành công!",
          key: "addProduct",
          duration: 2,
        });

        // Reset form và navigate
        form.resetFields();
        setFileListThumbnail([]);
        setFileListImages([]);

        setTimeout(() => {
          navigate("/admin/product");
        }, 1000);
      } else {
        message.error({
          content: response?.message || "Thêm sản phẩm thất bại!",
          key: "addProduct",
        });
      }
    } catch (error) {
      console.error("❌ Lỗi khi thêm sản phẩm:", error);
      message.error({
        content: error.message || "Lỗi khi thêm sản phẩm!",
        key: "addProduct",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-container">
      <div className="add-product-wrapper">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/admin/product")}
          className="add-product-back-button"
        >
          Quay lại quản lý sản phẩm
        </Button>

        <Card
          title="Thêm Sản Phẩm Mới"
          className="add-product-card"
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
            className="add-product-form"
          >
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  name="productName"
                  label="Tên Sản Phẩm"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên sản phẩm" },
                    { min: 3, message: "Tên phải có ít nhất 3 ký tự" },
                    { whitespace: true, message: "Tên không được để trống" },
                  ]}
                >
                  <Input
                    placeholder="Nhập tên sản phẩm"
                    maxLength={100}
                    className="add-product-input"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="color"
                  label="Màu sắc"
                  rules={[{ required: true, message: "Vui lòng nhập màu sắc" }]}
                >
                  <Input
                    placeholder="Nhập màu sắc"
                    className="add-product-input"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="description"
              label="Mô tả"
              rules={[
                { required: true, message: "Vui lòng nhập mô tả" },
                { min: 10, message: "Mô tả phải có ít nhất 10 ký tự" },
              ]}
            >
              <Input.TextArea
                placeholder="Nhập mô tả sản phẩm"
                rows={6}
                maxLength={1000}
              />
            </Form.Item>

            <Row gutter={12}>
              <Col span={8}>
                <Form.Item
                  name="size"
                  label="Kích Thước"
                  rules={[
                    { required: true, message: "Vui lòng chọn kích thước" },
                  ]}
                >
                  <Select
                    placeholder="Chọn kích thước"
                    className="add-product-input"
                    mode="multiple"
                    allowClear
                  >
                    <Select.Option value="S">S</Select.Option>
                    <Select.Option value="M">M</Select.Option>
                    <Select.Option value="L">L</Select.Option>
                    <Select.Option value="XL">XL</Select.Option>
                    <Select.Option value="XXL">XXL</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name="typePrintId"
                  label="Kiểu in"
                  rules={[{ required: true, message: "Vui lòng chọn kiểu in" }]}
                >
                  <Select
                    placeholder="Chọn kiểu in"
                    className="add-product-input"
                  >
                    {typePrint && typePrint.length > 0 ? (
                      typePrint.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.printName}
                        </Option>
                      ))
                    ) : (
                      <Option disabled>Đang tải...</Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name="fabricId"
                  label="Loại vải"
                  rules={[
                    { required: true, message: "Vui lòng chọn loại vải" },
                  ]}
                >
                  <Select
                    placeholder="Chọn loại vải"
                    className="add-product-input"
                  >
                    {fabric && fabric.length > 0 ? (
                      fabric.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.fabricName}
                        </Option>
                      ))
                    ) : (
                      <Option disabled>Đang tải...</Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  name="price"
                  label="Giá"
                  rules={[
                    { required: true, message: "Vui lòng nhập giá sản phẩm" },
                    {
                      type: "number",
                      min: 0.01,
                      message: "Giá phải lớn hơn 0",
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="Giá sản phẩm"
                    min={0.01}
                    step={1000}
                    style={{ width: "100%" }}
                    className="add-product-input"
                    formatter={(value) =>
                      `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/₫\s?|(,*)/g, "")}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="categoryId"
                  label="Danh Mục"
                  rules={[
                    { required: true, message: "Vui lòng chọn danh mục" },
                  ]}
                >
                  <Select
                    placeholder="Chọn danh mục"
                    className="add-product-input"
                  >
                    {category && category.length > 0 ? (
                      category.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.categoryName}
                        </Option>
                      ))
                    ) : (
                      <Option disabled>Đang tải...</Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="imageThumbnail"
              label="Hình Ảnh Đại Diện"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[
                {
                  required: true,
                  message: "Vui lòng tải lên hình ảnh đại diện",
                },
              ]}
            >
              <Upload
                listType="picture"
                beforeUpload={(file) => {
                  const isLt5M = file.size / 1024 / 1024 < 5;
                  if (!isLt5M) {
                    message.error("Ảnh phải nhỏ hơn 5MB!");
                  }
                  return false;
                }}
                fileList={fileListThumbnail}
                onChange={handleThumbnailChange}
                onPreview={handlePreview}
                maxCount={1}
                accept="image/*"
                className="upload-list-inline"
              >
                <Button icon={<UploadOutlined />} className="rounded-md h-12">
                  Chọn ảnh đại diện
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item
              name="images"
              label="Danh Sách Hình Ảnh Sản Phẩm"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                listType="picture"
                beforeUpload={(file) => {
                  const isLt5M = file.size / 1024 / 1024 < 5;
                  if (!isLt5M) {
                    message.error("Ảnh phải nhỏ hơn 5MB!");
                  }
                  return false;
                }}
                fileList={fileListImages}
                onChange={handleImagesChange}
                onPreview={handlePreview}
                multiple
                accept="image/*"
                className="upload-list-inline"
              >
                <Button icon={<UploadOutlined />} className="rounded-md h-12">
                  Chọn ảnh sản phẩm
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="add-product-submit-btn"
              >
                Thêm Sản Phẩm
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {previewImage && (
          <Image
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage || "/placeholder.svg"}
          />
        )}
      </div>
    </div>
  );
}
