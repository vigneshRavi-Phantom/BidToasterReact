import { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Spinner,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
} from "reactstrap";
import useForm from "helpers/useForm";
import { userValidate } from "helpers/validateRules";
import { StringMap } from "helpers/interfaces";
import { useModal } from "contexts/ModalContextProvider";
import userService from "services/userService";
import { errorCode } from "utils/ServiceAPIUtil";
import { useLocalization } from "contexts/LocalizationContextProvider";
import { useAuth } from "contexts/AuthContextProvider";

const initialValues: StringMap = {
  id: null,
  orgId: null,
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  userAccessType: "",
  password: "",
};

const UserForm = (props: any) => {
  const { inputResponse } = props;
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setUpdateValue,
    handleSelectDefault,
  } = useForm(initialValues, handleSubmitCB, userValidate);
  const [isLoading, setIsLoading] = useState(false);
  const [globalErrMsg, setGlobalErrMsg] = useState("");
  const { isModal, closeModal, modalData }: any = useModal();
  const { CreateUser, UpdateUser } = userService();
  const { strings }: any = useLocalization();
  const { accountProfile } = useAuth();

  function handleSubmitCB() {
    setIsLoading(true);
    const formAction = values.id ? UpdateUser : CreateUser;
    if (accountProfile) {
      formAction({
        id: values.id,
        orgId: accountProfile.id,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        userAccessType: values.userAccessType,
        password: values.password,
      })
        .then((res) => {
          inputResponse(values.id ? "update" : "add");
          closeModal();
        })
        .catch((err) => {
          setGlobalErrMsg(
            strings["error." + errorCode(err)] || strings["error.e10100"]
          );
          setIsLoading(false);
        });
    } else {
      setGlobalErrMsg("Organization not found");
    }
  }

  useEffect(() => {
    if (modalData) {
      Object.keys(initialValues).forEach((keyName) => {
        setUpdateValue(keyName, modalData[keyName] || initialValues[keyName]);
      });
    }
    // eslint-disable-next-line
  }, [modalData]);

  return (
    <>
      <Modal
        className="modal-dialog custom-modal"
        isOpen={isModal}
        modalClassName="right"
      >
        <div className="modal-body p-0">
          <Card className="bg-secondary border-0 mb-0">
            <CardHeader className="bg-transparent">
              <div className="text-center mt-2">
                {values.id ? "Update User" : "Add User"}
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              {globalErrMsg !== "" && (
                <div
                  className="text-center mb-3 error"
                  style={{ color: "#B94A48" }}
                >
                  {globalErrMsg}
                </div>
              )}
              <Form role="form" onSubmit={handleSubmit}>
                <FormGroup className="mb-3 focused">
                  <InputGroup className="input-group-merge input-group-alternative">
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
                <FormGroup className="mb-3 focused">
                  <InputGroup className="input-group-merge input-group-alternative">
                    <Input
                      placeholder="Last Name"
                      value={values.lastName}
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
                <FormGroup className="mb-3 focused">
                  <InputGroup className="input-group-merge input-group-alternative">
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
                <FormGroup className="mb-3 focused">
                  <InputGroup className="input-group-merge input-group-alternative">
                    <Input
                      placeholder="Phone number"
                      value={values.phoneNumber}
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
                <FormGroup className="mb-3 focused">
                  <InputGroup className="input-group-merge input-group-alternative">
                    <select
                      className="form-control "
                      name="userAccessType"
                      value={values.userAccessType}
                      onChange={(e) => handleSelectDefault(e, "userAccessType")}
                    >
                      <option value="">Select User Type</option>
                      <option value="buyer">Buyer</option>
                    </select>
                  </InputGroup>
                  {errors.userAccessType && (
                    <span className="error">{errors.userAccessType}</span>
                  )}
                </FormGroup>
                {!values.id && (
                  <FormGroup className="mb-3 focused">
                    <InputGroup className="input-group-merge input-group-alternative">
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
                )}
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit">
                    {isLoading ? <Spinner size="sm" /> : "Save"}
                  </Button>
                  <Button
                    className="my-4"
                    color="secondary"
                    type="button"
                    onClick={() => closeModal()}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </div>
      </Modal>
    </>
  );
};

export default UserForm;
