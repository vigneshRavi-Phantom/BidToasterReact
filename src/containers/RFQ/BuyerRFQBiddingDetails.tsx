import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Layout from "containers/Layout/Layout";
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  CardBody,
  FormGroup,
  Table,
  Spinner,
  Button,
  Input,
} from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import SimpleHeader from "containers/Admin/SimpleHeader";
import rfqService from "services/rfqService";
import { useAuth } from "contexts/AuthContextProvider";
import { getComparisonData } from "utils/CommonUtils";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { CSVLink } from "react-csv";
import toaster from "components/toaster";

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function RFQDetailsPage() {
  const { GetRfqDetails, AddVendorToRFQ } = rfqService();
  const navigate = useNavigate();
  const { accountProfile } = useAuth();
  const [rfqDetailsList, setRfqDetailsList] = useState<any>({});
  const { id: viewParamId } = useParams();
  const [rfqCSVHeaders, setRfqCSVHeaders] = useState([]);
  const [rfqCSVData, setRfqCSVData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isVendorLoading, setIsVendorLoading] = useState(false);
  const [newVendorEmail, setNewVendorEmail] = useState("");
  const csvInstance = useRef<any | null>(null);

  useEffect(() => {
    if (accountProfile && accountProfile.userAccessType === "vendor")
      navigate("/dashboard");

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (viewParamId && accountProfile && accountProfile.orgId) {
      getRfqDetails({
        id: parseInt(viewParamId, 10),
        orgId: accountProfile.orgId,
        vendorId: null,
        buyerId: accountProfile.id,
      });
    } else {
      navigate("/rfq");
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewParamId]);

  const getRfqDetails = async ({
    id,
    orgId,
    vendorId,
    buyerId,
  }: {
    id: number;
    orgId: number;
    vendorId: number | null;
    buyerId: number | null;
  }) => {
    const GetRfqDetailsData = await GetRfqDetails({
      id,
      orgId,
      vendorId,
      buyerId,
    });
    if (GetRfqDetailsData.data && GetRfqDetailsData.data.length > 0) {
      setRfqDetailsList(GetRfqDetailsData.data[0]);
    } else {
      navigate("/rfq");
    }
  };

  const handleDownloadComparison = async () => {
    if (
      rfqDetailsList.biddingDetails &&
      rfqDetailsList.biddingDetails.length > 0
    ) {
      let buyerDescription: any[] = [];
      let buyerFileupload: any[] = [];
      let vendorDescription: any[] = [];
      let vendorFileupload: any[] = [];

      for (const vendorListItem of rfqDetailsList.biddingDetails) {
        if (vendorListItem.biddingProposalFileUrl) {
          vendorFileupload.push({
            key: uuidv4(),
            fileUrl: vendorListItem.biddingProposalFileUrl,
            vendorName: vendorListItem.firstName + " " + vendorListItem.lastName,
          });
        }
        if (vendorListItem.biddingDescription) {
          var additionalDesc = ` Quantity ${vendorListItem.biddingQuantity}, UnitPrice ${vendorListItem.biddingUnitPrice}, TotalPrice ${vendorListItem.biddingTotalPrice} `;
          vendorDescription.push({
            key: uuidv4(),
            description: vendorListItem.biddingDescription + additionalDesc,
            vendorName: vendorListItem.firstName + " " + vendorListItem.lastName,
          });
        }
      }

      if (rfqDetailsList.proposalDocFileUrl) {
        buyerFileupload = [
          {
            key: uuidv4(),
            fileUrl: rfqDetailsList.proposalDocFileUrl,
          },
        ];
      }

      if (rfqDetailsList.description) {
        buyerFileupload = [];
        buyerDescription = [
          {
            key: uuidv4(),
            description: rfqDetailsList.description,
          },
        ];
      }

      try {
        const reqValues = {
          comparisonName: "RFQ Comparison",
          comparisonDate: moment().format("YYYY-MM-DD hh:mm:ss"),
          buyerDescription: buyerDescription,
          buyerFileupload: buyerFileupload,
          vendorDescription: vendorDescription,
          vendorFileupload: vendorFileupload,
        };
        setLoading(true);
        const { data: rfqData } = await getComparisonData(reqValues);
        const { headers, data } = rfqData;
        if (data && headers) {
          setRfqCSVHeaders(headers);
          setRfqCSVData(data);
          setLoading(false);
          setTimeout(() => {
            csvInstance.current.link.click();
            setRfqCSVHeaders([]);
            setRfqCSVData([]);
          }, 500);
        } else {
          toaster.notify("No Data Found.", {
            position: "top-right",
            type: "error",
          });
          setLoading(false);
        }
      } catch (error) {
        toaster.notify("Something went wrong", {
          position: "top-right",
          type: "error",
        });
        setLoading(false);
      }
    }
  };

  const handleAddVendor = async () => {
    if (newVendorEmail && viewParamId) {
      const vendorIdsArr = rfqDetailsList.vendorIds;
      if (vendorIdsArr.includes(newVendorEmail)) {
        toaster.notify("vendor already added to this RFQ", {
          position: "top-right",
          type: "error",
        });
      } else {
        setIsVendorLoading(true);
        const dataRes = await AddVendorToRFQ({
          email: newVendorEmail.toLowerCase(),
          rfqId: parseInt(viewParamId, 10),
        });
        console.log('dataRes', dataRes)
        if (dataRes && dataRes.length > 0) {
          toaster.notify("Vendor was added", {
            position: "top-right",
            type: "success",
          });
          setNewVendorEmail("");
          setIsVendorLoading(false);
          getRfqDetails({
            id: parseInt(viewParamId, 10),
            orgId: accountProfile && accountProfile.orgId,
            vendorId: null,
            buyerId: accountProfile && accountProfile.id,
          });
        }
      }
    }
  };

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
              <Row className="v-center">
                <Col xs="4">
                  <Input
                    placeholder="Vendor Email"
                    value={newVendorEmail}
                    type="text"
                    onChange={(e) => setNewVendorEmail(e.target.value)}
                    autoComplete="off"
                  />
                </Col>
                <Col xs="4">
                  <Button
                    className="my-4"
                    color="primary"
                    type="button"
                    disabled={
                      newVendorEmail === "" || !validateEmail(newVendorEmail)
                    }
                    onClick={handleAddVendor}
                  >
                    {isVendorLoading ? <Spinner size="sm" /> : "Add Vendor"}
                  </Button>
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
                  {rfqDetailsList.isProposalDoc ==='yes'?
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
                  </FormGroup> :
                  <FormGroup>
                    <label className="form-control-label">Description</label>
                    <span className="disable">
                      {rfqDetailsList.description}
                    </span>
                  </FormGroup>
                  }
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
                    <label className="form-control-label">
                      Purchase Request Number
                    </label>
                    <span className="disable">
                      {rfqDetailsList.purchaseRequestNumber}
                    </span>
                  </FormGroup>
                </Col>
                <Col lg="5">
                <FormGroup>
                    <label className="form-control-label">Vendors</label>
                    <span className="disable">
                      {rfqDetailsList.vendorIds &&
                      rfqDetailsList.vendorIds.length > 0
                        ? rfqDetailsList.vendorIds.join(", ")
                        : rfqDetailsList.vendorIds}
                    </span>
                  </FormGroup>
                </Col>
              </Row>
              {/* <Row className="row-example">
                <Col lg="5">
                  <FormGroup>
                    <label className="form-control-label">Vendors</label>
                    <span className="disable">
                      {rfqDetailsList.vendorIds &&
                      rfqDetailsList.vendorIds.length > 0
                        ? rfqDetailsList.vendorIds.join(", ")
                        : rfqDetailsList.vendorIds}
                    </span>
                  </FormGroup>
                </Col>
              </Row> */}

              <hr />
              <CardHeader className="border-0">
                <Row>
                  <Col lg="6" xs="6">
                    <h3>Bidding Details</h3>
                  </Col>
                  <Col lg="6" xs="6" className="text-right">
                    {rfqDetailsList.biddingDetails &&
                      rfqDetailsList.biddingDetails.length > 0 && (
                        <h3>
                          <Button onClick={() => handleDownloadComparison()}>
                            {loading ? <Spinner size="sm" /> : "Compare"}
                          </Button>
                          <CSVLink
                            headers={rfqCSVHeaders}
                            data={rfqCSVData}
                            filename="RFQ-Comparison"
                            ref={csvInstance}
                          />
                        </h3>
                      )}
                  </Col>
                </Row>
              </CardHeader>

              <Table
                className="align-items-center table-flush"
                responsive
                striped
              >
                <thead className="thead-light">
                  <tr>
                    <th>Vendor</th>
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
                          <td>{item.firstName + " " + item.lastName}</td>
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
                                File
                              </a>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  {rfqDetailsList.biddingDetails &&
                    rfqDetailsList.biddingDetails.length === 0 && (
                      <tr>
                        <td colSpan={5}>No Bidding Found.</td>
                      </tr>
                    )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Container>
      </Layout>
    </>
  );
}

export default RFQDetailsPage;
