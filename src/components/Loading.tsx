import React from 'react';

import {
  Spinner,
  Row
} from "reactstrap";

const Loading = () => {

    return (
      <Row style={{ width: "100%", height: "100vh", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Spinner animation="border" variant="dark" />
      </Row>
    );
}

export default Loading;