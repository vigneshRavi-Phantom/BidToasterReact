import { useState } from "react";
import { useAuth } from "contexts/AuthContextProvider";
import useForm from "helpers/useForm";
import { adminResetPasswordValidate } from "helpers/validateRules";
import { useLocalization } from "contexts/LocalizationContextProvider";
import { errorCode } from "utils/ServiceAPIUtil";
import toaster from "components/toaster";
import Layout from "containers/Layout/Layout";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Spinner,
  CardHeader,
} from "reactstrap";
import SimpleHeader from "containers/Admin/SimpleHeader";

const initialValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ResetPassword = () => {
  const { strings }: any = useLocalization();
  const { values, errors, handleChange, handleSubmit, setUpdateValue } =
    useForm(initialValues, handleSubmitCB, adminResetPasswordValidate);
  const { resetPassword, accessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [globalErrMsg, setGlobalErrMsg] = useState("");

  function handleSubmitCB() {
    setLoading(true);
    resetPassword({
      oldPassword: values.oldPassword,
      password: values.newPassword,
      token: accessToken || "",
    })
      .then((res: any) => {
        if (res.passwordReset && res.passwordReset === "success") {
          toaster.notify("Password Reset Success", {
            position: "top-right",
            type: "success",
          });
        }
        setGlobalErrMsg("");
        setLoading(false);
        setUpdateValue("oldPassword", "");
        setUpdateValue("newPassword", "");
        setUpdateValue("confirmPassword", "");
      })
      .catch((err: any) => {
        setGlobalErrMsg(
          strings["error." + errorCode(err)] || strings["error.e10100"]
        );
        setLoading(false);
      });
  }

  return (
    <Layout>
      <SimpleHeader name="Settings" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row className="row-example">
          <Col lg="3">
          </Col>
          <Col lg="6">
            <div className="card-wrapper">
              <Card>
                <CardHeader style={{ textAlign:'center' }}>
                
                  <h3 className="mb-0"> <img className="login-log" src={require("assets/img/bidtoaster-logo.png").default} />Reset Password</h3>
                </CardHeader>
                <CardBody>
                  {globalErrMsg !== "" && (
                    <div
                      className="text-center mb-3 error"
                      style={{ color: "#B94A48" }}
                    >
                      {globalErrMsg}
                    </div>
                  )}
                  <Form role="form" onSubmit={handleSubmit}>
                    <FormGroup>
                      <label className="form-control-label">Old Password</label>
                      <Input
                        placeholder="Old Password"
                        value={values.oldPassword}
                        type="password"
                        onChange={handleChange}
                        name="oldPassword"
                        autoComplete="off"
                        className="form-control"
                      />
                      {errors.oldPassword && (
                        <label className="error">{errors.oldPassword}</label>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <label className="form-control-label">New Password</label>
                      <Input
                        placeholder="New Password"
                        value={values.newPassword}
                        type="password"
                        onChange={handleChange}
                        name="newPassword"
                        autoComplete="off"
                        className="form-control"
                      />
                      {errors.newPassword && (
                        <label className="error">{errors.newPassword}</label>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <label className="form-control-label">
                        Confirm Password
                      </label>
                      <Input
                        placeholder="Confirm Password"
                        value={values.confirmPassword}
                        type="password"
                        onChange={handleChange}
                        name="confirmPassword"
                        autoComplete="off"
                        className="form-control"
                      />
                      {errors.confirmPassword && (
                        <label className="error">{errors.confirmPassword}</label>
                      )}
                    </FormGroup>
                    <div className="text-center">
                      <Button className="my-4" color="info" type="submit">
                        {loading ? <Spinner size="sm" /> : "Submit"}
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </div>
          </Col>
          <Col lg="3">
        </Col>             
        </Row>
      </Container>
    </Layout>
  );
};

export default ResetPassword;
