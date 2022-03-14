import { useEffect, useState, lazy, useCallback, useMemo } from "react";
import Layout from "containers/Layout/Layout";
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Input,
} from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
import SimpleHeader from "containers/Admin/SimpleHeader";
import rfqService from "services/rfqService";
import { useModal } from "contexts/ModalContextProvider";
import toaster from "components/toaster";
import Pagination from "react-paginate";
import { debounce } from "lodash";
import { useAuth } from "contexts/AuthContextProvider";
import moment from "moment";
import { errorCode } from "utils/ServiceAPIUtil";
import { useLocalization } from "contexts/LocalizationContextProvider";
import hsnDataList from "assets/json/hsn.json";


const RfqForm = lazy(() => import("containers/RFQ/RfqForm"));
const DeleteModal = lazy(() => import("components/modals/DeleteModal"));
const paginateLimit = 20;

function RFQPage() {
  const { GetRfq, DeleteRfq } = rfqService();
  const {
    isModal,
    openModal,
    isDeleteModal,
    openDeleteModal,
    closeDeleteModal,
    deleteModalData,
  }: any = useModal();
  const navigate = useNavigate();
  const { strings }: any = useLocalization();
  const { accountProfile } = useAuth();
  const [rfqList, setRfqList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [searchCond, setSearchCond] = useState({
    search: {
      searchVal: "",
      searchType: "",
      getCount: true,
      userId: accountProfile && accountProfile.id,
      userAccessType: accountProfile && accountProfile.userAccessType
    },
    paginate: {
      pageNo: 0,
      offset: paginateLimit,
    },
  });

  useEffect(() => {
    if (
      accountProfile && accountProfile.id &&
      !(
        accountProfile.userAccessType === "buyer" ||
        accountProfile.userAccessType === "vendor"
      )
    ) { navigate("/dashboard"); }
    getRfqList();
    // eslint-disable-next-line
  }, [accountProfile]);

  const getRfqList = useCallback(
    async (searchCondVal = searchCond) => {
      const allRfq = await GetRfq(searchCondVal);
      if (allRfq) {
        if (allRfq.data) setRfqList(allRfq.data);
        if (allRfq.dataCount) setTotalCount(allRfq.dataCount);
      }
    },
    // eslint-disable-next-line
    [searchCond]
  );

  const deleteIt = async () => {
    DeleteRfq(deleteModalData)
      .then(() => {
        toaster.notify("Rfq was deleted", {
          position: "top-right",
          type: "success",
        });
        closeDeleteModal();
        const newSearchCond = {
          ...searchCond,
          search: {
            ...searchCond.search,
            getCount: true,
          },
        };
        setSearchCond(newSearchCond);
        getRfqList(newSearchCond);
      })
      .catch((err) => {
        toaster.notify(strings["error." + errorCode(err)] || strings["error.e10100"], {
          position: "top-right",
          type: "error",
        });
        closeDeleteModal()
      });
  };

  const inputResponse = (resType: string) => {
    toaster.notify(resType === "add" ? "Rfq was added" : "Rfq was updated", {
      position: "top-right",
      type: "success",
    });
    const getCount = resType === "add" ? true : false;
    const newSearchCond = {
      ...searchCond,
      search: {
        ...searchCond.search,
        getCount: getCount,
      },
    };
    setSearchCond(newSearchCond);
    getRfqList(newSearchCond);
  };

  const onPageChanged = useCallback(async (selectedItem: any) => {
    const newSearchCond = {
      ...searchCond,
      search: {
        ...searchCond.search,
        getCount: false,
      },
      paginate: {
        ...searchCond.paginate,
        pageNo: selectedItem.selected,
      },
    };
    setSearchCond(newSearchCond);
    getRfqList(newSearchCond);
    // eslint-disable-next-line
  }, []);

  const onSearch = (sTerm: string) => {
    const newSearchCond = {
      ...searchCond,
      search: {
        ...searchCond.search,
        getCount: false,
        searchVal: sTerm,
      },
    };
    setSearchCond(newSearchCond);
    getRfqList(newSearchCond);
  };
  // eslint-disable-next-line
  const onDebounceSearch = useMemo(() => debounce(onSearch, 700), []);

  return (
    <>
      <Layout>
        {isModal && <RfqForm inputResponse={inputResponse} />}
        {isDeleteModal && <DeleteModal deleteIt={deleteIt} />}
        <SimpleHeader name="RFQ" parentName="Admin" />
        <Container className="mt--6" fluid>
          <Card>
            <CardHeader className="border-0">
              <Row>
                <Col xs="6">
                  <Input
                    placeholder="Search Name, Code"
                    value={searchTerm}
                    type="text"
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      onDebounceSearch(e.target.value);
                    }}
                    autoComplete="off"
                  />
                </Col>
                <Col className="text-right" xs="6">
                  {accountProfile && accountProfile.userAccessType === "buyer" && <Button
                    className="btn-round btn-icon"
                    color="primary"
                    onClick={() => openModal()}
                    size="sm"
                  >
                    <span className="btn-inner--text">Add RFQ</span>
                  </Button>}
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
                  <th>RFQ Code</th>
                  <th>Part Number</th>
                  <th>Quantity</th>
                  <th>Bid Start Date</th>
                  <th>Bid End Date</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rfqList.length > 0 &&
                  rfqList.map((item: any) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.rfqCode}</td>
                        <td>{item.partNumber}</td>
                        <td>{item.quantity}</td>
                        <td>
                          {moment(item.bidStartDate).format("DD-MM-YYYY")}
                        </td>
                        <td>{moment(item.bidEndDate).format("DD-MM-YYYY")}</td>
                        <td className="table-actions">
                          {accountProfile && accountProfile.userAccessType === "buyer" && <>
                          <a
                            className="table-action"
                            href="#/"
                            id="tooltip209424781"
                            onClick={() => openModal(item)}
                          >
                            <i className="fas fa-user-edit" />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip209424781"
                          >
                            Edit RFQ
                          </UncontrolledTooltip>
                          </>}
                          <Link
                            className="table-action"
                            to={`${
                              accountProfile &&
                              accountProfile.userAccessType === "buyer"
                                ? "/buyer/rfq/view/"
                                : "/vendor/rfq/view/"
                            }${item.id}`}
                            id="tooltip12475021"
                          >
                            <i className="fas fa-eye" />
                          </Link>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip12475021"
                          >
                            View RFQ
                          </UncontrolledTooltip>
                          {accountProfile && accountProfile.userAccessType === "buyer" && <>
                          <a
                            className="table-action table-action-delete"
                            href="#/"
                            id="tooltip12475020"
                            onClick={() => openDeleteModal({ id: item.id })}
                          >
                            <i className="fas fa-trash" />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip12475020"
                          >
                            Delete RFQ
                          </UncontrolledTooltip>
                          </>}
                        </td>
                      </tr>
                    );
                  })}
                {rfqList.length === 0 && (
                  <tr>
                    <td colSpan={7}>No Data Found.</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <div className="paginationHead align-self-end">
              {totalCount > paginateLimit && (
                <div>
                  <Pagination
                    previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={Math.ceil(totalCount / paginateLimit)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={onPageChanged}
                    containerClassName={"pagination"}
                    pageClassName={"page-item"}
                    previousClassName={"page-item"}
                    nextClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextLinkClassName={"page-link"}
                    pageLinkClassName={"page-link"}
                    activeClassName={"active"}
                  />
                </div>
              )}
            </div>
          </Card>
        </Container>
      </Layout>
    </>
  );
}

export default RFQPage;
