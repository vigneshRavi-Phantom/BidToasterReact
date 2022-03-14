import { useState } from "react";
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
import { orgVendorValidate } from "helpers/validateRules";
import { StringMap } from "helpers/interfaces";
import { useModal } from "contexts/ModalContextProvider";
import userService from "services/userService";
import { errorCode } from "utils/ServiceAPIUtil";
import { useLocalization } from "contexts/LocalizationContextProvider";
import { useAuth } from "contexts/AuthContextProvider";

const initialValues: StringMap = {
  email: "",
};

const OrgVendorForm = (props: any) => {
  const { inputResponse } = props;
  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    handleSubmitCB,
    orgVendorValidate
  );
  const [isLoading, setIsLoading] = useState(false);
  const [globalErrMsg, setGlobalErrMsg] = useState("");
  const { isModal, closeModal }: any = useModal();
  const { CreateOrgVendor } = userService();
  const { strings }: any = useLocalization();
  const { accountProfile } = useAuth();

  function handleSubmitCB() {
    setIsLoading(true);
    if (accountProfile) {
      CreateOrgVendor({
        orgId: accountProfile.userAccessType === "organization" ? accountProfile.id : accountProfile.orgId,
        email: values.email,
      })
        .then((res) => {
          inputResponse("add");
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
                {values.id ? "Update Vendor" : "Add Vendor"}
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

export default OrgVendorForm;
