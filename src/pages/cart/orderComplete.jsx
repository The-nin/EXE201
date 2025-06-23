import { Result, Card, Space, Button, Typography } from "antd";
import { ShoppingOutlined, TruckOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        padding: "24px",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      {/* Success Result */}
      <Card style={{ marginBottom: "24px", textAlign: "center" }}>
        <Result
          status="success"
          title="Đặt hàng thành công!"
          subTitle={
            <Space direction="vertical" size="small">
              <Text>Hân hạn được phục cụ quý khách</Text>
              <Text>
                Cảm ơn quý khách đã tin tưởng và đặt hàng tại cửa hàng chúng tôi
              </Text>
            </Space>
          }
          extra={[
            <Button
              type="primary"
              key="continue"
              icon={<ShoppingOutlined />}
              size="large"
              onClick={() => navigate("/product")}
            >
              Tiếp tục mua sắm
            </Button>,
            <Button
              key="track"
              onClick={() => navigate("/order-history")}
              icon={<TruckOutlined />}
              size="large"
            >
              Theo dõi đơn hàng
            </Button>,
          ]}
        />
      </Card>
    </div>
  );
}
