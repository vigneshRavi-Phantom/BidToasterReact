import { useEffect, useState, useMemo } from "react";
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
  Col,
  Row,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import useForm from "helpers/useForm";
import { rfqFormValidate } from "helpers/validateRules";
import { StringMap } from "helpers/interfaces";
import { useModal } from "contexts/ModalContextProvider";
import { useAuth } from "contexts/AuthContextProvider";
import rfqServices from "services/rfqService";
import userServices from "services/userService";
import orgItemServices from "services/orgItemService";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import hsnDataList from "assets/json/hsn.json";
import unspscDataList from "assets/json/unspsc.json";
import { debounce } from "lodash";
import classnames from "classnames";
import moment from "moment";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useLocalization } from "contexts/LocalizationContextProvider";
import { errorCode } from "utils/ServiceAPIUtil";

const initialValues: StringMap = {
  id: null,
  itemName: "",
  itemCode: "",
  hsnCode: "",
  unspscCode: "",
  proposalDocAttachment: [],
  isProposalDoc: "no",
  quantity: "",
  uom: "",
  partNumber: "",
  description: "",
  purchaseRequestNumber: "",

  bidType: "",
  bidStartDate: new Date(),
  bidEndDate: "",
  vendorIds: [],
  vendorIdsVal: [],

  address1: "",
  address2: "",
  city: "",
  state: "",
  pincode: "",
  fax: "",
  phoneNumber: "",
};

const customStyles = {
  container: (provided: any) => ({
    ...provided,
    width: "100%",
  }),
};

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const RfqForm = (props: any) => {
  const { inputResponse } = props;
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setUpdateValue,
    handleSelectChange,
    handleMultiSelectChange,
    handleSelectDefault,
    handleNumberChange,
  } = useForm(initialValues, handleSubmitCB, rfqFormValidate);
  const [isLoading, setIsLoading] = useState(false);
  const [globalErrMsg, setGlobalErrMsg] = useState("");
  const [orgItemOptions, setOrgItemOptions] = useState<any[]>([]);
  const [hsnList, setHsnList] = useState<any[]>([]);
  const [unspscList, setUnspscList] = useState<any[]>([]);
  const [vendorList, setVendorList] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("1");
  const { isModal, closeModal, modalData }: any = useModal();
  const { GetOrgVendors } = userServices();
  const { GetOrgItems } = orgItemServices();
  const { CreateRfq, UpdateRfq } = rfqServices();
  const { accountProfile } = useAuth();
  const { strings }: any = useLocalization();

  useEffect(() => {
    if (accountProfile && accountProfile.orgId) {
      const getAllOrgItems = async () => {
        const orgItemParams = {
          search: {
            orgId: accountProfile.orgId,
          },
        };
        const allOrgItemsRes = await GetOrgItems(orgItemParams);
        const allOrgItemsArr: any[] = [];
        const allOrgItems = allOrgItemsRes.data ? allOrgItemsRes.data : [];

        if (allOrgItems.length > 0) {
          allOrgItems.forEach((element: any) => {
            let newObj = {
              value: element.itemName,
              label: element.itemName,
              code: element.itemCode,
            };
            allOrgItemsArr.push(newObj);
          });
        }
        setOrgItemOptions(allOrgItemsArr);
      };

      const getAllVendors = async () => {
        const vendorParams = {
          search: {
            orgId: accountProfile.orgId,
            userAccessType: "vendor",
          },
        };
        const allVendorsRes = await GetOrgVendors(vendorParams);
        const allVendors =
          allVendorsRes && allVendorsRes.data ? allVendorsRes.data : [];
        const allVendorsArr: any[] = [];
        if (allVendors.length > 0) {
          allVendors.forEach((element: any) => {
            let newObj = {
              value: element.email,
              label: element.email,
            };
            allVendorsArr.push(newObj);
          });
        }
        setVendorList(allVendorsArr);
      };

      getAllOrgItems();
      getAllVendors();
    }
    // eslint-disable-next-line
  }, []);

  function handleSubmitCB() {
    if (accountProfile && accountProfile.orgId) {
      let isVendorEmailErr = false;
      if (values.vendorIds.length > 0) {
        for (const vendorEmail of values.vendorIds) {
          if (!validateEmail(vendorEmail)) isVendorEmailErr = true;
        }
        if (isVendorEmailErr) {
          setGlobalErrMsg("Vendor email not valid");
          return null;
        } else {
          setGlobalErrMsg("");
        }
      }
      setIsLoading(true);
      const rfqInputForm = values.id ? UpdateRfq : CreateRfq;
      const formValues = {
        id: values.id,
        orgId: accountProfile.orgId,
        createdBuyerId: accountProfile.id,
        itemName: values.itemName,
        itemCode: values.itemCode,
        hsnCode: values.hsnCode,
        unspscCode: values.unspscCode,
        proposalDocAttachment: values.proposalDocAttachment,
        isProposalDoc: values.isProposalDoc,
        quantity: values.quantity,
        uom: values.uom,
        partNumber: values.partNumber,
        description: values.description,
        purchaseRequestNumber: values.purchaseRequestNumber,

        bidType: values.bidType,
        bidStartDate: moment
          .utc(values.bidStartDate)
          .format("YYYY-MM-DD hh:mm:ss"),
        bidEndDate: moment.utc(values.bidEndDate).format("YYYY-MM-DD hh:mm:ss"),
        vendorIds: values.vendorIds,

        address1: values.address1,
        address2: values.address2,
        city: values.city,
        state: values.state,
        pincode: values.pincode,
        fax: values.fax,
        phoneNumber: values.phoneNumber,
      };
      rfqInputForm(formValues)
        .then(() => {
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
      setGlobalErrMsg(strings["error.e10100"]);
    }
  }

  useEffect(() => {
    if (modalData) {
      Object.keys(initialValues).forEach((keyName) => {
        let keyVal = modalData[keyName] || initialValues[keyName];
        setUpdateValue(keyName, keyVal);
        if (keyName === "vendorIdsVal" && modalData['vendorIds'].length > 0) {
          let vendorValues = [];
          for (const vendorVal of modalData['vendorIds']) {
            vendorValues.push({ label: vendorVal, value: vendorVal });
          }
          setUpdateValue("vendorIdsVal", vendorValues);
        }
      });
    }
    // eslint-disable-next-line
  }, [modalData]);

  const filterByValue = (array: any, string: string) => {
    return array.filter((o: any) =>
      Object.keys(o).some((k) =>
        o[k].toLowerCase().includes(string.toLowerCase())
      )
    );
  };

  const onHsnSearch = (searchKey: string) => {
    setHsnList([]);
    const hsnLists = filterByValue(hsnDataList, searchKey)
      .slice(0, 20)
      .map((value: any) => {
        return {
          ...value,
          value: value.hsn_code + " - " + value.description,
          label: value.hsn_code + " - " + value.description,
        };
      });
    setHsnList(hsnLists);
  };

  // eslint-disable-next-line
  const onHsnDebounceSearch = useMemo(() => debounce(onHsnSearch, 700), []);

  const onUnspscSearch = (searchKey: string) => {
    setUnspscList([]);
    const unList = filterByValue(unspscDataList, searchKey)
      .slice(0, 20)
      .map((value: any) => {
        return {
          ...value,
          value: value.commodity + " - " + value.commodity_name,
          label: value.commodity + " - " + value.commodity_name,
        };
      });
    setUnspscList(unList);
  };

  const onUnspscDebounceSearch = useMemo(
    () => debounce(onUnspscSearch, 700),
    // eslint-disable-next-line
    []
  );

  return (
    <>
      <Modal
        className="modal-dialog"
        isOpen={isModal}
        style={{ maxWidth: "100%", margin: 0 }}
      >
        <div className="modal-body p-0">
          <Row className="justify-content-center">
            <Col lg="8" md="7">
              <Card className="bg-secondary border-0 mb-0">
                <CardHeader className="bg-transparent">
                  <div className="text-center mt-2">
                    {values.id ? "Update RFQ" : "Add RFQ"}
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
                    <Row>
                      <Col lg="6" md="4">
                        <FormGroup className="mb-3 focused">
                          <InputGroup className="input-group-merge input-group-alternative">
                            {!values.id && <CreatableSelect
                              className={`react-select info`}
                              classNamePrefix="react-select"
                              name="itemName"
                              options={orgItemOptions}
                              onChange={(e) => {
                                e === null
                                  ? setUpdateValue("itemName", "")
                                  : handleSelectChange(e, "itemName");
                                if (e && e.code)
                                  setUpdateValue("itemCode", e.code);
                              }}
                              value={
                                values.itemName
                                  ? orgItemOptions.length > 0 &&
                                    orgItemOptions.find((op: any) => {
                                      return op.value === values.itemName;
                                    })
                                  : values.itemName
                              }
                              placeholder="Select Item name"
                              isClearable={true}
                              styles={customStyles}
                              isDisabled={values.id}
                            />}
                            {values.id && <Input
                              value={values.itemName}
                              type="text"
                              name="itemName"
                              autoComplete="off"
                              disabled={values.id}
                            />}
                          </InputGroup>
                          {errors.itemName && (
                            <span className="error">{errors.itemName}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="6" md="4">
                        <FormGroup className="mb-3 focused">
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Item code"
                              value={values.itemCode}
                              type="text"
                              onChange={handleChange}
                              name="itemCode"
                              autoComplete="off"
                              disabled={values.id}
                            />
                          </InputGroup>
                          {errors.itemCode && (
                            <span className="error">{errors.itemCode}</span>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12" md="4">
                        <FormGroup className="mb-3 focused">
                          <InputGroup className="input-group-merge input-group-alternative multiselect-group">
                            {!values.id && (
                              <Select
                                className={`react-select info`}
                                classNamePrefix="react-select"
                                name="hsnCode"
                                options={hsnList}
                                onChange={(e) => {
                                  e === null
                                    ? setUpdateValue("hsnCode", "")
                                    : handleSelectChange(e, "hsnCode");
                                }}
                                onInputChange={onHsnDebounceSearch}
                                placeholder="Select HSN code"
                                isClearable={true}
                                styles={customStyles}
                                isDisabled={values.id}
                                defaultValue={""}
                              />
                            )}
                            {values.id && (
                              <Input
                                placeholder="HSN code"
                                value={values.hsnCode}
                                type="text"
                                autoComplete="off"
                                disabled={true}
                              />
                            )}
                          </InputGroup>
                          {errors.hsnCode && (
                            <span className="error">{errors.hsnCode}</span>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12" md="4">
                        <FormGroup className="mb-3 focused">
                          <InputGroup className="input-group-merge input-group-alternative multiselect-group">
                            {!values.id && (
                              <Select
                                className={`react-select info`}
                                classNamePrefix="react-select"
                                name="unspscCode"
                                options={unspscList}
                                onChange={(e) => {
                                  e === null
                                    ? setUpdateValue("unspscCode", "")
                                    : handleSelectChange(e, "unspscCode");
                                }}
                                onInputChange={onUnspscDebounceSearch}
                                placeholder="Select UNSPSC code"
                                isClearable={true}
                                styles={customStyles}
                                isDisabled={values.id}
                              />
                            )}
                            {values.id && (
                              <Input
                                placeholder="UNSPSC Code"
                                value={values.unspscCode}
                                type="text"
                                autoComplete="off"
                                disabled={true}
                              />
                            )}
                          </InputGroup>
                          {errors.unspscCode && (
                            <span className="error">{errors.unspscCode}</span>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6" md="4">
                        <FormGroup className="mb-3 focused">
                          <div>
                            <div>
                              <label className="lb-txt">
                                Upload Proposal Document
                              </label>
                            </div>
                            <input
                              type="radio"
                              id="yes"
                              name="isProposalDoc"
                              checked={values.isProposalDoc === "yes"}
                              onClick={() =>
                                setUpdateValue("isProposalDoc", "yes")
                              }
                            />
                            &nbsp;
                            <label className="lb-txt mr-sm mrg-lft5">Yes</label>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <input
                              type="radio"
                              id="no"
                              name="isProposalDoc"
                              checked={values.isProposalDoc === "no"}
                              onClick={() =>
                                setUpdateValue("isProposalDoc", "no")
                              }
                            />
                            &nbsp;
                            <label className="lb-txt mrg-lft5">No</label> <br />
                            {values.isProposalDoc === "yes" && (
                              <input
                                type="file"
                                name="proposalDocAttachment"
                                onChange={(e) =>
                                  setUpdateValue(
                                    "proposalDocAttachment",
                                    e.target.files
                                  )
                                }
                              />
                            )}
                          </div>
                          {errors.isProposalDoc && (
                            <span className="error">
                              {errors.isProposalDoc}
                            </span>
                          )}
                          {errors.proposalDocAttachment && (
                            <span className="error">
                              {errors.proposalDocAttachment}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="6" md="4">
                        <FormGroup className="mb-3 focused">
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Quantity"
                              value={values.quantity}
                              type="text"
                              onChange={handleNumberChange}
                              name="quantity"
                              autoComplete="off"
                              disabled={values.isProposalDoc === "yes"}
                            />
                          </InputGroup>
                          {errors.quantity && (
                            <span className="error">{errors.quantity}</span>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6" md="4">
                        <FormGroup className="mb-3 focused">
                          <InputGroup className="input-group-merge input-group-alternative">
                            <select
                              className="form-control"
                              data-type="string"
                              name="uom"
                              value={values.uom}
                              onChange={(e) => handleSelectDefault(e, "uom")}
                            >
                              <option value="">Select Unit</option>
                              <option value="Assemblies">Assemblies</option>
                              <option value="Dozen">Dozen</option>
                              <option value="Each">Each</option>
                              <option value="Feet">Feet</option>
                              <option value="Gallons">Gallons</option>
                              <option value="Kilo">Kilo</option>
                              <option value="Liters">Liters</option>
                              <option value="Metric Tons">Metric Tons</option>
                              <option value="Meters">Meters</option>
                              <option value="Pieces">Pieces</option>
                              <option value="Pounds">Pounds</option>
                              <option value="Sets">Sets</option>
                              <option value="Tons">Tons</option>
                              <option value="Yards">Yards</option>
                            </select>
                          </InputGroup>
                          {errors.uom && (
                            <span className="error">{errors.uom}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="6" md="4">
                        <FormGroup className="mb-3 focused">
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Part Number"
                              value={values.partNumber}
                              type="text"
                              onChange={handleChange}
                              name="partNumber"
                              autoComplete="off"
                              disabled={values.id}
                            />
                          </InputGroup>
                          {errors.partNumber && (
                            <span className="error">{errors.partNumber}</span>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6" md="4">
                        <FormGroup className="mb-3 focused">
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Processor i5, ram 8g, HDD 1TB, GPU RTX, SSD 512GB"
                              value={values.description}
                              type="textarea"
                              onChange={handleChange}
                              name="description"
                              autoComplete="off"
                              disabled={values.isProposalDoc === "yes"}
                              rows={5}
                            />
                          </InputGroup>
                          {errors.description && (
                            <span className="error">{errors.description}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="6" md="4">
                        <FormGroup className="mb-3 focused">
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Purchase request number"
                              value={values.purchaseRequestNumber}
                              type="text"
                              onChange={handleChange}
                              name="purchaseRequestNumber"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.purchaseRequestNumber && (
                            <span className="error">
                              {errors.purchaseRequestNumber}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>

                    <div>
                      <Nav tabs>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "1",
                              'error-border': (errors.bidType || errors.bidStartDate || errors.bidEndDate || errors.vendorIds) ? true : false
                            })}
                            onClick={() => setActiveTab("1")}
                          >
                            Bidding Details
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "2",
                              'error-border': (errors.address1 || errors.city || errors.state || errors.phoneNumber || errors.pincode || errors.fax) ? true : false
                            })}
                            onClick={() => setActiveTab("2")}
                          >
                            Shipping Address
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                          <div className="py-lg-5">
                            <Row>
                              <Col sm="6">
                                <FormGroup className="mb-3 focused">
                                  <div>
                                    <div>
                                      <label className="lb-txt">Bid Type</label>
                                    </div>
                                    <input
                                      type="radio"
                                      id="open"
                                      name="bidType"
                                      checked={values.bidType === "open"}
                                      onClick={() =>
                                        setUpdateValue("bidType", "open")
                                      }
                                    />
                                    &nbsp;
                                    <label className="lb-txt mr-sm mrg-lft5">
                                      Open
                                    </label>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <input
                                      type="radio"
                                      id="close"
                                      name="bidType"
                                      checked={values.bidType === "close"}
                                      onClick={() =>
                                        setUpdateValue("bidType", "close")
                                      }
                                    />
                                    &nbsp;
                                    <label className="lb-txt mrg-lft5">
                                      Close
                                    </label>{" "}
                                    <br />
                                  </div>
                                  {errors.bidType && (
                                    <span className="error">
                                      {errors.bidType}
                                    </span>
                                  )}
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6" md="4">
                                <FormGroup className="mb-3 focused">
                                  <InputGroup className="input-group-merge input-group-alternative">
                                    <Datetime
                                      dateFormat={"DD/MM/YYYY"}
                                      timeFormat={false}
                                      className="date"
                                      initialValue={new Date()}
                                      closeOnSelect
                                      inputProps={{
                                        placeholder: "DD/MM/YYYY",
                                        disabled: true,
                                      }}
                                      onChange={(objDate) => {
                                        setUpdateValue(
                                          "bidStartDate",
                                          moment(objDate).format("DD/MM/YYYY")
                                        );
                                      }}
                                    />
                                  </InputGroup>
                                  {errors.bidStartDate && (
                                    <span className="error">
                                      {errors.bidStartDate}
                                    </span>
                                  )}
                                </FormGroup>
                              </Col>
                              <Col lg="6" md="4">
                                <FormGroup className="mb-3 focused">
                                  <InputGroup className="input-group-merge input-group-alternative">
                                    <Datetime
                                      dateFormat={"DD/MM/YYYY"}
                                      timeFormat={false}
                                      className="date"
                                      // initialValue={new Date()}
                                      closeOnSelect
                                      inputProps={{
                                        placeholder: "DD/MM/YYYY",
                                      }}
                                      value={moment(values.bidEndDate)}
                                      onChange={(objDate) => {
                                        setUpdateValue("bidEndDate", objDate);
                                      }}
                                    />
                                  </InputGroup>
                                  <small>
                                    The bid will close at on business days
                                  </small>
                                  {errors.bidEndDate && (
                                    <span className="error">
                                      {errors.bidEndDate}
                                    </span>
                                  )}
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="12" md="4">
                                <FormGroup className="mb-3 focused">
                                  <InputGroup className="input-group-merge input-group-alternative multiselect-group">
                                    <CreatableSelect
                                      isMulti
                                      className={`react-select info`}
                                      classNamePrefix="react-select"
                                      name="vendorIds"
                                      options={vendorList}
                                      onChange={(e) => {
                                        e === null
                                          ? setUpdateValue("vendorIds", [])
                                          : handleMultiSelectChange(
                                              e,
                                              "vendorIds"
                                            );
                                        setUpdateValue(
                                          "vendorIdsVal",
                                          e === null ? [] : e
                                        );
                                      }}
                                      placeholder="Select Vendor"
                                      isClearable={true}
                                      styles={customStyles}
                                      value={values.vendorIdsVal}
                                    />
                                  </InputGroup>
                                  {errors.vendorIds && (
                                    <span className="error">
                                      {errors.vendorIds}
                                    </span>
                                  )}
                                </FormGroup>
                              </Col>
                            </Row>
                          </div>
                        </TabPane>

                        <TabPane tabId="2">
                          <div className="py-lg-5">
                            <Row>
                              <Col sm="6">
                                <FormGroup className="mb-3 focused">
                                  <InputGroup className="input-group-merge input-group-alternative">
                                    <Input
                                      placeholder="Address 1"
                                      value={values.address1}
                                      type="text"
                                      onChange={handleChange}
                                      name="address1"
                                      autoComplete="off"
                                    />
                                  </InputGroup>
                                  {errors.address1 && (
                                    <span className="error">
                                      {errors.address1}
                                    </span>
                                  )}
                                </FormGroup>
                              </Col>
                              <Col sm="6">
                                <FormGroup className="mb-3 focused">
                                  <InputGroup className="input-group-merge input-group-alternative">
                                    <Input
                                      placeholder="Address 2"
                                      value={values.address2}
                                      type="text"
                                      onChange={handleChange}
                                      name="address2"
                                      autoComplete="off"
                                    />
                                  </InputGroup>
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col sm="6">
                                <FormGroup className="mb-3 focused">
                                  <InputGroup className="input-group-merge input-group-alternative">
                                    <Input
                                      placeholder="City"
                                      value={values.city}
                                      type="text"
                                      onChange={handleChange}
                                      name="city"
                                      autoComplete="off"
                                    />
                                  </InputGroup>
                                  {errors.city && (
                                    <span className="error">{errors.city}</span>
                                  )}
                                </FormGroup>
                              </Col>
                              <Col sm="6">
                                <FormGroup className="mb-3 focused">
                                  <InputGroup className="input-group-merge input-group-alternative">
                                    <Input
                                      placeholder="Pin Code"
                                      value={values.pincode}
                                      type="text"
                                      onChange={handleChange}
                                      name="pincode"
                                      autoComplete="off"
                                    />
                                  </InputGroup>
                                  {errors.pincode && (
                                    <span className="error">
                                      {errors.pincode}
                                    </span>
                                  )}
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col sm="6">
                                <FormGroup className="mb-3 focused">
                                  <InputGroup className="input-group-merge input-group-alternative">
                                    <Input
                                      placeholder="State"
                                      value={values.state}
                                      type="text"
                                      onChange={handleChange}
                                      name="state"
                                      autoComplete="off"
                                    />
                                  </InputGroup>
                                  {errors.state && (
                                    <span className="error">
                                      {errors.state}
                                    </span>
                                  )}
                                </FormGroup>
                              </Col>
                              <Col sm="6">
                                <FormGroup className="mb-3 focused">
                                  <InputGroup className="input-group-merge input-group-alternative">
                                    <Input
                                      placeholder="FAX"
                                      value={values.fax}
                                      type="text"
                                      onChange={handleChange}
                                      name="fax"
                                      autoComplete="off"
                                    />
                                  </InputGroup>
                                  {errors.fax && (
                                    <span className="error">{errors.fax}</span>
                                  )}
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col sm="6">
                                <FormGroup className="mb-3 focused">
                                  <InputGroup className="input-group-merge input-group-alternative">
                                    <Input
                                      placeholder="Mobile Number"
                                      value={values.phoneNumber}
                                      type="text"
                                      onChange={handleChange}
                                      name="phoneNumber"
                                      autoComplete="off"
                                    />
                                  </InputGroup>
                                  {errors.phoneNumber && (
                                    <span className="error">
                                      {errors.phoneNumber}
                                    </span>
                                  )}
                                </FormGroup>
                              </Col>
                            </Row>
                          </div>
                        </TabPane>
                      </TabContent>
                    </div>

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
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
};

export default RfqForm;
