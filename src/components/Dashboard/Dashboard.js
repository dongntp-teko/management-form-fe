// @flow
import React, { useEffect } from 'reactn';

import { Card, CardBody, Col, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';

const Dashboard = (props: Object) => {

  console.log(props)

  const { t } = useTranslation();

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
