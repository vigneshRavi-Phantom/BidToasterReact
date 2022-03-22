import { useState } from "react";
import classnames from "classnames";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Spinner,
  UncontrolledTooltip
} from "reactstrap";
import { useAuth } from "contexts/AuthContextProvider";
import useForm from "helpers/useForm";
import { signupValidate } from "helpers/validateRules";

import AuthHeader from "containers/Auth/AuthHeader";
import AuthNavbar from "containers/Auth/AuthNavbar";
import HomeFooter from "containers/Home/HomeFooter";

const initialValues = {
  userAccessType: "buyer",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  organizationName: "",
  organizationType: "",
  natureOfBusiness: "",
  companyRegistrationNo: "",
  password: "",
};

function Signup() {
  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    handleSubmitCB,
    signupValidate
  );
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [globalErrMsg, setGlobalErrMsg] = useState("");

  function handleSubmitCB() {
    setLoading(true);
    signup({
      userAccessType: "buyer",
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email.toLowerCase(),
      phoneNumber: values.phoneNumber,
      organizationName: values.organizationName,
      organizationType: values.organizationType,
      natureOfBusiness: values.natureOfBusiness,
      companyRegistrationNo: values.companyRegistrationNo,
      password: values.password,
    }).catch((err) => {
      setGlobalErrMsg(err);
      setLoading(false);
    });
  }

  return (
    <>
      <div className="main-content bg-default">
        <AuthNavbar />
        <AuthHeader
          title="Welcome to Bidtoaster!"
          lead=""
        />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="10" md="7">
              <Card className="bg-secondary border-0 mb-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                  <img className="login-log" src={require("assets/img/bidtoaster-logo.png").default} />
                    <small>Let’s get start setting up your Account</small>
                  </div>
                  {globalErrMsg !== "" && (
                    <div
                      className="text-center mb-3 error"
                      style={{ color: "#B94A48" }}
                    >
                      {globalErrMsg}
                    </div>
                  )}

                  <Form role="form" onSubmit={handleSubmit}>
                    <Row className="justify-content-center">
                      <Col lg="5" md="7">
                        <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-hat-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="First Name"
                              value={values.firstName}
                              type="text"
                              onChange={handleChange}
                              name="firstName"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.firstName && (
                            <span className="error">{errors.firstName}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="5" md="7">
                        <FormGroup className={classnames("focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-hat-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              value={values.lastName}
                              placeholder="Last Name"
                              type="text"
                              onChange={handleChange}
                              name="lastName"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.lastName && (
                            <span className="error">{errors.lastName}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="5" md="7">
                        <FormGroup className={classnames("focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              value={values.email}
                              placeholder="Email"
                              type="text"
                              onChange={handleChange}
                              name="email"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.email && (
                            <span className="error">{errors.email}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="5" md="7">
                        <FormGroup className={classnames("focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-mobile-button" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              value={values.phoneNumber}
                              placeholder="Phone Number"
                              type="text"
                              onChange={handleChange}
                              name="phoneNumber"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.phoneNumber && (
                            <span className="error">{errors.phoneNumber}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="5" md="7">
                        <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-box-2" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Company Name"
                              value={values.organizationName}
                              type="text"
                              onChange={handleChange}
                              name="organizationName"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.organizationName && (
                            <span className="error">
                              {errors.organizationName}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="5" md="7">
                        <FormGroup className={classnames("focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-box-2" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              value={values.organizationType}
                              placeholder="Company Type"
                              type="text"
                              onChange={handleChange}
                              name="organizationType"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.organizationType && (
                            <span className="error">
                              {errors.organizationType}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="5" md="7">
                        <FormGroup className={classnames("focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-building" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              value={values.natureOfBusiness}
                              placeholder="Nature of Business"
                              type="text"
                              onChange={handleChange}
                              name="natureOfBusiness"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.natureOfBusiness && (
                            <span className="error">
                              {errors.natureOfBusiness}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="5" md="7">
                        <FormGroup className={classnames("focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-collection" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              value={values.companyRegistrationNo}
                              placeholder="Company Registration No"
                              type="text"
                              onChange={handleChange}
                              name="companyRegistrationNo"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.companyRegistrationNo && (
                            <span className="error">
                              {errors.companyRegistrationNo}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="5" md="7">
                        <FormGroup className={classnames("focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              value={values.password}
                              placeholder="Password"
                              type="password"
                              onChange={handleChange}
                              name="password"
                              autoComplete="off"
                            />
                            <i className="fas fa-info-circle" id="tooltip12475020" style={{ position: 'relative', top: 15, left: 20}} />
                          </InputGroup>
                          {errors.password && (
                            <span className="error">{errors.password}</span>
                          )}
                           <UncontrolledTooltip
                            delay={0}
                            target="tooltip12475020"
                          >
                            Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character.
                          </UncontrolledTooltip>
                        </FormGroup>
                      </Col>
                      <Col lg="5" md="7"></Col>
                      <Col xs="10">
                        <div className="custom-control-alternative">
                          <span>
                            By clicking Sign Up, you agree to our Terms, Data
                            Policy and Cookie Policy.
                          </span>
                        </div>
                        <div className="text-center">
                          <Button className="my-4" color="info" type="submit">
                            {loading ? <Spinner size="sm" /> : "SIGN UP"}
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <HomeFooter />
      </div>
    </>
  );
}

export default Signup;
