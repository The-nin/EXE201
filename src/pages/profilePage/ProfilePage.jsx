import { Button, Card, Col, Image, Input, Row } from "antd";
import { Container } from "react-bootstrap";
import "./ProfilePage.scss";

function ProfilePage() {
  return (
    <Container className="profile_container">
      <Card className="profile_card">
        <Row className="upper_row" gutter={[16, 16]}>
          <Col className="left_col1">
            <h1 className="profile_title">My Profile</h1>

            <div className="input_field">
              <label>Username:</label>
              <Input />
            </div>

            <Input
              addonBefore="Username:"
              //   value={userData.username}
              //   onChange={(e) => handleChange("username", e.target.value)}
              style={{
                borderRadius: "10px",
                border: "1px solid #D3D3D3",
                padding: "4px 8px",
                fontSize: "16px",
                height: "40px",
              }}
            />

            <div>Email:</div>

            <div>Phone number:</div>

            <div>Address:</div>
          </Col>

          <Col className="right_col1">
            <Image
              width={180}
              height={180}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              className="avatar"
              fallback="https://res.cloudinary.com/dntcdrfiq/image/upload/u_image:upload:avatar_default_18_pk5q66/c_thumb,w_1.0,h_1.0,fl_relative.layer_apply/v1749202382/pdug2gn3mtnqrqpwdbcu.png"
            />

            <div>
              <Button>Change Password</Button>
            </div>
          </Col>
        </Row>

        <Row className="lower_row" gutter={[16, 16]}>
          <Col className="left_col2">
            <div>Gender:</div>

            <div>Date of birth:</div>
          </Col>

          <Col className="right_col2">
            <div>
              <Button>Save</Button>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default ProfilePage;
