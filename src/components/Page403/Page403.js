import React from 'react';
import { Col, Container, Row } from 'reactstrap';

const Page403 = () => (
  <div className="app flex-row align-items-center">
    <Container>
      <Row className="justify-content-center">
        <Col md="6">
          <div className="clearfix">
            <h1 className="float-left display-3 mr-4">403</h1>
            <h4 className="pt-3">Permission denied</h4>
            <p className="text-muted float-left">
              You do not have permission to view page.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Page403;
