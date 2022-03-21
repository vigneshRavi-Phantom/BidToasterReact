import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

function HomeFooter() {
  return (
    <>
      <footer className="py-2" id="footer-main">
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="6">
              <div className="copyright text-center text-xl-left text-muted">
                © {new Date().getFullYear()}{" "}
                <a
                  className="font-weight-bold ml-1"
                  href="https://www.bidtoaster.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  BidToaster
                </a>
              </div>
            </Col>
            <Col xl="6">
              <Nav className="nav-footer justify-content-center justify-content-xl-end">
                <NavItem>
                  <NavLink
                    href="https://www.bidtoaster.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    BidToaster
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/#">About Us</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/#">Blog</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/#">License</NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default HomeFooter;
