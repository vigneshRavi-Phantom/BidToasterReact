import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "reactstrap";

function HomeHeader() {
  return (
    <>
      <div className="home-header bg-info pt-5 pb-7">
        <Container>
          <div className="header-body">
            <Row className="align-items-center">
              <Col lg="5">
                <div className="pr-5">
                  <h1 className="display-2 text-white font-weight-bold mb-0">
                  Run RFQs Most efficiently Now
                  </h1>
                  <p className="text-white mt-4 fw-500">
                  We are up with the easiest and most demanding SAAS-based solution to help you with the creation of an RFQ, enlisting vendors, comparing quotes, and awarding contracts
                  </p>
                  <div className="mt-5">
                    <Button
                      className="btn-neutral my-2"
                      color="default"
                      to="/rfq"
                      tag={Link}
                    >
                      Explore Dashboard
                    </Button>
                  </div>
                </div>
              </Col>
              <Col lg="7">
                <img alt="" src={require("assets/img/apple-orange.svg").default} />
              </Col>
            </Row>
          </div>
        </Container>
        <div className="separator separator-bottom separator-skew zindex-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon className="fill-default" points="2560 0 2560 100 0 100" />
          </svg>
        </div>
      </div>
    </>
  );
}

export default HomeHeader;
