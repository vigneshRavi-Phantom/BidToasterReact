import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "contexts/AuthContextProvider";
import useForm from "helpers/useForm";
import { resetPasswordValidate } from "helpers/validateRules";
import { useLocalization } from "contexts/LocalizationContextProvider";
import { errorCode } from "utils/ServiceAPIUtil";
import toaster from "components/toaster";
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
import AuthHeader from "containers/Auth/AuthHeader";
import AuthNavbar from "containers/Auth/AuthNavbar";
import HomeFooter from "containers/Home/HomeFooter";

const initialValues = {
  password: "",
  confirmPassword: "",
};

const ResetPassword = () => {
  const { strings }: any = useLocalization();
  const navigate = useNavigate();
  const { values, errors, handleChange, handleSubmit } =
    useForm(initialValues, handleSubmitCB, resetPasswordValidate);
  const { resetPassword, isPasswordResetTokenValid } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [globalErrMsg, setGlobalErrMsg] = useState("");
  const { token } = useParams();

  function handleSubmitCB() {
    setLoading(true);
    resetPassword({
      password: values.password,
      token: (token || ""),
    })
      .then((res: any) => {
        if (res.passwordReset && res.passwordReset === 'success') {
          toaster.notify("Password Reset Success", {
            position: "top-right",
            type: "success",
          });
        }
        setTimeout(() => {
          navigate("/login");
        }, 200);
        setLoading(false);
      })
      .catch((err: any) => {
        setGlobalErrMsg(
          strings["error." + errorCode(err)] || strings["error.e10100"]
        );
        setLoading(false);
      });
  }

  useEffect(() => {
    isPasswordResetTokenValid({ token: token || "" })
      .then((res: any) => {
        if (res.isTokenValid) setIsTokenValid(true);
        setLoading(false);
      })
      .catch((err: any) => {
        setGlobalErrMsg(
          strings["error." + errorCode(err)] || strings["error.e10100"]
        );
        setLoading(false);
      });
      //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

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
                  {isTokenValid && <Form role="form" onSubmit={handleSubmit}>
                    <FormGroup className={classnames("mb-3 focused")}>
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Password"
                          value={values.password}
                          type="password"
                          onChange={handleChange}
                          name="password"
                          autoComplete="off"
                        />
                      </InputGroup>
                      {errors.password && (
                        <span className="error">{errors.password}</span>
                      )}
                    </FormGroup>
                    <FormGroup className={classnames("mb-3 focused")}>
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Confirm Password"
                          value={values.confirmPassword}
                          type="password"
                          onChange={handleChange}
                          name="confirmPassword"
                          autoComplete="off"
                        />
                      </InputGroup>
                      {errors.confirmPassword && (
                        <span className="error">{errors.confirmPassword}</span>
                      )}
                    </FormGroup>
                    <div className="text-center">
                      <Button className="my-4" color="info" type="submit">
                        {loading ? <Spinner size="sm" /> : "Submit"}
                      </Button>
                    </div>
                  </Form>}
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

export default ResetPassword;
