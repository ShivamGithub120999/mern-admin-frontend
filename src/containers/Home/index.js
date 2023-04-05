import React from 'react';
import {Jumbotron,Row,Col,Container} from 'react-bootstrap';
import Layout from '../../components/layout';
import "./style.css";

const Home = () => {
  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col md={2} className="sidebar">Side bar</Col>
          <Col md={10} style={{marginLeft:"auto"}}>container</Col>
        </Row>
      </Container>
        {/* <Jumbotron className="text-center">
          <h1>Welcome to Admin Dashboard</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, atque sunt molestiae asperiores officia aspernatur dolores culpa eos unde ex obcaecati incidunt fuga ut voluptatibus harum tenetur libero autem cupiditate. Voluptatibus perferendis optio eveniet mollitia fuga numquam enim alias quidem aspernatur unde, iste ab quos nam non hic harum? Praesentium.</p>
        </Jumbotron> */}
        
    </Layout>
  )
}

export default Home