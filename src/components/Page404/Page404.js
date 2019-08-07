import React from 'react';
import { Col, Container, Row } from 'reactstrap';

const Page404 = () => (
  <div className="app flex-row align-items-center">
    <Container>
      <Row className="justify-content-center">
        <Col md="6">
          <div className="clearfix">
            <h1 className="float-left display-3 mr-4">404</h1>
            <h4 className="pt-3">Oops!</h4>
            <p className="text-muted float-left">
              Trang bạn đang tìm kiếm không tồn tại
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Page404;
