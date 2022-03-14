import {
  Badge,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import HomeNavbar from "containers/Home/HomeNavbar";
import HomeHeader from "containers/Home/HomeHeader";
import HomeFooter from "containers/Home/HomeFooter";

function Index() {
  return (
    <>
      <HomeNavbar />
      <div className="main-content">
        <HomeHeader />
        <section className="py-6 pb-9 bg-default">
          <Container fluid>
            <Row className="justify-content-center text-center">
              <Col md="6">
                <p className="lead text-white">
                  Choose the Best Digital Procurement Platform For Your Brand
                  and Stay Ahead Bidtoaster is one of the best digital
                  procurement platforms to assist you and your brand in all
                  legal activities.
                </p>
                <p className="lead text-white">
                  Be it the bridge between supplier and buyer, or your other
                  procurement needs, Bidtoaster stands out and leverages
                  best-of-breed technologies to enable a Centralized Procurement
                  Organization.
                </p>
                <p className="lead text-white">
                  We support you with insights on complex manual sourcing
                  processes, like managing and tracking the open and closed
                  RFPs, addressing supply chain quality and resilience, and
                  determining supplier performance scorecards. Thus, Bidtoaster
                  provides a complete one-stop solution for all of your
                  organization's needs. With automated processes and complete
                  hands-on experience, get your work done in minutes in the
                  environment of expertise.
                </p>
              </Col>
            </Row>
          </Container>
        </section>
        {/* <section className="section section-lg pt-lg-0 mt--7">
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <Row>
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="icon icon-shape bg-gradient-info text-white rounded-circle mb-4">
                          <i className="ni ni-check-bold" />
                        </div>
                        <h4 className="h3 text-info text-uppercase">
                          Based on React and Reactstrap
                        </h4>
                        <p className="description mt-3">
                          Argon is built on top of the most popular open source
                          toolkit for developing with HTML, CSS, and JS.
                        </p>
                        <div>
                          <Badge color="info" pill>
                            react
                          </Badge>
                          <Badge color="info" pill>
                            reactstrap
                          </Badge>
                          <Badge color="info" pill>
                            dashboard
                          </Badge>
                          <Badge color="info" pill>
                            template
                          </Badge>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="icon icon-shape bg-gradient-success text-white rounded-circle mb-4">
                          <i className="ni ni-istanbul" />
                        </div>
                        <h4 className="h3 text-success text-uppercase">
                          Integrated build tools
                        </h4>
                        <p className="description mt-3">
                          Use Argons's included npm scripts to compile source
                          code, scss and more with just a few simple commands.
                        </p>
                        <div>
                          <Badge color="success" pill>
                            npm
                          </Badge>
                          <Badge color="success" pill>
                            build tools
                          </Badge>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="card-lift--hover shadow border-0">
                      <CardBody className="py-5">
                        <div className="icon icon-shape bg-gradient-warning text-white rounded-circle mb-4">
                          <i className="ni ni-planet" />
                        </div>
                        <h4 className="h3 text-warning text-uppercase">
                          Full Sass support
                        </h4>
                        <p className="description mt-3">
                          Argon makes customization easier than ever before. You
                          get all the tools to make your website building
                          process a breeze.
                        </p>
                        <div>
                          <Badge color="warning" pill>
                            sass
                          </Badge>
                          <Badge color="warning" pill>
                            design
                          </Badge>
                          <Badge color="warning" pill>
                            customize
                          </Badge>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section> */}
        <section className="py-6">
          <Container>
            <Row className="row-grid align-items-center">
              <Col className="order-md-2" md="6">
                <img
                  alt="..."
                  className="img-fluid"
                  src={require("assets/img/theme/landing-1.png").default}
                />
              </Col>
              <Col className="order-md-1" md="6">
                <div className="pr-md-5">
                  <h1>Why does your Procurement Team Need Bidtoaster?</h1>
                  <p>
                    In the changing business environment, sourcing and
                    procurement organizations must gain a holistic, data-driven
                    view of their suppliers. To gain a competitive advantage,
                    they must find creative ways to manage risk. There should be
                    compliance and deeper collaboration with suppliers. But
                    while achieving these objectives, sourcing organizations are
                    typically hindered by inefficiencies while:
                  </p>
                  <ul className="list-unstyled mt-5">
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge className="badge-circle mr-3" color="success">
                            <i className="ni ni-settings-gear-65" />
                          </Badge>
                        </div>
                        <div>
                          <h4 className="mb-0">
                            Automating requests for information, quotations, and
                            proposals with built-in collaboration
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge className="badge-circle mr-3" color="success">
                            <i className="ni ni-html5" />
                          </Badge>
                        </div>
                        <div>
                          <h4 className="mb-0">
                            Performing side-by-side excel-based bid analysis to
                            identify qualified suppliers
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge className="badge-circle mr-3" color="success">
                            <i className="ni ni-satisfied" />
                          </Badge>
                        </div>
                        <div>
                          <h4 className="mb-0">
                            Negotiating effective pricing and shortlisting best
                            suppliers with multi-round sourcing events
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge className="badge-circle mr-3" color="success">
                            <i className="ni ni-satisfied" />
                          </Badge>
                        </div>
                        <div>
                          <h4 className="mb-0">
                            Encouraging supplier collaboration with simplified
                            onboarding and an easy-to-use collaboration portal
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge className="badge-circle mr-3" color="success">
                            <i className="ni ni-satisfied" />
                          </Badge>
                        </div>
                        <div>
                          <h4 className="mb-0">
                            Collaborating between internal and external
                            stakeholders
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="py-6">
          <Container>
            <Row className="row-grid align-items-center">
              <Col md="6">
                <img
                  alt="..."
                  className="img-fluid"
                  src={require("assets/img/hardship.svg").default}
                />
              </Col>
              <Col md="6">
                <div className="pr-md-5">
                  <h1>The major reason behind these hardships are:</h1>

                  <ul className="list-unstyled mt-5">
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge className="badge-circle mr-3" color="success">
                            <i className="ni ni-settings-gear-65" />
                          </Badge>
                        </div>
                        <div>
                          <h4 className="mb-0">
                            A lack of Automation on comparison – Specs, Pricing
                            and Other Commercial Terms
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge className="badge-circle mr-3" color="success">
                            <i className="ni ni-html5" />
                          </Badge>
                        </div>
                        <div>
                          <h4 className="mb-0">
                            Lengthy Sourcing cycle times and increased costs
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge className="badge-circle mr-3" color="success">
                            <i className="ni ni-satisfied" />
                          </Badge>
                        </div>
                        <div>
                          <h4 className="mb-0">
                            Manual sourcing events and suboptimal validation(PR
                            – Proposal – PO)
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <p>
                    Thus, Bidtoaster extends a helping hand to your procurement
                    team and assists them with the following pointers.
                  </p>
                  {/* <Link
                    className="font-weight-bold text-warning mt-5"
                    to="/admin/profile"
                  >
                    Explore pages
                  </Link> */}
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section section-lg pt-lg-0 ">
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <Row>
                  <Col lg="4" className="card-lift--hover border-0 mb-5">
                    <Card className="shadow height-100">
                      <CardBody className="py-5">
                        <div className="icon icon-shape bg-gradient-info text-white rounded-circle mb-4">
                          <i className="ni ni-check-bold" />
                        </div>
                        <h4 className="h3 text-info text-uppercase">
                          Technology
                        </h4>
                        <p className="description mt-3">
                          We employ the latest adaptive & machine learning
                          technologies
                        </p>
                        {/* <div>
                          <Badge color="info" pill>
                            react
                          </Badge>
                          <Badge color="info" pill>
                            reactstrap
                          </Badge>
                          <Badge color="info" pill>
                            dashboard
                          </Badge>
                          <Badge color="info" pill>
                            template
                          </Badge>
                        </div> */}
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4" className="card-lift--hover border-0 mb-5">
                    <Card className="shadow height-100">
                      <CardBody className="py-5">
                        <div className="icon icon-shape bg-gradient-success text-white rounded-circle mb-4">
                          <i className="ni ni-istanbul" />
                        </div>
                        <h4 className="h3 text-success text-uppercase">
                          Management
                        </h4>
                        <p className="description mt-3">
                          Bidtoaster, with strong technical support, arranges
                          and manages bids, proposals, quotations, and
                          specifications into structured data and provides an
                          intelligent comparison statement.
                        </p>
                        {/* <div>
                          <Badge color="success" pill>
                            npm
                          </Badge>
                          <Badge color="success" pill>
                            build tools
                          </Badge>
                        </div> */}
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4" className="card-lift--hover border-0 mb-5">
                    <Card className="shadow height-100">
                      <CardBody className="py-5">
                        <div className="icon icon-shape bg-gradient-warning text-white rounded-circle mb-4">
                          <i className="ni ni-planet" />
                        </div>
                        <h4 className="h3 text-warning text-uppercase">
                          Comparison
                        </h4>
                        <p className="description mt-3">
                          Bidtoaster is the only platform with the spec
                          comparison feature
                        </p>
                        {/* <div>
                          <Badge color="warning" pill>
                            sass
                          </Badge>
                          <Badge color="warning" pill>
                            design
                          </Badge>
                          <Badge color="warning" pill>
                            customize
                          </Badge>
                        </div> */}
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col lg="2"></Col>
                  <Col lg="4" className="card-lift--hover border-0 mb-3">
                    <Card className="shadow height-100">
                      <CardBody className="py-5">
                        <div className="icon icon-shape bg-gradient-info text-white rounded-circle mb-4">
                          <i className="ni ni-check-bold" />
                        </div>
                        <h4 className="h3 text-info text-uppercase">
                          Success rate
                        </h4>
                        <p className="description mt-3">
                          Over 600+ RFPs since inception
                        </p>
                        {/* <div>
                          <Badge color="info" pill>
                            react
                          </Badge>
                          <Badge color="info" pill>
                            reactstrap
                          </Badge>
                          <Badge color="info" pill>
                            dashboard
                          </Badge>
                          <Badge color="info" pill>
                            template
                          </Badge>
                        </div> */}
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4" className="card-lift--hover border-0 mb-3">
                    <Card className="shadow height-100">
                      <CardBody className="py-5">
                        <div className="icon icon-shape bg-gradient-success text-white rounded-circle mb-4">
                          <i className="ni ni-istanbul" />
                        </div>
                        <h4 className="h3 text-success text-uppercase">
                          Efficiency
                        </h4>
                        <p className="description mt-3">
                          Bidtoaster improves the efficiency of all the
                          processes and helps you reach better productivity.
                        </p>
                        {/* <div>
                          <Badge color="success" pill>
                            npm
                          </Badge>
                          <Badge color="success" pill>
                            build tools
                          </Badge>
                        </div> */}
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="2"></Col>
                </Row>
              </Col>
            </Row>
          </Container>
          <div className="text-center mb-6">
            <a href="/login" className="my-2 btn btn-default">
              Learn more
            </a>
          </div>
        </section>
        <section className="py-6">
          <h2 className="text-center display-3">
            Bidtoaster: The most preferred choice of the procurement
            organisations
          </h2>
          <Container>
            <Row className="row-grid align-items-center">
              <Col className="order-md-2" md="6">
                <img
                  alt="..."
                  className="img-fluid"
                  src={require("assets/img/build-with-high-breeding-technology.png").default}
                />
              </Col>
              <Col className="order-md-1" md="6">
                <div className="pr-md-5">
                  <h1>Built with high breed technology</h1>
                  <p>
                    Bidtoaster employs adaptive and machine learning technology
                    that makes the solution powerful yet simple to use. The
                    specification comparison and commercial terms ( Warranty,
                    Delivery, Payment, Tax, Proposal Validity, Price Escalation
                    and Duration of the Agreement/Contract) comparison feature
                    of Bidtoaster out beats all its competitors.
                  </p>
                  {/* <Link
                    className="font-weight-bold text-info mt-5"
                    to="/admin/widgets"
                  >
                    Explore widgets
                  </Link> */}
                </div>
              </Col>
            </Row>
            <Row className="row-grid align-items-center">
              <Col className="order-md-1" md="6">
                <img
                  alt="..."
                  className="img-fluid"
                  src={require("assets/img/detailed-specification-comparison.jpg").default}
                />
              </Col>
              <Col className="order-md-2" md="6">
                <div className="pr-md-5">
                  <h1>Detailed specification comparisons</h1>
                  <p>
                    It is the USP of Bidtoaster. Bidtoaster compares the
                    multiple proposals and automates a comparison statement
                    based on Prices, Taxation, Delivery terms, Payment terms and
                    Warranty, Proposal Validity and Duration of the
                    Agreement/Contract.
                  </p>
                  {/* <Link
                    className="font-weight-bold text-info mt-5"
                    to="/admin/widgets"
                  >
                    Explore widgets
                  </Link> */}
                </div>
              </Col>
            </Row>
            <Row className="row-grid align-items-center">
              <Col className="order-md-2" md="6">
                <img
                  alt="..."
                  className="img-fluid"
                  src={require("assets/img/reminder.jfif").default}
                />
              </Col>
              <Col className="order-md-1" md="6">
                <div className="pr-md-5">
                  <h1>Reminders and alerts</h1>
                  <p>
                    With the Bidtoaster reminder and alerts feature, you can
                    never forget to send notifications. Get bidtoaster and
                    relax.
                  </p>
                  {/* <Link
                    className="font-weight-bold text-info mt-5"
                    to="/admin/widgets"
                  >
                    Explore widgets
                  </Link> */}
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="pt-4 pb-6 bg-white">
          <Container>
            <Row className="row-grid justify-content-center">
              <Col className="text-center" lg="8">
                <div className="text-center">
                  <h4 className="display-4 mb-5 mt-5">
                    Bidtoaster caters to different kinds of businesses
                  </h4>
                  <Row className="justify-content-center">
                    <Col className="my-2" md="2" xs="3">
                      <a
                        href="/#"
                        id="tooltip170669606"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          alt="..."
                          className="img-fluid rounded-circle shadow shadow-lg--hover"
                          src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/bootstrap.jpg"
                        />
                      </a>
                      <UncontrolledTooltip delay={0} target="tooltip170669606">
                        Small Businesses
                      </UncontrolledTooltip>
                    </Col>
                    <Col className="my-2" md="2" xs="3">
                      <a
                        href="/#"
                        id="tooltip374813715"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          alt="..."
                          className="img-fluid rounded-circle shadow shadow-lg--hover"
                          src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/react.jpg"
                        />
                      </a>
                      <UncontrolledTooltip delay={0} target="tooltip374813715">
                        Medium Businesses
                      </UncontrolledTooltip>
                    </Col>
                    <Col className="my-2" md="2" xs="3">
                      <a
                        href="/#"
                        id="tooltip374813716"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          alt="..."
                          className="img-fluid rounded-circle shadow shadow-lg--hover"
                          src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/nodejs-logo.jpg"
                        />
                      </a>
                      <UncontrolledTooltip delay={0} target="tooltip374813716">
                        Enterprise Businesses
                      </UncontrolledTooltip>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
      <HomeFooter />
    </>
  );
}

export default Index;
