
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
  Spinner
} from "reactstrap";
import { Link } from "react-router-dom";
import { useAuth } from "contexts/AuthContextProvider";
import useForm from "helpers/useForm";
import { loginValidate } from "helpers/validateRules";

import { useLocalization } from "contexts/LocalizationContextProvider";
import { errorCode } from "utils/ServiceAPIUtil";

import AuthHeader from "containers/Auth/AuthHeader";
import AuthNavbar from "containers/Auth/AuthNavbar";
import HomeFooter from "containers/Home/HomeFooter";

const initialValues = {
  username: "",
  password: "",
};

const Login = () => {
  const { strings }: any = useLocalization();
  const { values, handleChange, handleSubmit } = useForm(
    initialValues,
    handleSubmitCB,
    loginValidate
  );
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [globalErrMsg, setGlobalErrMsg] = useState("");

  function handleSubmitCB() {
    setLoading(true);
    login({
      username: values.username.toLowerCase(),
      password: values.password,
    }).catch((err) => {
      setGlobalErrMsg(
        strings["error." + errorCode(err)] || strings["error.e10100"]
      );
      setLoading(false);
    });
  }

  return (
    <>
      <div className="main-content bg-default">
        <AuthNavbar />
        <AuthHeader
          title="Welcome!"
          lead="Use these awesome forms to login or create new account in your project for free."
        />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="5" md="7">
              <Card className="bg-secondary border-0 mb-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>Login with credentials</small>
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
                    <FormGroup className={classnames("mb-3 focused")}>
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Username"
                          value={values.username}
                          type="text"
                          onChange={handleChange}
                          name="username"
                          autoComplete="off"
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className={classnames("focused")}>
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          value={values.password}
                          id="password"
                          placeholder="password"
                          type="password"
                          onChange={handleChange}
                          name="password"
                          autoComplete="off"
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id=" customCheckLogin"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor=" customCheckLogin"
                      >
                        <span className="text-muted">Remember me</span>
                      </label>
                    </div>
                    <div className="text-center">
                      <Button className="my-4" color="info" type="submit" disabled={values.email === '' || values.password === '' }>
                        {loading ? <Spinner size="sm" /> : 'Login'}
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <Row className="mt-3">
                <Col xs="6">
                  <Link className="text-light" to="/forgot-password">
                    <small>Forgot password?</small>
                  </Link>
                </Col>
                <Col className="text-right" xs="6">
                  <Link className="text-light" to="/signup">
                    <small>Sign up</small>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <HomeFooter />
      </div>
    </>
  );
};

export default Login;
