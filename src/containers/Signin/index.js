import React from "react";
import Layout from "../../components/layout/index";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { Input } from "../../components/UI/Input/index";
import {login} from "../../actions"
import { useDispatch } from "react-redux";

const Signin = (props) => {

  const dispatch = useDispatch( )

  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email:'ramesh@gmail.com',
      password:'ramesh@1231'
    }
    dispatch(login(user));
  }
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}>
              <Input
                label="Email"
                placeholder="Email"
                value=""
                type="email"
                onChange={() => {}}
              />

              <Input
                label="Password"
                placeholder="Password"
                value=""
                type="password"
                onChange={() => {}}
              /> 
              
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signin;
