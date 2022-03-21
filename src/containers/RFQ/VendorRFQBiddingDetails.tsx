import { useEffect, useState } from "react";
import Layout from "containers/Layout/Layout";
import {
  Button,
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  Input,
  CardBody,
  FormGroup,
  Form,
  Spinner,
  Table,
} from "reactstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import SimpleHeader from "containers/Admin/SimpleHeader";
import rfqService from "services/rfqService";
import toaster from "components/toaster";
import { useAuth } from "contexts/AuthContextProvider";
import moment from "moment";
import { StringMap } from "helpers/interfaces";
import { useLocalization } from "contexts/LocalizationContextProvider";
import useForm from "helpers/useForm";
import { errorCode } from "utils/ServiceAPIUtil";
import { rfqBiddingDetailsValidate } from "helpers/validateRules";

const initialValues: StringMap = {
  id: null,
  biddingProposalDocAttachment: [],
  biddingDescription: "",
  biddingQuantity: "",
  biddingUnitPrice: "",
  biddingTotalPrice: 0,
  bidType: "",
  contentType: "fileupload",
};

function RFQDetailsPage() {
  const { CreateRfqBiddingDetails, GetRfqDetails } = rfqService();
  const navigate = useNavigate();
  const { accountProfile } = useAuth();
  const [rfqDetailsList, setRfqDetailsList] = useState<any>({});
  const {
    values,
    errors,
    handleChange,
    handleNumberChange,
    handleSubmit,
    setUpdateValue,
  } = useForm(initialValues, handleSubmitCB, rfqBiddingDetailsValidate);
  const { strings }: any = useLocalization();
  const [isLoading, setIsLoading] = useState(false);
  const [globalErrMsg, setGlobalErrMsg] = useState("");

  const { id: viewParamId } = useParams();

  useEffect(() => {
    if (accountProfile && accountProfile.userAccessType === "buyer")
      navigate("/dashboard");

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (viewParamId && accountProfile) {
      getRfqDetails({
        id: parseInt(viewParamId, 10),
        orgId: null,
        vendorId: accountProfile.id,
        buyerId: null,
      });
    } else {
      navigate("/rfq");
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewParamId]);

  useEffect(() => {
    const quantityVal = values.biddingQuantity;
    const unitPriceVal = values.biddingUnitPrice;
    if (!isNaN(quantityVal) && !isNaN(unitPriceVal)) {
      const totalPriceVal = quantityVal * unitPriceVal;
      setUpdateValue("biddingTotalPrice", totalPriceVal.toString());
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.biddingQuantity, values.biddingUnitPrice]);

  const getRfqDetails = async ({
    id,
    orgId,
    vendorId,
    buyerId,
  }: {
    id: number;
    orgId: number | null;
    vendorId: number | null;
    buyerId: number | null;
  }) => {
    const GetRfqDetailsData = await GetRfqDetails({
      id,
      orgId,
      vendorId,
      buyerId,
    });
    if (
      GetRfqDetailsData &&
      GetRfqDetailsData.data &&
      GetRfqDetailsData.data.length > 0
    ) {
      setRfqDetailsList(GetRfqDetailsData.data[0]);
      setUpdateValue("bidType", GetRfqDetailsData.data[0].bidType);
    } else {
      // navigate("/rfq");
    }
  };

  function handleSubmitCB() {
    if (accountProfile) {
      setIsLoading(true);
      const formValues = {
        rfqId: rfqDetailsList.id,
        orgId: rfqDetailsList.orgId,
        biddingProposalDocAttachment: values.biddingProposalDocAttachment,
        biddingQuantity: values.biddingQuantity,
        biddingDescription: values.biddingDescription,
        biddingUnitPrice: values.biddingUnitPrice,
        biddingTotalPrice: values.biddingTotalPrice,
      };
      CreateRfqBiddingDetails(formValues)
        .then(() => {
          toaster.notify("Bidding details was added", {
            position: "top-right",
            type: "success",
          });
          setIsLoading(false);
          navigate("/rfq");
        })
        .catch((err) => {
          setGlobalErrMsg(
            strings["error." + errorCode(err)] || strings["error.e10100"]
          );
          setIsLoading(false);
        });
    } else {
      setGlobalErrMsg(strings["error.e10100"]);
    }
  }

  if (!rfqDetailsList || !accountProfile) return null;

  return (
    <>
      <Layout>
        <SimpleHeader name="RFQ Details" parentName="Admin" />
        <Container className="mt--6" fluid>
          <Card>
            <CardHeader className="border-0">
              <Row>
                <Col xs="6">
                  <h3>RFQ Details</h3>
                </Col>
                <Col xs="6" className="text-right">
                  <Link to="/rfq" className="btn btn-secondary">
                    GO BACK
                  </Link>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Row className="row-example">
                <Col lg="5">
                  <FormGroup>
                    <label className="form-control-label">RFQ Code</label>
                    <span className="disable">{rfqDetailsList.rfqCode}</span>
                  </FormGroup>
                </Col>
                <Col lg="5">
                  <FormGroup>
                    <label className="form-control-label">Bid Type</label>
                    <span className="disable">{rfqDetailsList.bidType}</span>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="row-example">
                <Col lg="5">
                  <FormGroup>
                    <label className="form-control-label">Item Name</label>
                    <span className="disable">{rfqDetailsList.itemName}</span>
                  </FormGroup>
                </Col>
                <Col lg="5">
                  <FormGroup>
                    <label className="form-control-label">Item Code</label>
                    <span className="disable">{rfqDetailsList.itemCode}</span>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="row-example">
                <Col lg="5">
                  <FormGroup>
                    <label className="form-control-label">HSN Code</label>
                    <span className="disable">{rfqDetailsList.hsnCode}</span>
                  </FormGroup>
                </Col>
                <Col lg="5">
                  <FormGroup>
                    <label className="form-control-label">UNSPSC Code</label>
                    <span className="disable">{rfqDetailsList.unspscCode}</span>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="row-example">
                <Col lg="5">
                  <FormGroup>
                    <label className="form-control-label">
                      Upload Proposal Document
                    </label>
                    <span className="disable">
                      {rfqDetailsList.isProposalDoc}{" "}
                      {rfqDetailsList.proposalDocFileUrl && (
                        <a
                          href={rfqDetailsList.proposalDocFileUrl}
                          target={"_blank"}
                          rel="noreferrer"
                        >
                          View File
                        </a>
                      )}
                    </span>
                  </FormGroup>
                </Col>
                <Col lg="5">
                  <FormGroup>
                    <label className="form-control-label">Quantity</label>
                    <span className="disable">{rfqDetailsList.quantity}</span>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="row-example">
                <Col lg="5">
                  <FormGroup>
                    <label className="form-control-label">UOM</label>
                    <span className="disable">{rfqDetailsList.uom}</span>
                  </FormGroup>
                </Col>
                <Col lg="5">
                  <FormGroup>
                    <label className="form-control-label">Part Number</label>
                    <span className="disable">{rfqDetailsList.partNumber}</span>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="row-example">
                <Col lg="5">
                  <FormGroup>
                    <label className="form-control-label">Description</label>
                    <span className="disable">
                      {rfqDetailsList.description}
                    </span>
                  </FormGroup>
                </Col>
                <Col lg="5">
                  <FormGroup>
                    <label className="form-control-label">
                      Purchase Request Number
                    </label>
                    <span className="disable">
                      {rfqDetailsList.purchaseRequestNumber}
                    </span>
                  </FormGroup>
                </Col>
              </Row>

              <hr />
              <CardHeader className="border-0">
                <Row>
                  <Col xs="6">
                    <h3>Bidding Details</h3>
                  </Col>
                </Row>
              </CardHeader>
              {globalErrMsg !== "" && (
                <div
                  className="text-center mb-3 error"
                  style={{ color: "#B94A48" }}
                >
                  {globalErrMsg}
                </div>
              )}
              {rfqDetailsList.biddingDetails &&
                rfqDetailsList.biddingDetails.length > 0 && (
                  <Table
                    className="align-items-center table-flush"
                    responsive
                    striped
                  >
                    <thead className="thead-light">
                      <tr>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total Price</th>
                        <th>File</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rfqDetailsList.biddingDetails &&
                        rfqDetailsList.biddingDetails.length > 0 &&
                        rfqDetailsList.biddingDetails.map((item: any) => {
                          return (
                            <tr key={item.id}>
                              <td>{item.biddingQuantity}</td>
                              <td>{item.biddingUnitPrice}</td>
                              <td>{item.biddingTotalPrice}</td>
                              <td>
                                {item.biddingProposalFileUrl && (
                                  <a
                                    href={item.biddingProposalFileUrl}
                                    target={"_blank"}
                                    rel="noreferrer"
                                  >
                                    View
                                  </a>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                )}
              <Form role="form" onSubmit={handleSubmit}>
                <Row className="row-example">
                  <Col lg="5">
                    <FormGroup>
                      <label className="form-control-label">
                        Bid Start Date
                      </label>
                      <span className="disable">
                        {moment(rfqDetailsList.bidStartDate).format(
                          "DD-MM-YYYY"
                        )}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col lg="5">
                    <FormGroup>
                      <label className="form-control-label">Bid End Date</label>
                      <span className="disable">
                        {moment(rfqDetailsList.bidEndDate).format("DD-MM-YYYY")}
                      </span>
                    </FormGroup>
                  </Col>
                </Row>
                {moment(rfqDetailsList.bidEndDate).valueOf() >
                moment(rfqDetailsList.createdAt).valueOf() ? (
                  <>
                    <Row className="text-center">
                      <Col lg="2" md="7" >
                        <FormGroup className="mb-3 focused">
                          <div>
                            <label className="lb-txt">File Upload</label>
                          </div>
                          <Input
                            type="radio"
                            id="yes"
                            name="contentType"
                            checked={values.contentType === "fileupload"}
                            onClick={() => {
                              setUpdateValue("biddingDescription", "");
                              setUpdateValue("contentType", "fileupload");
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="2" md="7">
                        <FormGroup className="mb-3 focused">
                          <div>
                            <label className="lb-txt">Enter Description</label>
                          </div>
                          <Input
                            type="radio"
                            id="yes"
                            name="contentType"
                            checked={values.contentType === "description"}
                            onClick={() =>
                              setUpdateValue("contentType", "description")
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="row-example">
                      <Col lg="5">
                        <FormGroup>
                          <label className="form-control-label">
                            Bid Proposal Document
                          </label>
                          <Input
                            name="biddingProposalDocAttachment"
                            type="file"
                            className="form-control"
                            onChange={(e) =>
                              setUpdateValue(
                                "biddingProposalDocAttachment",
                                e.target.files
                              )
                            }
                            disabled={values.contentType === "description"}
                          />
                          {errors.biddingProposalDocAttachment && (
                            <label className="error">
                              {errors.biddingProposalDocAttachment}
                            </label>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="5">
                        <FormGroup>
                          <label className="form-control-label">
                            Description
                          </label>
                          <Input
                            placeholder="Processor i5, ram 8g, HDD 1TB, GPU RTX, SSD 512GB"
                            value={values.biddingDescription}
                            type="textarea"
                            autoComplete="off"
                            name="biddingDescription"
                            onChange={handleChange}
                            rows={5}
                            disabled={values.contentType === "fileupload"}
                          />
                          {errors.biddingDescription && (
                            <label className="error">
                              {errors.biddingDescription}
                            </label>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row className="row-example">
                      <Col lg="5">
                        <FormGroup>
                          <label className="form-control-label">Quantity</label>
                          <Input
                            placeholder="Quantity"
                            value={values.biddingQuantity}
                            type="text"
                            autoComplete="off"
                            name="biddingQuantity"
                            onChange={handleNumberChange}
                          />
                          {errors.biddingQuantity && (
                            <label className="error">
                              {errors.biddingQuantity}
                            </label>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="5">
                        <FormGroup>
                          <label className="form-control-label">
                            Unit Price
                          </label>
                          <Input
                            placeholder="Quantity"
                            value={values.biddingUnitPrice}
                            type="text"
                            autoComplete="off"
                            name="biddingUnitPrice"
                            onChange={handleNumberChange}
                          />
                          {errors.biddingUnitPrice && (
                            <label className="error">
                              {errors.biddingUnitPrice}
                            </label>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="row-example">
                      <Col lg="5">
                        <FormGroup>
                          <label className="form-control-label">
                            Total Price
                          </label>
                          <Input
                            placeholder="Total Price"
                            value={values.biddingTotalPrice}
                            type="text"
                            autoComplete="off"
                            name="biddingTotalPrice"
                            disabled={true}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="5"></Col>
                    </Row>
                    <div className="text-center">
                      <Button className="my-4" color="primary" type="submit">
                        {isLoading ? <Spinner size="sm" /> : "Save"}
                      </Button>
                      <Link
                        className="btn btn-secondary"
                        color="secondary"
                        to="/rfq"
                      >
                        Go Back
                      </Link>
                    </div>
                  </>
                ) : (
                  <Row>
                    <Col lg="12" className="text-center bold">
                      {" "}
                      RFQ quote submission date is closed.
                    </Col>
                  </Row>
                )}
              </Form>
            </CardBody>
          </Card>
        </Container>
      </Layout>
    </>
  );
}

export default RFQDetailsPage;
