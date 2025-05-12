import React from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { CiUser } from "react-icons/ci";
import { GoLock } from "react-icons/go";
import login from "./styles/login.module.scss";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function LoginPage() {
  return (
    <Container fluid>
      <div className={login["container"]}>
        <div className={login["login-form-container"]}>
          <h2 className={login["title"]}>
            WELCOME TO <br />
            ICOT!
          </h2>
          <div className={login["login-form"]}>
            <Form>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <CiUser />
                  </InputGroup.Text>
                  <Form.Control type="text" placeholder="Enter Username" />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <GoLock />
                  </InputGroup.Text>
                  <Form.Control
                    size="lg"
                    type="password"
                    placeholder="Enter Password"
                  />
                </InputGroup>
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default LoginPage;
