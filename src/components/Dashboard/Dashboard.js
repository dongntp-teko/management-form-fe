// @flow
import React, { useEffect } from 'reactn';

import { Card, CardBody, Col, Row } from 'reactstrap';

const Dashboard = (props: Object) => {

  console.log(props)


  useEffect(() => {
    document.title = props.title;
  });
  return (
    <Row>
      <Col>
        <Card>
          <CardBody>
            <span className="h2">Welcome!</span>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;
