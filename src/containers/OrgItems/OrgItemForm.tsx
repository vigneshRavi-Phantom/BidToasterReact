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
import { orgItemValidate } from "helpers/validateRules";
import { StringMap } from "helpers/interfaces";
import { useModal } from "contexts/ModalContextProvider";
import { useAuth } from "contexts/AuthContextProvider";
import orgItemService from "services/orgItemService";
import { errorCode } from "utils/ServiceAPIUtil";
import { useLocalization } from "contexts/LocalizationContextProvider";

const initialValues: StringMap = {
  id: null,
  orgId: null,
  itemName: "",
  itemCode: "",
};

const OrgItemForm = (props: any) => {
  const { inputResponse } = props;
  const { values, errors, handleChange, handleSubmit, setUpdateValue } =
    useForm(initialValues, handleSubmitCB, orgItemValidate);
  const [isLoading, setIsLoading] = useState(false);
  const [globalErrMsg, setGlobalErrMsg] = useState("");
  const { isModal, closeModal, modalData }: any = useModal();
  const { CreateOrgItem, UpdateOrgItem } = orgItemService();
  const { strings }: any = useLocalization();
  const { accountProfile } = useAuth();

  function handleSubmitCB() {
    if (accountProfile && accountProfile.id) {
      setIsLoading(true);
      const formAction = values.id ? UpdateOrgItem : CreateOrgItem;
      formAction({
        id: values.id,
        orgId: accountProfile.id,
        itemName: values.itemName,
        itemCode: values.itemCode,
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
                {values.id ? "Update Item" : "Add Item"}
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
                      placeholder="Item Name"
                      value={values.itemName}
                      type="text"
                      onChange={handleChange}
                      name="itemName"
                      autoComplete="off"
                    />
                  </InputGroup>
                  {errors.itemName && (
                    <span className="error">{errors.itemName}</span>
                  )}
                </FormGroup>
                <FormGroup className="mb-3 focused">
                  <InputGroup className="input-group-merge input-group-alternative">
                    <Input
                      placeholder="Item Code"
                      value={values.itemCode}
                      type="text"
                      onChange={handleChange}
                      name="itemCode"
                      autoComplete="off"
                    />
                  </InputGroup>
                  {errors.itemCode && (
                    <span className="error">{errors.itemCode}</span>
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

export default OrgItemForm;
