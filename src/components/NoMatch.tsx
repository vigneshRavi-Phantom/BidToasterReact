import { Card, CardHeader, Container, Row, Col } from "reactstrap";

const NoMatch = () => {
  return (
    <Container className="mt-7" fluid>
      <Row className="justify-content-md-center">
        <Col className="mb-5 mb-xl-0 align-items-center" xl="6">
          <Card className="bg-gradient-default shadow">
            <CardHeader className="bg-transparent">
              <Row className="align-items-center">
                <div className="col">
                  <h2 className="text-white mb-0">404 Page not found.</h2>
                </div>
              </Row>
            </CardHeader>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NoMatch;
