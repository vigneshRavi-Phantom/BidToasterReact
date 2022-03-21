import { Link } from "react-router-dom";
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Button,
} from "reactstrap";

function HomeNavbar() {
  return (
    <>
      <Navbar
        className="navbar-horizontal navbar-main navbar-dark bg-info"
        expand="lg"
        id="navbar-main"
      >
        <Container>
          <NavbarBrand to="/" tag={Link}>
            <img
              alt="..."
              src={require("assets/img/logo.png").default}
            />
          </NavbarBrand>
          <button
            aria-controls="navbar-collapse"
            aria-expanded={false}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-target="#navbar-collapse"
            data-toggle="collapse"
            id="navbar-collapse"
            type="button"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse
            className="navbar-custom-collapse"
            navbar
            toggler="#navbar-collapse"
          >
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/rfq">
                    <img
                      alt="..."
                      src={require("assets/img/brand/blue.png").default}
                    />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button
                    aria-controls="navbar-collapse"
                    aria-expanded={false}
                    aria-label="Toggle navigation"
                    className="navbar-toggler"
                    data-target="#navbar-collapse"
                    data-toggle="collapse"
                    id="navbar-collapse"
                    type="button"
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="mr-auto" navbar>
              {/* <NavItem>
                <NavLink to="/dashboard" tag={Link}>
                  <span className="nav-link-inner--text">Dashboard</span>
                </NavLink>
              </NavItem> */}
              {/* <NavItem>
                <NavLink to="/login" tag={Link}>
                  <span className="nav-link-inner--text">Pricing</span>
                </NavLink>
              </NavItem> */}
              {/* <NavItem>
                <NavLink to="/login" tag={Link}>
                  <span className="nav-link-inner--text">Login</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/signup" tag={Link}>
                  <span className="nav-link-inner--text">Signup</span>
                </NavLink>
              </NavItem> */}
            </Nav>
            <hr className="d-lg-none" />
            <Nav className="align-items-lg-center ml-lg-auto" navbar>
              {/* <NavItem>
                <NavLink
                  className="nav-link-icon"
                  href="https://www.facebook.com"
                  id="tooltip601201423"
                  target="_blank" rel="noreferrer"
                >
                  <i className="fab fa-facebook-square" />
                  <span className="nav-link-inner--text d-lg-none">
                    Facebook
                  </span>
                </NavLink>
                <UncontrolledTooltip delay={0} target="tooltip601201423">
                  Like us on Facebook
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  href="https://www.instagram.com/"
                  id="tooltip871243015"
                  target="_blank" rel="noreferrer"
                >
                  <i className="fab fa-instagram" />
                  <span className="nav-link-inner--text d-lg-none">
                    Instagram
                  </span>
                </NavLink>
                <UncontrolledTooltip delay={0} target="tooltip871243015">
                  Follow us on Instagram
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  href="https://twitter.com/"
                  id="tooltip366258619"
                  target="_blank" rel="noreferrer"
                >
                  <i className="fab fa-twitter-square" />
                  <span className="nav-link-inner--text d-lg-none">
                    Twitter
                  </span>
                </NavLink>
                <UncontrolledTooltip delay={0} target="tooltip366258619">
                  Follow us on Twitter
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  href="https://github.com"
                  id="tooltip931502898"
                  target="_blank" rel="noreferrer"
                >
                  <i className="fab fa-github" />
                  <span className="nav-link-inner--text d-lg-none">Github</span>
                </NavLink>
                <UncontrolledTooltip delay={0} target="tooltip931502898">
                  Star us on Github
                </UncontrolledTooltip>
              </NavItem> */}
              <NavItem className="d-none d-lg-block ml-lg-4">
                <Link
                  className="btn btn-neutral btn-icon pointer"
                  color="default"
                  to="/login"
                >
                  <span className="nav-link-inner--text">Login</span>
                </Link>
              </NavItem>

              <NavItem className="d-none d-lg-block ml-lg-4">
                <Link
                  className="btn btn-neutral btn-icon pointer"
                  color="default"
                  to="/signup"
                >
                  <span className="nav-link-inner--text">Sign up</span>
                </Link>
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
}

export default HomeNavbar;
