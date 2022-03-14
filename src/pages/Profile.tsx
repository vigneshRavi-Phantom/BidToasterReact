import { lazy, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "containers/Layout/Layout";
import {
  Button,
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  FormGroup,
  CardBody,
} from "reactstrap";
import SimpleHeader from "containers/Admin/SimpleHeader";
import { useModal } from "contexts/ModalContextProvider";
import toaster from "components/toaster";
import { useAuth } from "contexts/AuthContextProvider";
import Loading from "components/Loading";

const ProfileForm = lazy(() => import("containers/Profile/ProfileForm"));

function Profile() {
  const { isModal, openModal }: any = useModal();
  const { refetchAccountProfile, accountProfile, userAccessType } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(userAccessType === "vendor") {
      navigate('/vendor-profile');
    }
    // eslint-disable-next-line
  }, [userAccessType]);

  const inputResponse = (resType: string) => {
    toaster.notify("Profile was updated", {
      position: "top-right",
      type: "success",
    });
    refetchAccountProfile();
  };

  const getUserAccessType = (type: string) => {
    let output = "";
    if (type === "buyer") {
      output = "Buyer";
    } else if (type === "vendor") {
      output = "Vendor";
    } else if (type === "vendor_buyer") {
      output = "Vendor & Buyer";
    } else if (type === "admin") {
      output = "Admin";
    } else if (type === "organization") {
      output = "Organization";
    }

    return output;
  };

  if (!accountProfile) return <Loading />;

  return (
    <>
      <Layout>
        {isModal && <ProfileForm inputResponse={inputResponse} />}
        <SimpleHeader name="Profile" parentName="Admin" />
        <Container className="mt--6" fluid>
          <Row className="row-example">
            <Col lg="10">
              <div className="card-wrapper">
                <Card>
                  <CardHeader>
                    <Row>
                      <Col xs="6">
                        <h3 className="mb-0">Profile</h3>
                      </Col>
                      <Col className="text-right" xs="6">
                        <Button
                          className="btn-round btn-icon"
                          color="primary"
                          href="#pablo"
                          id="tooltip443412080"
                          onClick={() => openModal(accountProfile)}
                          size="sm"
                        >
                          Edit Profile
                        </Button>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Row className="row-example">
                      <Col lg="5">
                        <FormGroup>
                          <label className="form-control-label">
                            Firrst Name
                          </label>
                          <span className="error">
                            {accountProfile.firstName}
                          </span>
                        </FormGroup>
                      </Col>
                      <Col lg="5">
                        <FormGroup>
                          <label className="form-control-label">
                            Last Name
                          </label>
                          <span className="error">
                            {accountProfile.lastName}
                          </span>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="row-example">
                      <Col lg="5">
                        <FormGroup>
                          <label className="form-control-label">Email</label>
                          <span className="error">{accountProfile.email}</span>
                        </FormGroup>
                      </Col>
                      <Col lg="5">
                        <FormGroup>
                          <label className="form-control-label">
                            Phone Number
                          </label>
                          <span className="error">
                            {accountProfile.phoneNumber}
                          </span>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="row-example">
                      <Col lg="5">
                        <FormGroup>
                          <label className="form-control-label">Role</label>
                          <span className="error">
                            {getUserAccessType(accountProfile.userAccessType)}
                          </span>
                        </FormGroup>
                      </Col>
                      <Col lg="5"></Col>
                    </Row>
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
}

export default Profile;
