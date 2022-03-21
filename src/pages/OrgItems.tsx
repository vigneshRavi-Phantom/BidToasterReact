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
import { useNavigate } from "react-router-dom";
import SimpleHeader from "containers/Admin/SimpleHeader";
import orgItemService from "services/orgItemService";
import { useModal } from "contexts/ModalContextProvider";
import { useAuth } from "contexts/AuthContextProvider";
import toaster from "components/toaster";
import Pagination from "react-paginate";
import { debounce } from "lodash";

const OrgItemForm = lazy(() => import("containers/OrgItems/OrgItemForm"));
const DeleteModal = lazy(() => import("components/modals/DeleteModal"));
const paginateLimit = 20;

function OrgItems() {
  const { GetOrgItems, DeleteOrgItem } = orgItemService();
  const {
    isModal,
    openModal,
    isDeleteModal,
    openDeleteModal,
    closeDeleteModal,
    deleteModalData,
  }: any = useModal();
  const navigate = useNavigate();
  const { accountProfile } = useAuth();
  const [orgItemList, setOrgItemList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [searchCond, setSearchCond] = useState({
    search: {
      searchVal: "",
      searchType: "",
      getCount: true,
      orgId: accountProfile && accountProfile.id,
    },
    paginate: {
      pageNo: 0,
      offset: paginateLimit,
    },
  });

  useEffect(() => {
    if (accountProfile && accountProfile.userAccessType !== "organization")
    navigate("/dashboard");

    getOrgItemList();
    // eslint-disable-next-line
  }, []);

  const getOrgItemList = useCallback(
    async (searchCondVal = searchCond) => {
      const allOrgItems = await GetOrgItems(searchCondVal);
      if (allOrgItems) {
        if (allOrgItems.data) setOrgItemList(allOrgItems.data);
        if (allOrgItems.dataCount) setTotalCount(allOrgItems.dataCount);
      }
    },
    // eslint-disable-next-line
    [searchCond]
  );

  const deleteIt = async () => {
    DeleteOrgItem(deleteModalData)
      .then(() => {
        toaster.notify("Item was deleted", {
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
        getOrgItemList(newSearchCond);
      })
      .catch(() => closeDeleteModal());
  };

  const inputResponse = (resType: string) => {
    toaster.notify(resType === "add" ? "Item was added" : "Item was updated", {
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
    getOrgItemList(newSearchCond);
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
    getOrgItemList(newSearchCond);
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
    getOrgItemList(newSearchCond);
  };
  // eslint-disable-next-line
  const onDebounceSearch = useMemo(() => debounce(onSearch, 700), []);

  return (
    <>
      <Layout>
        {isModal && <OrgItemForm inputResponse={inputResponse} />}
        {isDeleteModal && <DeleteModal deleteIt={deleteIt} />}
        <SimpleHeader name="Items" parentName="Admin" />
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
                  <Button
                    className="btn-round btn-icon"
                    color="primary"
                    href="#pablo"
                    id="tooltip443412080"
                    onClick={() => openModal()}
                    size="sm"
                  >
                    <span className="btn-inner--text">Add Item</span>
                  </Button>
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
                  <th>Item Name</th>
                  <th>Item Code</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {orgItemList.length > 0 &&
                  orgItemList.map((item: any) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.itemName}</td>
                        <td>{item.itemCode}</td>
                        <td className="table-actions">
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
                            Edit Item
                          </UncontrolledTooltip>
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
                            Delete Item
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                    );
                  })}
                {orgItemList.length === 0 && (
                  <tr>
                    <td colSpan={3}>No Data Found.</td>
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

export default OrgItems;
