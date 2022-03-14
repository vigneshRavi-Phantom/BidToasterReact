import React, { useState } from "react";
import {
  Button,
  Modal,
  Row,
  Col,
  Spinner,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import { useModal } from "contexts/ModalContextProvider";
import { useLocalization } from "contexts/LocalizationContextProvider";

interface DeleteModalProps {
  delText?: String;
  deleteIt: Function;
}

const DeleteModal: React.FC<DeleteModalProps> = (props) => {
  const { closeDeleteModal, isDeleteModal } = useModal();
  const { strings }: any = useLocalization();
  const [loading, setLoading] = useState(false);

  return (
    <Modal
      className="modal-dialog-centered confirm-modal"
      isOpen={isDeleteModal}
    >
      <div className="modal-body1">
        <Card className="bg-secondary border-0 mb-0">
          <CardHeader className="bg-transparent">
            <div className="text-center">Warning!</div>
          </CardHeader>
          <CardBody>
            <Row>
              <Col lg="12" className="text-center pb-4 pt-2">
                {" "}
                {props.delText ? props.delText : strings["are_you_sure"]}
              </Col>
            </Row>
            <Row className="bg-transparent">
              <Col lg="12" className="text-center">
                <Button
                  color="secondary"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => closeDeleteModal()}
                >
                  Cancel
                </Button>
                <Button
                  color="warning"
                  type="button"
                  onClick={() => {
                    setLoading(true);
                    props.deleteIt();
                  }}
                  disabled={loading}
                >
                  {loading ? <Spinner size="sm" /> : "Delete"}
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
};

export default DeleteModal;
