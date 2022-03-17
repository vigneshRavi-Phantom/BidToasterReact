import { useEffect, useState, lazy, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
import SimpleHeader from "containers/Admin/SimpleHeader";
import userService from "services/userService";
import { useModal } from "contexts/ModalContextProvider";
import toaster from "components/toaster";
import Pagination from "react-paginate";
import { debounce } from "lodash";
import { useAuth } from "contexts/AuthContextProvider";

const UserForm = lazy(() => import("containers/Users/UserForm"));
const DeleteModal = lazy(() => import("components/modals/DeleteModal"));
const paginateLimit = 20;

function Users() {
  const { GetUsers, DeleteUser } = userService();
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
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [searchCond, setSearchCond] = useState({
    search: {
      searchVal: "",
      searchType: "",
      userAccessType: "buyer",
      getCount: true,
      orgId: accountProfile && accountProfile.id
    },
    paginate: {
      pageNo: 0,
      offset: paginateLimit,
    },
  });

  useEffect(() => {
    if (accountProfile && accountProfile.userAccessType !== "organization")
      navigate("/rfq");

    getUsersList();
    // eslint-disable-next-line
  }, []);

  const getUsersList = useCallback(
    async (searchCondVal = searchCond) => {
      const allUsers = await GetUsers(searchCondVal);
      if (allUsers) {
        if (allUsers.data) setUserList(allUsers.data);
        if (allUsers.dataCount) setTotalCount(allUsers.dataCount);
      }
    },
    // eslint-disable-next-line
    [searchCond]
  );

  const deleteIt = async () => {
    DeleteUser(deleteModalData)
      .then(() => {
        toaster.notify("User was deleted", {
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
        getUsersList(newSearchCond);
      })
      .catch(() => closeDeleteModal());
  };

  const inputResponse = (resType: string) => {
    toaster.notify(resType === "add" ? "User was added" : "User was updated", {
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
    getUsersList(newSearchCond);
  };

  const getUserAccessType = (type: string) => {
    let output = "";
    if (type === "buyer") {
      output = "Buyer";
    } else if (type === "vendor") {
      output = "Vendor";
    } else if (type === "vendor_buyer") {
      output = "Vendor & Buyer";
    }

    return output;
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
    getUsersList(newSearchCond);
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
    getUsersList(newSearchCond);
  };
  // eslint-disable-next-line
  const onDebounceSearch = useMemo(() => debounce(onSearch, 700), []);

  return (
    <>
      <Layout>
        {isModal && <UserForm inputResponse={inputResponse} />}
        {isDeleteModal && <DeleteModal deleteIt={deleteIt} />}
        <SimpleHeader name="Users" parentName="Admin" />
        <Container className="mt--6" fluid>
          <Card>
            <CardHeader className="border-0">
              <Row>
                <Col xs="6">
                  <Input
                    placeholder="Search Name, Email"
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
                    <span className="btn-inner--text">Add User</span>
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
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {userList.length > 0 &&
                  userList.map((item: any) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.email}</td>
                        <td>{getUserAccessType(item.userAccessType)}</td>
                        <td>{item.userStatus}</td>
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
                            Edit User
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
                            Delete User
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                    );
                  })}
                {userList.length === 0 && (
                  <tr>
                    <td colSpan={6}>No Data Found.</td>
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

export default Users;
