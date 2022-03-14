import classnames from "classnames";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useAuth } from "contexts/AuthContextProvider";

function AdminNavbar({ theme, sidenavOpen, toggleSidenav }: any) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Navbar
        className={classnames(
          "navbar-top navbar-expand border-bottom",
          { "navbar-dark bg-info": theme === "dark" },
          { "navbar-light bg-info": theme === "light" }
        )}
      >
        <Container fluid>
          <Collapse navbar isOpen={true}>
            <Nav className="align-items-center ml-md-auto" navbar>
              <NavItem className="d-xl-none">
                <div
                  className={classnames(
                    "pr-3 sidenav-toggler",
                    { active: sidenavOpen },
                    { "sidenav-toggler-dark": theme === "dark" }
                  )}
                  onClick={toggleSidenav}
                >
                  <div className="sidenav-toggler-inner">
                    <i className="sidenav-toggler-line" />
                    <i className="sidenav-toggler-line" />
                    <i className="sidenav-toggler-line" />
                  </div>
                </div>
              </NavItem>
              <NavItem className="d-sm-none">
                <NavLink>
                  <i className="ni ni-zoom-split-in" />
                </NavLink>
              </NavItem>
              {/* <UncontrolledDropdown nav>
                <DropdownToggle className="nav-link" color="" tag="a">
                  <i className="ni ni-bell-55" />
                </DropdownToggle>
                <DropdownMenu
                  className="dropdown-menu-xl py-0 overflow-hidden"
                  right
                >
                  <div className="px-3 py-3">
                    <h6 className="text-sm text-muted m-0">
                      You have <strong className="text-info">13</strong>{" "}
                      notifications.
                    </h6>
                  </div>

                  <ListGroup flush>
                    <ListGroupItem
                      className="list-group-item-action"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      tag="a"
                    >
                      <Row className="align-items-center">
                        <Col className="col-auto">
                          <i className="ni ni-single-02" />
                        </Col>
                        <div className="col ml--2">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h4 className="mb-0 text-sm">My Account</h4>
                            </div>
                            <div className="text-right text-muted">
                              <small>2 hrs ago</small>
                            </div>
                          </div>
                          <p className="text-sm mb-0">
                            Let's meet at Starbucks at 11:30. Wdyt?
                          </p>
                        </div>
                      </Row>
                    </ListGroupItem>
                    <ListGroupItem
                      className="list-group-item-action"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      tag="a"
                    >
                      <Row className="align-items-center">
                        <Col className="col-auto">
                          <i className="ni ni-single-02" />
                        </Col>
                        <div className="col ml--2">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h4 className="mb-0 text-sm">My Account</h4>
                            </div>
                            <div className="text-right text-muted">
                              <small>3 hrs ago</small>
                            </div>
                          </div>
                          <p className="text-sm mb-0">
                            A new issue has been reported for Argon.
                          </p>
                        </div>
                      </Row>
                    </ListGroupItem>
                    <ListGroupItem
                      className="list-group-item-action"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      tag="a"
                    >
                      <Row className="align-items-center">
                        <Col className="col-auto">
                          <i className="ni ni-single-02" />
                        </Col>
                        <div className="col ml--2">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h4 className="mb-0 text-sm">My Account</h4>
                            </div>
                            <div className="text-right text-muted">
                              <small>5 hrs ago</small>
                            </div>
                          </div>
                          <p className="text-sm mb-0">
                            Your posts have been liked a lot.
                          </p>
                        </div>
                      </Row>
                    </ListGroupItem>
                    <ListGroupItem
                      className="list-group-item-action"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      tag="a"
                    >
                      <Row className="align-items-center">
                        <Col className="col-auto">
                          <i className="ni ni-single-02" />
                        </Col>
                        <div className="col ml--2">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h4 className="mb-0 text-sm">My Account</h4>
                            </div>
                            <div className="text-right text-muted">
                              <small>2 hrs ago</small>
                            </div>
                          </div>
                          <p className="text-sm mb-0">
                            Let's meet at Starbucks at 11:30. Wdyt?
                          </p>
                        </div>
                      </Row>
                    </ListGroupItem>
                    <ListGroupItem
                      className="list-group-item-action"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      tag="a"
                    >
                      <Row className="align-items-center">
                        <Col className="col-auto">
                          <i className="ni ni-single-02" />
                        </Col>
                        <div className="col ml--2">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h4 className="mb-0 text-sm">My Account</h4>
                            </div>
                            <div className="text-right text-muted">
                              <small>3 hrs ago</small>
                            </div>
                          </div>
                          <p className="text-sm mb-0">
                            A new issue has been reported for Argon.
                          </p>
                        </div>
                      </Row>
                    </ListGroupItem>
                  </ListGroup>

                  <DropdownItem
                    className="text-center text-info font-weight-bold py-3"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    View all
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
              <UncontrolledDropdown nav>
                <DropdownToggle className="nav-link" color="" tag="a">
                  <i className="ni ni-ungroup" />
                </DropdownToggle>
                <DropdownMenu
                  className="dropdown-menu-lg dropdown-menu-dark bg-default"
                  right
                >
                  <Row className="shortcuts px-4">
                    <Col
                      className="shortcut-item"
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/dashboard");
                      }}
                      xs="4"
                      tag="a"
                    >
                      <span className="shortcut-media avatar rounded-circle bg-gradient-red">
                        <i className="ni ni-shop" />
                      </span>
                      <small>Dashboard</small>
                    </Col>
                    <Col
                      className="shortcut-item"
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/users");
                      }}
                      xs="4"
                      tag="a"
                    >
                      <span className="shortcut-media avatar rounded-circle bg-gradient-orange">
                        <i className="ni ni-single-02" />
                      </span>
                      <small>Users</small>
                    </Col>
                    <Col
                      className="shortcut-item"
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/org-items");
                      }}
                      xs="4"
                      tag="a"
                    >
                      <span className="shortcut-media avatar rounded-circle bg-gradient-info">
                        <i className="ni ni-credit-card" />
                      </span>
                      <small>Items</small>
                    </Col>
                    <Col
                      className="shortcut-item"
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/dashboard");
                      }}
                      xs="4"
                      tag="a"
                    >
                      <span className="shortcut-media avatar rounded-circle bg-gradient-green">
                        <i className="ni ni-books" />
                      </span>
                      <small>Reports</small>
                    </Col>
                    <Col
                      className="shortcut-item"
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/settings/reset-password");
                      }}
                      xs="4"
                      tag="a"
                    >
                      <span className="shortcut-media avatar rounded-circle bg-gradient-purple">
                        <i className="ni ni-settings-gear-65" />
                      </span>
                      <small>Settings</small>
                    </Col>
                    <Col
                      className="shortcut-item"
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/profile");
                      }}
                      xs="4"
                      tag="a"
                    >
                      <span className="shortcut-media avatar rounded-circle bg-gradient-yellow">
                        <i className="ni ni-single-02" />
                      </span>
                      <small>Profile</small>
                    </Col>
                  </Row>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <Nav className="align-items-center ml-auto ml-md-0" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="nav-link pr-0" color="" tag="a">
                  <Media className="align-items-center">
                    <Media className="ml-2 d-none d-lg-block">
                      <i className="ni ni-single-02" />{" "}
                      <span className="mb-0 text-sm font-weight-bold">
                        My Account
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/profile");
                    }}
                  >
                    <i className="ni ni-single-02" />
                    <span>My profile</span>
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/settings/reset-password");
                    }}
                  >
                    <i className="ni ni-settings-gear-65" />
                    <span>Settings</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="#pablo" onClick={logout}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

AdminNavbar.defaultProps = {
  toggleSidenav: () => {},
  sidenavOpen: false,
  theme: "dark",
  brandText: "",
};
AdminNavbar.propTypes = {
  toggleSidenav: PropTypes.func,
  sidenavOpen: PropTypes.bool,
  theme: PropTypes.oneOf(["dark", "light"]),
  brandText: PropTypes.string,
};

export default AdminNavbar;
