import React, { useEffect } from "react";
import Layout from "../../components/layout/index";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { Input } from "../../components/UI/Input/index";
import {login} from "../../actions"
import { useDispatch, useSelector } from "react-redux";
import {useState} from 'react';
import { Redirect } from "react-router-dom";
import {isUserLoggedIn} from "../../actions/index"
  
const Signin = (props) => {

  const [email,setEmail] =  useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch( )

  

  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email,password
    }
    dispatch(login(user));
  }

  if(auth.authenticate){
    return <Redirect to={'/'}/>
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
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Password"
                placeholder="Password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
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
