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
} from "reactstrap";
import { Link } from "react-router-dom";
import { useAuth } from "contexts/AuthContextProvider";
import useForm from "helpers/useForm";
import { forgotPasswordValidate } from "helpers/validateRules";

import { useLocalization } from "contexts/LocalizationContextProvider";
import { errorCode } from "utils/ServiceAPIUtil";
import toaster from "components/toaster";

import AuthHeader from "containers/Auth/AuthHeader";
import AuthNavbar from "containers/Auth/AuthNavbar";
import HomeFooter from "containers/Home/HomeFooter";

const initialValues = {
  email: "",
};

const ForgotPassword = () => {
  const { strings }: any = useLocalization();
  const { values, errors, handleChange, handleSubmit, setUpdateValue } =
    useForm(initialValues, handleSubmitCB, forgotPasswordValidate);
  const { forgotPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [globalErrMsg, setGlobalErrMsg] = useState("");

  function handleSubmitCB() {
    setLoading(true);
    forgotPassword({
      email: values.email,
    })
      .then((res) => {
        if (res.emailExists) {
          toaster.notify("Reset link has been sent to your email id.", {
            position: "top-right",
            type: "success",
          });
        }
        setUpdateValue("email", "");
        setGlobalErrMsg("");
        setLoading(false);
      })
      .catch((err: any) => {
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
        <AuthHeader title="Forgot Password" lead="" />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="5" md="7">
              <Card className="bg-secondary border-0 mb-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>Forgot Your Password?</small>
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
                          placeholder="Email"
                          value={values.email}
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
                    <div className="text-center">
                      <Button className="my-4" color="info" type="submit">
                        {loading ? <Spinner size="sm" /> : "CONTINUE"}
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <Row className="mt-3">
                <Col xs="6">
                  <Link className="text-light" to="/login">
                    <small>Login</small>
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

export default ForgotPassword;
