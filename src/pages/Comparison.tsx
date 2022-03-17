import { useState, useEffect, useRef } from "react";
import classnames from "classnames";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Container,
  Row,
  Col,
  Spinner,
  CardHeader,
} from "reactstrap";
import { useAuth } from "contexts/AuthContextProvider";
import useForm from "helpers/useForm";
import rfqService from "services/rfqService";
import { useNavigate } from "react-router-dom";
import { comparisonValidate } from "helpers/validateRules";
import { useLocalization } from "contexts/LocalizationContextProvider";
import { errorCode } from "utils/ServiceAPIUtil";
import "react-datetime/css/react-datetime.css";
import Layout from "containers/Layout/Layout";
import SimpleHeader from "containers/Admin/SimpleHeader";
import toaster from "components/toaster";
import { v4 as uuidv4 } from "uuid";
import { getComparisonData } from "utils/CommonUtils";
import moment from "moment";
import { CSVLink } from "react-csv";

const initialValues: any = {
  id: null,
  vendorName: "",
  comparisonName: "RFQ Comparison",
  buyerCompareType: "description",
  vendorCompareType: "fileupload",
  buyerDescription: [],
  vendorDescription: [],

  buyerFileAttachment: [],
  vendorFileAttachment: [],
};
function ComparisonPage() {
  const { userAccessType, accountProfile } = useAuth();
  const navigate = useNavigate();
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setUpdateValue,
    resetForm,
  } = useForm(initialValues, handleSubmitCB, comparisonValidate);
  const { CompareRfq } = rfqService();
  const [loading, setLoading] = useState(false);
  const [buyerDesArr, setBuyerDesArr] = useState<any>([]);
  const [vendorDesArr, setVendorDesArr] = useState<any>([]);
  const [rfqCSVHeaders, setRfqCSVHeaders] = useState<any>([]);
  const [rfqCSVData, setRfqCSVData] = useState<any>([]);
  const { strings }: any = useLocalization();
  const csvInstance = useRef<any | null>(null);

  useEffect(() => {
    if (userAccessType !== "buyer") {
      userAccessType == "vendor"? navigate("/rfq"): navigate("/users")
    }
    // eslint-disable-next-line
  }, [userAccessType]);

  function handleSubmitCB() {
    setLoading(true);
    if (values.vendorDescription.length > 0) {
      // for(const [vendorDesKey] of values.vendorDescription) {
      //   values.vendorDescription[vendorDesKey]['vendorName'] = values.vendorName;
      // }
      values.vendorDescription.forEach((element: any, index: number) => {
        values.vendorDescription[index]["vendorName"] = values.vendorName;
      });
    }

    const formValues = {
      createdBuyerId: accountProfile && accountProfile.id,
      orgId: accountProfile && accountProfile.orgId,
      vendorName: values.vendorName,
      comparisonName: values.comparisonName,
      buyerCompareType: values.buyerCompareType,
      vendorCompareType: values.vendorCompareType,
      buyerDescription: JSON.stringify(values.buyerDescription),
      vendorDescription: JSON.stringify(values.vendorDescription),

      buyerFileAttachment: values.buyerFileAttachment,
      vendorFileAttachment: values.vendorFileAttachment,
    };
    CompareRfq(formValues)
      .then((res: any) => {
        if (res.length > 0) {
          handleComparisonData(res);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        toaster.notify(
          strings["error." + errorCode(err)] || strings["error.e10100"],
          {
            position: "top-right",
            type: "error",
          }
        );
        setLoading(false);
      });
  }

  const handleComparisonData = async (res: any) => {
    if (res.length > 0) {
      try {
        const resData = res[0];
        const reqValues = {
          comparisonName: resData.comparisonName,
          comparisonDate: moment().format("YYYY-MM-DD hh:mm:ss"),
          buyerDescription: resData.buyerDescription,
          buyerFileupload: resData.buyerFileupload,
          vendorDescription: resData.vendorDescription,
          vendorFileupload: resData.vendorFileupload,
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
            formReset();
            toaster.notify("Comparison was done.", {
              position: "top-right",
              type: "success",
            });
          }, 500);
        } else {
          toaster.notify("No Data Found.", {
            position: "top-right",
            type: "error",
          });
          setLoading(false);
          formReset();
        }
      } catch (error) {
        toaster.notify("Something went wrong", {
          position: "top-right",
          type: "error",
        });
        setLoading(false);
        formReset();
      }
    }
  };

  const formReset = () => {
    resetForm();
    setBuyerDesArr([]);
    setVendorDesArr([]);
    const buyerFileId = window.document.getElementById(
      "buyerFileId"
    ) as any;
    if (buyerFileId !== null) {
      buyerFileId.value = "";
    }
    const vendorFileId = window.document.getElementById(
      "vendorFileId"
    ) as any;
    if (vendorFileId !== null) {
      vendorFileId.value = "";
    }
  };

  const removeBuyerDesc = (key: string) => {
    const newBuyerDesArr = buyerDesArr.filter((v: any) => v.key !== key);
    setBuyerDesArr(newBuyerDesArr);
    setUpdateValue("buyerDescription", newBuyerDesArr);
  };

  const addBuyerDesc = () => {
    const newBuyerDesArr = [...buyerDesArr, { key: uuidv4(), description: "" }];
    setBuyerDesArr(newBuyerDesArr);
  };

  const handleBuyerDescChange = (e: any, key: string) => {
    const modifiedData = buyerDesArr.map((i: any) => {
      if (key === i.key) {
        i.description = e.target.value;
        return i;
      } else {
        return i;
      }
    });
    setBuyerDesArr(modifiedData);
    setUpdateValue("buyerDescription", modifiedData);
  };

  const removeVendorDesc = (key: number) => {
    const newVendorDesArr = vendorDesArr.filter((v: any) => v.key !== key);
    setVendorDesArr(newVendorDesArr);
    setUpdateValue("vendorDescription", newVendorDesArr);
  };

  const addVendorDesc = () => {
    const newVendorDesArr = [
      ...vendorDesArr,
      { key: uuidv4(), description: "" },
    ];
    setVendorDesArr(newVendorDesArr);
  };

  const handleVendorDescChange = (e: any, key: string) => {
    const modifiedData = vendorDesArr.map((i: any) => {
      if (key === i.key) {
        i.description = e.target.value;
        return i;
      } else {
        return i;
      }
    });
    setVendorDesArr(modifiedData);
    setUpdateValue("vendorDescription", modifiedData);
  };

  return (
    <>
      <Layout>
        <SimpleHeader name="Comparison" parentName="Admin" />
        <Container className="mt--6" fluid>
          <Row className="justify-content-center">
            <Col lg="10" md="7">
              <Card className="bg-secondary border-0 mb-0">
                <CardHeader>
                  <Row>
                    <Col xs="6">
                      <h3 className="mb-0">Comparison</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <Form role="form" onSubmit={handleSubmit}>
                    <Row className="justify-content-center">
                      <Col lg="6" md="7">
                        <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Vendor Name"
                              value={values.vendorName}
                              type="text"
                              onChange={handleChange}
                              name="vendorName"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.vendorName && (
                            <span className="error">{errors.vendorName}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="6" md="7"></Col>
                    </Row>
                    <Row className="justify-content-center">
                      <Col lg="6" md="7">
                        <Card className="bg-secondary border-0 mb-0">
                          <CardBody>
                            <Row>
                              <Col
                                lg="12"
                                md="7"
                                className="justify-content-center text-center"
                              >
                                <h3>RFP or Requirement document</h3>
                              </Col>
                            </Row>
                            <Row className="justify-content-center text-center">
                              <Col lg="6" md="7">
                                <FormGroup className="mb-3 focused">
                                  <div>
                                    <label className="lb-txt">
                                      File Upload
                                    </label>
                                  </div>
                                  <Input
                                    type="radio"
                                    id="yes"
                                    name="buyerCompareType"
                                    checked={
                                      values.buyerCompareType === "fileupload"
                                    }
                                    onClick={() => {
                                      setBuyerDesArr([]);
                                      setUpdateValue(
                                        "buyerCompareType",
                                        "fileupload"
                                      );
                                    }}
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="6" md="7">
                                <FormGroup className="mb-3 focused">
                                  <div>
                                    <label className="lb-txt">
                                      Enter Description
                                    </label>
                                  </div>
                                  <Input
                                    type="radio"
                                    id="yes"
                                    name="buyerCompareType"
                                    checked={
                                      values.buyerCompareType === "description"
                                    }
                                    onClick={() =>
                                      setUpdateValue(
                                        "buyerCompareType",
                                        "description"
                                      )
                                    }
                                  />
                                </FormGroup>
                              </Col>
                              {errors.buyerCompareType && (
                                <span className="error">
                                  {errors.buyerCompareType}
                                </span>
                              )}
                            </Row>
                            <br />
                            <Row className="justify-content-center text-center">
                              <Col lg="12" md="7">
                                <FormGroup
                                  className={classnames("mb-3 focused")}
                                >
                                  <InputGroup className="input-group-merge input-group-alternative">
                                    <Input
                                      multiple
                                      accept=".docx, .pdf, .xlsx"
                                      className="form-control form-control-lg"
                                      type="file"
                                      name="buyerFileAttachment"
                                      onChange={(e) =>
                                        setUpdateValue(
                                          "buyerFileAttachment",
                                          e.target.files
                                        )
                                      }
                                      disabled={
                                        values.buyerCompareType ===
                                        "description"
                                      }
                                      id="buyerFileId"
                                    />
                                  </InputGroup>
                                  {errors.buyerFileAttachment && (
                                    <span className="error">
                                      {errors.buyerFileAttachment}
                                    </span>
                                  )}
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row className="justify-content-center text-right mt-1 mb-3">
                              <Col lg="12" md="7">
                                <Button
                                  onClick={addBuyerDesc}
                                  disabled={
                                    values.buyerCompareType === "fileupload"
                                  }
                                >
                                  Add Description
                                </Button>
                              </Col>
                            </Row>
                            {buyerDesArr.length > 0 &&
                              buyerDesArr.map((value: any, i: number) => {
                                return (
                                  <Row
                                    className="justify-content-center text-center"
                                    key={i}
                                  >
                                    <Col lg="10" md="7">
                                      <FormGroup
                                        className={classnames("mb-3 focused")}
                                      >
                                        <InputGroup className="input-group-merge input-group-alternative">
                                          <Input
                                            className="form-control form-control-lg"
                                            type="textarea"
                                            onChange={(e) =>
                                              handleBuyerDescChange(
                                                e,
                                                value.key
                                              )
                                            }
                                            value={value.description}
                                            rows={5}
                                            placeholder="Processor i5, ram 8g, HDD 1TB, GPU RTX, SSD 512GB, Quantity 1, UnitPrice 100, TotalPrice 100"
                                          />
                                        </InputGroup>
                                      </FormGroup>
                                    </Col>
                                    <Col lg="2" md="7" className="v-center">
                                      <Button
                                        color="danger"
                                        href="/#"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          removeBuyerDesc(value.key);
                                        }}
                                      >
                                        -
                                      </Button>
                                    </Col>
                                  </Row>
                                );
                              })}
                            {errors.buyerDescription && (
                              <span className="error">
                                {errors.buyerDescription}
                              </span>
                            )}
                          </CardBody>
                        </Card>
                      </Col>

                      <Col lg="6" md="7">
                        <Card className="bg-secondary border-0 mb-0">
                          <CardBody>
                            <Row>
                              <Col
                                lg="12"
                                md="7"
                                className="justify-content-center text-center"
                              >
                                <h3>Supplier Quotation</h3>
                              </Col>
                            </Row>
                            <Row className="justify-content-center text-center">
                              <Col lg="6" md="7">
                                <FormGroup className="mb-3 focused">
                                  <div>
                                    <label className="lb-txt">
                                      File Upload
                                    </label>
                                  </div>
                                  <Input
                                    type="radio"
                                    id="yes"
                                    name="vendorCompareType"
                                    checked={
                                      values.vendorCompareType === "fileupload"
                                    }
                                    onClick={() => {
                                      setVendorDesArr([]);
                                      setUpdateValue(
                                        "vendorCompareType",
                                        "fileupload"
                                      );
                                    }}
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="6" md="7">
                                <FormGroup className="mb-3 focused">
                                  <div>
                                    <label className="lb-txt">
                                      Enter Description
                                    </label>
                                  </div>
                                  <Input
                                    type="radio"
                                    id="yes"
                                    name="vendorCompareType"
                                    checked={
                                      values.vendorCompareType === "description"
                                    }
                                    onClick={() =>
                                      setUpdateValue(
                                        "vendorCompareType",
                                        "description"
                                      )
                                    }
                                  />
                                </FormGroup>
                              </Col>
                              {errors.vendorCompareType && (
                                <span className="error">
                                  {errors.vendorCompareType}
                                </span>
                              )}
                            </Row>
                            <br />
                            <Row className="justify-content-center text-center">
                              <Col lg="12" md="7">
                                <FormGroup
                                  className={classnames("mb-3 focused")}
                                >
                                  <InputGroup className="input-group-merge input-group-alternative">
                                    <Input
                                      multiple
                                      accept=".docx, .pdf, .xlsx"
                                      className="form-control form-control-lg"
                                      type="file"
                                      name="vendorFileAttachment"
                                      onChange={(e) =>
                                        setUpdateValue(
                                          "vendorFileAttachment",
                                          e.target.files
                                        )
                                      }
                                      disabled={
                                        values.vendorCompareType ===
                                        "description"
                                      }
                                      id="vendorFileId"
                                    />
                                  </InputGroup>
                                  {errors.vendorFileAttachment && (
                                    <span className="error">
                                      {errors.vendorFileAttachment}
                                    </span>
                                  )}
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row className="justify-content-center text-right mt-1 mb-3">
                              <Col lg="12" md="7">
                                <Button
                                  onClick={addVendorDesc}
                                  disabled={
                                    values.vendorCompareType === "fileupload"
                                  }
                                >
                                  Add Description
                                </Button>
                              </Col>
                            </Row>
                            {vendorDesArr.length > 0 &&
                              vendorDesArr.map((value: any, i: number) => {
                                return (
                                  <Row
                                    className="justify-content-center text-center"
                                    key={i}
                                  >
                                    <Col lg="10" md="7">
                                      <FormGroup
                                        className={classnames("mb-3 focused")}
                                      >
                                        <InputGroup className="input-group-merge input-group-alternative">
                                          <Input
                                            className="form-control form-control-lg"
                                            type="textarea"
                                            onChange={(e) =>
                                              handleVendorDescChange(
                                                e,
                                                value.key
                                              )
                                            }
                                            value={value.description}
                                            rows={5}
                                            placeholder="Processor i5, ram 8g, HDD 1TB, GPU RTX, SSD 512GB"
                                          />
                                        </InputGroup>
                                      </FormGroup>
                                    </Col>
                                    <Col lg="2" md="7" className="v-center">
                                      <Button
                                        color="danger"
                                        href="/#"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          removeVendorDesc(value.key);
                                        }}
                                      >
                                        -
                                      </Button>
                                    </Col>
                                  </Row>
                                );
                              })}
                            {errors.vendorDescription && (
                              <span className="error">
                                {errors.vendorDescription}
                              </span>
                            )}
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>

                    <Row className="justify-content-center">
                      <Col lg="5" md="7"></Col>
                      <Col xs="10">
                        <div className="text-center">
                          <Button className="my-4" color="info" type="submit">
                            {loading ? <Spinner size="sm" /> : "Compare"}
                          </Button>
                          <CSVLink
                            headers={rfqCSVHeaders}
                            data={rfqCSVData}
                            filename={values.vendorName}
                            ref={csvInstance}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
}

export default ComparisonPage;
