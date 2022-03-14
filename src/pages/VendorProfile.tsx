import { useState, useEffect } from "react";
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
  CardHeader
} from "reactstrap";
import { useAuth } from "contexts/AuthContextProvider";
import useForm from "helpers/useForm";
import userService from "services/userService";
import { useNavigate } from "react-router-dom";
import { vendorSignupValidate } from "helpers/validateRules";
import { useLocalization } from "contexts/LocalizationContextProvider";
import { errorCode } from "utils/ServiceAPIUtil";
import moment from "moment";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import Layout from "containers/Layout/Layout";
import SimpleHeader from "containers/Admin/SimpleHeader";
import toaster from "components/toaster";
import Loading from "components/Loading";

const initialValues: any = {
  id: null,
  formType: "profile",
  userAccessType: "vendor",
  companyName: "",
  legalStatus: "",
  businessName: "",
  businessRegistrationNo: "",
  businessRegistrationAddress: "",
  city: "",
  pincode: "",
  phoneNumber: "",
  fax: "",
  email: "",
  password: "",
  website: "",

  commBusinessRegistrationAddress: "",
  commCity: "",
  commPincode: "",
  commPhoneNumber: "",
  commFax: "",
  commEmail: "",
  commWebsite: "",
  commWorkingDays: "",
  commWorkingHours: "",

  bnkBankName: "",
  bnkCustomerName: "",
  bnkAccountNo: "",
  bnkAccountType: "",
  bnkIfscCode: "",
  bnkBranchAddress: "",
  bnkBranchCode: "",

  panNo: "",
  gstn: "",
  lutDate: "",
  lutNo: "",
  msmeRegNo: "",

  proprietorName: "",
  proprietorPosition: "",
  proprietorMobile: "",
  proprietorPhone: "",
  proprietorEmail: "",

  repName: "",
  repDesignation: "",
  repMobile: "",
  repPhone: "",
  repEmail: "",
  repWorkingDays: "",
  repWorkingHours: "",
  repWorkingHoursAm: "",
  repWorkingHoursPm: "",

  finRepName: "",
  finRepDesignation: "",
  finRepMobile: "",
  finRepPhone: "",
  finRepEmail: "",
  finRepWorkingDays: "",
  finRepWorkingHours: "",
  finRepWorkingHoursAm: "",
  finRepWorkingHoursPm: "",

  relManagerName: "",
  relManagerDesignation: "",
  relManagerMobile: "",
  relManagerPhone: "",
  relManagerEmail: "",
  relManagerWorkingDays: "",
  relManagerWorkingHours: "",
  relManagerWorkingHoursAm: "",
  relManagerWorkingHoursPm: "",

  businnessRegFileAttachment: [],
  pancardFileAttachment: [],
  cancelledChequeFileAttachment: [],
  gstFileAttachment: [],
  msmeFileAttachment: [],
  tdsFileAttachment: [],

  businnessRegFileUrl: "",
  pancardFileUrl: "",
  cancelledChequeFileUrl: "",
  gstFileUrl: "",
  msmeFileUrl: "",
  tdsFileUrl: "",
};
function VendorProfile() {
  const { userAccessType, accountProfile } = useAuth();
  const navigate = useNavigate();
  const { values, errors, handleChange, handleSubmit, setUpdateValue, handleNumberChange } = useForm(
    initialValues,
    handleSubmitCB,
    vendorSignupValidate
  );
  const { UpdateVendorProfile, GetVendorProfile } = userService();
  const [loading, setLoading] = useState(false);
  const { strings }: any = useLocalization();

  useEffect(() => {
    if(userAccessType === "buyer") {
      navigate('/profile');
    }
    // eslint-disable-next-line
  }, [userAccessType]);

  useEffect(() => {
    if(accountProfile && accountProfile.id) {
      getVendorProfile();
    }
    // eslint-disable-next-line
  }, [accountProfile]);

  const getVendorProfile = async () => {
    if(accountProfile && accountProfile.id) {
    const profileDataRes = await GetVendorProfile({ id: accountProfile.id});
    if(profileDataRes.length > 0) {
      const profileData = profileDataRes[0];
      Object.keys(initialValues).forEach((keyName) => {
        setUpdateValue(keyName, profileData[keyName] || initialValues[keyName]);
      });
    }
    }
  }

  function handleSubmitCB() {
    setLoading(true);
    const formValues = {
      userAccessType: "vendor",
      id: accountProfile && accountProfile.id,
      companyName: values.companyName,
      legalStatus: values.legalStatus,
      businessName: values.businessName,
      businessRegistrationNo: values.businessRegistrationNo,
      businessRegistrationAddress: values.businessRegistrationAddress,
      city: values.city,
      pincode: values.pincode,
      phoneNumber: values.phoneNumber,
      fax: values.fax,
      email: values.email,
      website: values.website,

      commBusinessRegistrationAddress: values.commBusinessRegistrationAddress,
      commCity: values.commCity,
      commPincode: values.commPincode,
      commPhoneNumber: values.commPhoneNumber,
      commFax: values.commFax,
      commEmail: values.commEmail,
      commWebsite: values.commWebsite,
      commWorkingDays: values.commWorkingDays,
      commWorkingHours: values.commWorkingHours,

      bnkBankName: values.bnkBankName,
      bnkCustomerName: values.bnkCustomerName,
      bnkAccountNo: values.bnkAccountNo,
      bnkAccountType: values.bnkAccountType,
      bnkIfscCode: values.bnkIfscCode,
      bnkBranchAddress: values.bnkBranchAddress,
      bnkBranchCode: values.bnkBranchCode,

      panNo: values.panNo,
      gstn: values.gstn,
      lutDate: moment.utc(values.lutDate).format('YYYY-MM-DD hh:mm:ss'),
      lutNo: values.lutNo,
      msmeRegNo: values.msmeRegNo,

      proprietorName: values.proprietorName,
      proprietorPosition: values.proprietorPosition,
      proprietorMobile: values.proprietorMobile,
      proprietorPhone: values.proprietorPhone,
      proprietorEmail: values.proprietorEmail,

      repName: values.repName,
      repDesignation: values.repDesignation,
      repMobile: values.repMobile,
      repPhone: values.repPhone,
      repEmail: values.repEmail,
      repWorkingDays: values.repWorkingDays,
      repWorkingHours: values.repWorkingHours,
      repWorkingHoursAm: values.repWorkingHoursAm,
      repWorkingHoursPm: values.repWorkingHoursPm,

      finRepName: values.finRepName,
      finRepDesignation: values.finRepDesignation,
      finRepMobile: values.finRepMobile,
      finRepPhone: values.finRepPhone,
      finRepEmail: values.finRepEmail,
      finRepWorkingDays: values.finRepWorkingDays,
      finRepWorkingHours: values.finRepWorkingHours,
      finRepWorkingHoursAm: values.finRepWorkingHoursAm,
      finRepWorkingHoursPm: values.finRepWorkingHoursPm,

      relManagerName: values.relManagerName,
      relManagerDesignation: values.relManagerDesignation,
      relManagerMobile: values.relManagerMobile,
      relManagerPhone: values.relManagerPhone,
      relManagerEmail: values.relManagerEmail,
      relManagerWorkingDays: values.relManagerWorkingDays,
      relManagerWorkingHours: values.relManagerWorkingHours,
      relManagerWorkingHoursAm: values.relManagerWorkingHoursAm,
      relManagerWorkingHoursPm: values.relManagerWorkingHoursPm,

      businnessRegFileAttachment: values.businnessRegFileAttachment,
      pancardFileAttachment: values.pancardFileAttachment,
      cancelledChequeFileAttachment: values.cancelledChequeFileAttachment,
      gstFileAttachment: values.gstFileAttachment,
      msmeFileAttachment: values.msmeFileAttachment,
      tdsFileAttachment: values.tdsFileAttachment,
    }
    UpdateVendorProfile(formValues)
    .then(() => {
      toaster.notify("Profile was updated", {
        position: "top-right",
        type: "success",
      });
      setLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    })
    .catch((err) => {
      toaster.notify(strings["error." + errorCode(err)] || strings["error.e10100"], {
        position: "top-right",
        type: "error",
      });
      setLoading(false);
    });
  }
  if(!values.id) return <Loading />
  return (
    <>
      <Layout>
        <SimpleHeader name="Profile" parentName="Admin" />
        <Container className="mt--6" fluid>
          <Row className="justify-content-center">
            <Col lg="10" md="7">
              <Card className="bg-secondary border-0 mb-0">
              <CardHeader>
                    <Row>
                      <Col xs="6">
                        <h3 className="mb-0">Profile</h3>
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
                      </Col>
                      <Col lg="6" md="7">
                      </Col>
                      </Row>
                    <Row className="justify-content-center">
                      <Col lg="4" md="7">
                        <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Company Name"
                              value={values.companyName}
                              type="text"
                              onChange={handleChange}
                              name="companyName"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.companyName && (
                            <span className="error">{errors.companyName}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                        <FormGroup className={classnames("focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              value={values.legalStatus}
                              placeholder="Legal Status"
                              type="text"
                              onChange={handleChange}
                              name="legalStatus"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.legalStatus && (
                            <span className="error">{errors.legalStatus}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                        <FormGroup className={classnames("focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              value={values.businessName}
                              placeholder="Business Name"
                              type="text"
                              onChange={handleChange}
                              name="businessName"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.businessName && (
                            <span className="error">{errors.businessName}</span>
                          )}
                        </FormGroup>
                      </Col>
                      </Row>
                    <Row className="justify-content-center">
                      <Col lg="4" md="7">
                        <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Business Registration No"
                              value={values.businessRegistrationNo}
                              type="text"
                              onChange={handleChange}
                              name="businessRegistrationNo"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.businessRegistrationNo && (
                            <span className="error">{errors.businessRegistrationNo}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Business Registration Address"
                              value={values.businessRegistrationAddress}
                              type="text"
                              onChange={handleChange}
                              name="businessRegistrationAddress"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.businessRegistrationAddress && (
                            <span className="error">{errors.businessRegistrationAddress}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                        <FormGroup className={classnames("focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              value={values.city}
                              placeholder="City"
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
                      </Row>
                    <Row className="justify-content-center">
                      <Col lg="4" md="7">
                        <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Pincode"
                              value={values.pincode}
                              type="text"
                              onChange={handleChange}
                              name="pincode"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.pincode && (
                            <span className="error">{errors.pincode}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
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
                      <Col lg="4" md="7">
                        <FormGroup className={classnames("focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              value={values.phoneNumber}
                              placeholder="PhoneNumber"
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
                      </Col>
                      </Row>
                    <Row className="justify-content-center">
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Website"
                              value={values.website}
                              type="text"
                              onChange={handleChange}
                              name="website"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.website && (
                            <span className="error">{errors.website}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                        
                        </Col>
                      <Col lg="4" md="7">
                        
                      </Col>
                      </Row>
                      <h3>Communication Address & Contact Details</h3>
                      <Row className="justify-content-center">
                      <Col lg="4" md="7">
                        <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Business Registration Address"
                              value={values.commBusinessRegistrationAddress}
                              type="text"
                              onChange={handleChange}
                              name="commBusinessRegistrationAddress"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.commBusinessRegistrationAddress && (
                            <span className="error">{errors.commBusinessRegistrationAddress}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="City"
                              value={values.commCity}
                              type="text"
                              onChange={handleChange}
                              name="commCity"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.commCity && (
                            <span className="error">{errors.commCity}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Pincode"
                              value={values.commPincode}
                              type="text"
                              onChange={handleChange}
                              name="commPincode"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.commPincode && (
                            <span className="error">{errors.commPincode}</span>
                          )}
                        </FormGroup>
                      </Col>
                      </Row>
                      <Row className="justify-content-center">
                      <Col lg="4" md="7">
                        <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="PhoneNumber"
                              value={values.commPhoneNumber}
                              type="text"
                              onChange={handleChange}
                              name="commPhoneNumber"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.commPhoneNumber && (
                            <span className="error">{errors.commPhoneNumber}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Fax"
                              value={values.commFax}
                              type="text"
                              onChange={handleChange}
                              name="commFax"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.commFax && (
                            <span className="error">{errors.commFax}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Email"
                              value={values.commEmail}
                              type="text"
                              onChange={handleChange}
                              name="commEmail"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.commEmail && (
                            <span className="error">{errors.commEmail}</span>
                          )}
                        </FormGroup>
                      </Col>
                      </Row>
                      <Row className="justify-content-center">
                      <Col lg="4" md="7">
                        <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Website"
                              value={values.commWebsite}
                              type="text"
                              onChange={handleChange}
                              name="commWebsite"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.commWebsite && (
                            <span className="error">{errors.commWebsite}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Working Days"
                              value={values.commWorkingDays}
                              type="text"
                              onChange={handleNumberChange}
                              name="commWorkingDays"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.commWorkingDays && (
                            <span className="error">{errors.commWorkingDays}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Working Hours"
                              value={values.commWorkingHours}
                              type="text"
                              onChange={handleNumberChange}
                              name="commWorkingHours"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.commWorkingHours && (
                            <span className="error">{errors.commWorkingHours}</span>
                          )}
                        </FormGroup>
                      </Col>
                      </Row>
                      <h3>Bank Details</h3>
                      <Row className="justify-content-center">
                      <Col lg="4" md="7">
                        <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Bank Name"
                              value={values.bnkBankName}
                              type="text"
                              onChange={handleChange}
                              name="bnkBankName"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.bnkBankName && (
                            <span className="error">{errors.bnkBankName}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Customer Name"
                              value={values.bnkCustomerName}
                              type="text"
                              onChange={handleChange}
                              name="bnkCustomerName"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.bnkCustomerName && (
                            <span className="error">{errors.bnkCustomerName}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Account Number"
                              value={values.bnkAccountNo}
                              type="text"
                              onChange={handleChange}
                              name="bnkAccountNo"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.bnkAccountNo && (
                            <span className="error">{errors.bnkAccountNo}</span>
                          )}
                        </FormGroup>
                      </Col>
                      </Row>
                      <Row className="justify-content-center">
                      <Col lg="4" md="7">
                        <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Account Type"
                              value={values.bnkAccountType}
                              type="text"
                              onChange={handleChange}
                              name="bnkAccountType"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.bnkAccountType && (
                            <span className="error">{errors.bnkAccountType}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="IFSC Code"
                              value={values.bnkIfscCode}
                              type="text"
                              onChange={handleChange}
                              name="bnkIfscCode"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.bnkIfscCode && (
                            <span className="error">{errors.bnkIfscCode}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Branch Address"
                              value={values.bnkBranchAddress}
                              type="text"
                              onChange={handleChange}
                              name="bnkBranchAddress"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.bnkBranchAddress && (
                            <span className="error">{errors.bnkBranchAddress}</span>
                          )}
                        </FormGroup>
                      </Col>
                      </Row>
                      <Row className="justify-content-center">
                      <Col lg="4" md="7">
                        <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Branch Code"
                              value={values.bnkBranchCode}
                              type="text"
                              onChange={handleChange}
                              name="bnkBranchCode"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.bnkBranchCode && (
                            <span className="error">{errors.bnkBranchCode}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      
                      </Col>
                      <Col lg="4" md="7">
                      
                      </Col>
                      </Row>
                      <h3>Statutory Details</h3>
                      <Row className="justify-content-center">
                      <Col lg="4" md="7">
                        <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="PAN Number"
                              value={values.panNo}
                              type="text"
                              onChange={handleChange}
                              name="panNo"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.panNo && (
                            <span className="error">{errors.panNo}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="GSTN"
                              value={values.gstn}
                              type="text"
                              onChange={handleChange}
                              name="gstn"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.gstn && (
                            <span className="error">{errors.gstn}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Datetime
                                      dateFormat={"DD/MM/YYYY"}
                                      timeFormat={false}
                                      className="date"
                                      initialValue={new Date()}
                                      value={moment(values.lutDate)}
                                      closeOnSelect
                                      inputProps={{
                                        placeholder: "LUT Date",
                                      }}
                                      onChange={(objDate) => {
                                        setUpdateValue(
                                          "lutDate",
                                          objDate
                                        );
                                      }}
                                    />
                          </InputGroup>
                          {errors.lutDate && (
                            <span className="error">{errors.lutDate}</span>
                          )}
                        </FormGroup>
                      </Col>
                      </Row>
                      <Row className="justify-content-center">
                      <Col lg="4" md="7">
                        <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="LUT No"
                              value={values.lutNo}
                              type="text"
                              onChange={handleChange}
                              name="lutNo"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.lutNo && (
                            <span className="error">{errors.lutNo}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="MSME Reg Number"
                              value={values.msmeRegNo}
                              type="text"
                              onChange={handleChange}
                              name="msmeRegNo"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.msmeRegNo && (
                            <span className="error">{errors.msmeRegNo}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      
                      </Col>
                      </Row>
                      <h3>Proprietor/Partner/CEO/MD Contact Details</h3>
                      <Row className="justify-content-center">
                      <Col lg="4" md="7">
                        <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Name"
                              value={values.proprietorName}
                              type="text"
                              onChange={handleChange}
                              name="proprietorName"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.proprietorName && (
                            <span className="error">{errors.proprietorName}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Position"
                              value={values.proprietorPosition}
                              type="text"
                              onChange={handleChange}
                              name="proprietorPosition"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.proprietorPosition && (
                            <span className="error">{errors.proprietorPosition}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Mobile"
                              value={values.proprietorMobile}
                              type="text"
                              onChange={handleChange}
                              name="proprietorMobile"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.proprietorMobile && (
                            <span className="error">{errors.proprietorMobile}</span>
                          )}
                        </FormGroup>
                      </Col>
                      </Row>
                      <Row className="justify-content-center">
                      <Col lg="4" md="7">
                        <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Phone"
                              value={values.proprietorPhone}
                              type="text"
                              onChange={handleChange}
                              name="proprietorPhone"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.proprietorPhone && (
                            <span className="error">{errors.proprietorPhone}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Email"
                              value={values.proprietorEmail}
                              type="text"
                              onChange={handleChange}
                              name="proprietorEmail"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.proprietorEmail && (
                            <span className="error">{errors.proprietorEmail}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      
                      </Col>
                      </Row>
                      <h3>Representative Contact Details</h3>
                      <Row className="justify-content-center">
                      <Col lg="4" md="7">
                        <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Name"
                              value={values.repName}
                              type="text"
                              onChange={handleChange}
                              name="repName"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.repName && (
                            <span className="error">{errors.repName}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Designation"
                              value={values.repDesignation}
                              type="text"
                              onChange={handleChange}
                              name="repDesignation"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.repDesignation && (
                            <span className="error">{errors.repDesignation}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Mobile"
                              value={values.repMobile}
                              type="text"
                              onChange={handleChange}
                              name="repMobile"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.repMobile && (
                            <span className="error">{errors.repMobile}</span>
                          )}
                        </FormGroup>
                      </Col>
                      </Row>
                      <Row className="justify-content-center">
                      <Col lg="4" md="7">
                        <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Phone"
                              value={values.repPhone}
                              type="text"
                              onChange={handleChange}
                              name="repPhone"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.repPhone && (
                            <span className="error">{errors.repPhone}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Email"
                              value={values.repEmail}
                              type="text"
                              onChange={handleChange}
                              name="repEmail"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.repEmail && (
                            <span className="error">{errors.repEmail}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Working Days"
                              value={values.repWorkingDays}
                              type="text"
                              onChange={handleNumberChange}
                              name="repWorkingDays"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.repWorkingDays && (
                            <span className="error">{errors.repWorkingDays}</span>
                          )}
                        </FormGroup>
                      </Col>
                      </Row>
                      <Row className="justify-content-center">
                      <Col lg="4" md="7">
                        <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Working Hours"
                              value={values.repWorkingHours}
                              type="text"
                              onChange={handleNumberChange}
                              name="repWorkingHours"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.repWorkingHours && (
                            <span className="error">{errors.repWorkingHours}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Working Hours AM"
                              value={values.repWorkingHoursAm}
                              type="text"
                              onChange={handleNumberChange}
                              name="repWorkingHoursAm"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.repWorkingHoursAm && (
                            <span className="error">{errors.repWorkingHoursAm}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Working Hours PM"
                              value={values.repWorkingHoursPm}
                              type="text"
                              onChange={handleNumberChange}
                              name="repWorkingHoursPm"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.repWorkingHoursPm && (
                            <span className="error">{errors.repWorkingHoursPm}</span>
                          )}
                        </FormGroup>
                      </Col>
                      </Row>
                      <h3>Accounts and Finance Representative Contact Details</h3>
                      <Row className="justify-content-center">
                      <Col lg="4" md="7">
                        <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Name"
                              value={values.finRepName}
                              type="text"
                              onChange={handleChange}
                              name="finRepName"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.finRepName && (
                            <span className="error">{errors.finRepName}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Designation"
                              value={values.finRepDesignation}
                              type="text"
                              onChange={handleChange}
                              name="finRepDesignation"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.finRepDesignation && (
                            <span className="error">{errors.finRepDesignation}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Mobile"
                              value={values.finRepMobile}
                              type="text"
                              onChange={handleChange}
                              name="finRepMobile"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.finRepMobile && (
                            <span className="error">{errors.finRepMobile}</span>
                          )}
                        </FormGroup>
                      </Col>
                      </Row>
                      <Row className="justify-content-center">
                      <Col lg="4" md="7">
                        <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Phone"
                              value={values.finRepPhone}
                              type="text"
                              onChange={handleChange}
                              name="finRepPhone"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.finRepPhone && (
                            <span className="error">{errors.finRepPhone}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Email"
                              value={values.finRepEmail}
                              type="text"
                              onChange={handleChange}
                              name="finRepEmail"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.finRepEmail && (
                            <span className="error">{errors.finRepEmail}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Working Days"
                              value={values.finRepWorkingDays}
                              type="text"
                              onChange={handleNumberChange}
                              name="finRepWorkingDays"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.finRepWorkingDays && (
                            <span className="error">{errors.finRepWorkingDays}</span>
                          )}
                        </FormGroup>
                      </Col>
                      </Row>
                      <Row className="justify-content-center">
                      <Col lg="4" md="7">
                        <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Working Hours"
                              value={values.finRepWorkingHours}
                              type="text"
                              onChange={handleNumberChange}
                              name="finRepWorkingHours"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.finRepWorkingHours && (
                            <span className="error">{errors.finRepWorkingHours}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Working Hours AM"
                              value={values.finRepWorkingHoursAm}
                              type="text"
                              onChange={handleNumberChange}
                              name="finRepWorkingHoursAm"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.finRepWorkingHoursAm && (
                            <span className="error">{errors.finRepWorkingHoursAm}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Working Hours PM"
                              value={values.finRepWorkingHoursPm}
                              type="text"
                              onChange={handleNumberChange}
                              name="finRepWorkingHoursPm"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.finRepWorkingHoursPm && (
                            <span className="error">{errors.finRepWorkingHoursPm}</span>
                          )}
                        </FormGroup>
                      </Col>
                      </Row>
                      <h3>Customer Relationship / Compliance Manager Contact details</h3>
                      <Row className="justify-content-center">
                      <Col lg="4" md="7">
                        <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Name"
                              value={values.relManagerName}
                              type="text"
                              onChange={handleChange}
                              name="relManagerName"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.relManagerName && (
                            <span className="error">{errors.relManagerName}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Designation"
                              value={values.relManagerDesignation}
                              type="text"
                              onChange={handleChange}
                              name="relManagerDesignation"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.relManagerDesignation && (
                            <span className="error">{errors.relManagerDesignation}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Mobile"
                              value={values.relManagerMobile}
                              type="text"
                              onChange={handleChange}
                              name="relManagerMobile"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.relManagerMobile && (
                            <span className="error">{errors.relManagerMobile}</span>
                          )}
                        </FormGroup>
                      </Col>
                      </Row>
                      <Row className="justify-content-center">
                      <Col lg="4" md="7">
                        <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Phone"
                              value={values.relManagerPhone}
                              type="text"
                              onChange={handleChange}
                              name="relManagerPhone"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.relManagerPhone && (
                            <span className="error">{errors.relManagerPhone}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Email"
                              value={values.relManagerEmail}
                              type="text"
                              onChange={handleChange}
                              name="relManagerEmail"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.relManagerEmail && (
                            <span className="error">{errors.relManagerEmail}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Working Days"
                              value={values.relManagerWorkingDays}
                              type="text"
                              onChange={handleNumberChange}
                              name="relManagerWorkingDays"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.relManagerWorkingDays && (
                            <span className="error">{errors.relManagerWorkingDays}</span>
                          )}
                        </FormGroup>
                      </Col>
                      </Row>
                      <Row className="justify-content-center">
                      <Col lg="4" md="7">
                        <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Working Hours"
                              value={values.relManagerWorkingHours}
                              type="text"
                              onChange={handleNumberChange}
                              name="relManagerWorkingHours"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.relManagerWorkingHours && (
                            <span className="error">{errors.relManagerWorkingHours}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Working Hours AM"
                              value={values.relManagerWorkingHoursAm}
                              type="text"
                              onChange={handleNumberChange}
                              name="relManagerWorkingHoursAm"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.relManagerWorkingHoursAm && (
                            <span className="error">{errors.relManagerWorkingHoursAm}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder="Working Hours PM"
                              value={values.relManagerWorkingHoursPm}
                              type="text"
                              onChange={handleNumberChange}
                              name="relManagerWorkingHoursPm"
                              autoComplete="off"
                            />
                          </InputGroup>
                          {errors.relManagerWorkingHoursPm && (
                            <span className="error">{errors.relManagerWorkingHoursPm}</span>
                          )}
                        </FormGroup>
                      </Col>
                      </Row>
                      <h5>Kindly submit the self-attested copy of the following documents along with this form:</h5>
                      <Row className="justify-content-center">
                      <Col lg="4" md="7">
                        <FormGroup className={classnames("mb-3 focused")}>
                          <label>Business Registration Certificate</label>
                          {
                          values.businnessRegFileUrl &&
                          <a href={values.businnessRegFileUrl} target={"_blank"} rel="noreferrer">View File</a>
                          }
                          <InputGroup className="input-group-merge input-group-alternative">
                          <Input
                              type="file"
                              name="businnessRegFileAttachment"
                              onChange={(e) =>
                                setUpdateValue(
                                  "businnessRegFileAttachment",
                                  e.target.files
                                )
                              }
                            />
                          </InputGroup>
                          {errors.businnessRegFileAttachment && (
                            <span className="error">{errors.businnessRegFileAttachment}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                      <label>PAN card</label>
                      {
                          values.pancardFileUrl &&
                          <a href={values.pancardFileUrl} target={"_blank"} rel="noreferrer">View File</a>
                          }
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              type="file"
                              name="pancardFileAttachment"
                              onChange={(e) =>
                                setUpdateValue(
                                  "pancardFileAttachment",
                                  e.target.files
                                )
                              }
                            />
                          </InputGroup>
                          {errors.pancardFileAttachment && (
                            <span className="error">{errors.pancardFileAttachment}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                      <label>One cancelled cheque leaf</label>
                      {
                          values.cancelledChequeFileUrl &&
                          <a href={values.cancelledChequeFileUrl} target={"_blank"} rel="noreferrer">View File</a>
                          }
                          <InputGroup className="input-group-merge input-group-alternative">
                          <Input
                              type="file"
                              name="cancelledChequeFileAttachment"
                              onChange={(e) =>
                                setUpdateValue(
                                  "cancelledChequeFileAttachment",
                                  e.target.files
                                )
                              }
                            />
                          </InputGroup>
                          {errors.cancelledChequeFileAttachment && (
                            <span className="error">{errors.cancelledChequeFileAttachment}</span>
                          )}
                        </FormGroup>
                      </Col>
                      </Row>
                      <Row className="justify-content-center">
                      <Col lg="4" md="7">
                        <FormGroup className={classnames("mb-3 focused")}>
                        <label>GST certificate</label>
                        {
                          values.gstFileUrl &&
                          <a href={values.gstFileUrl} target={"_blank"} rel="noreferrer">View File</a>
                          }
                          <InputGroup className="input-group-merge input-group-alternative">
                          <Input
                              type="file"
                              name="gstFileAttachment"
                              onChange={(e) =>
                                setUpdateValue(
                                  "gstFileAttachment",
                                  e.target.files
                                )
                              }
                            />
                          </InputGroup>
                          {errors.gstFileAttachment && (
                            <span className="error">{errors.gstFileAttachment}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                      <label>MSME reg certificate(if any)</label>
                      {
                          values.msmeFileUrl &&
                          <a href={values.msmeFileUrl} target={"_blank"} rel="noreferrer">View File</a>
                          }
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              type="file"
                              name="msmeFileAttachment"
                              onChange={(e) =>
                                setUpdateValue(
                                  "msmeFileAttachment",
                                  e.target.files
                                )
                              }
                            />
                          </InputGroup>
                          {errors.msmeFileAttachment && (
                            <span className="error">{errors.msmeFileAttachment}</span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col lg="4" md="7">
                      <FormGroup className={classnames("mb-3 focused")}>
                      <label>TDS deduction certificate(if any)</label>
                      {
                          values.tdsFileUrl &&
                          <a href={values.tdsFileUrl} target={"_blank"} rel="noreferrer">View File</a>
                          }
                          <InputGroup className="input-group-merge input-group-alternative">
                          <Input
                              type="file"
                              name="tdsFileAttachment"
                              onChange={(e) =>
                                setUpdateValue(
                                  "tdsFileAttachment",
                                  e.target.files
                                )
                              }
                            />
                          </InputGroup>
                          {errors.tdsFileAttachment && (
                            <span className="error">{errors.tdsFileAttachment}</span>
                          )}
                        </FormGroup>
                      </Col>
                      </Row>
                      <Row className="justify-content-center">
                      <Col lg="5" md="7"></Col>
                      <Col xs="10">
                        <div className="text-center">
                          <Button className="my-4" color="info" type="submit">
                            {loading ? <Spinner size="sm" /> : "Save"}
                          </Button>
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

export default VendorProfile;
