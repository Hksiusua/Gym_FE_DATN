// import { useState } from "react";
import ModalCreateUser from "./ModalCreateUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalUpdateUser";

import Table from "./Table";

import { useEffect, useState } from "react";
import { showAllUser, getUserWithPaginate } from "../../service/apiService";
import ModalDeleteUser from "./ModalDeleteUser";
import TableReactPaginate from "./TableReactPaginate";

const Manager = (props) => {
  const [pageCount, setPageCount] = useState(0);
  const LIMIT_USER = 6;
  const [showModalCreateUser, setshowModalCreateUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [ListUser, setListUser] = useState([]);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalViewUser, setShowModalViewUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    fetchListUser();
    fetchListUserWithPaginate(1);
  }, []);

  const fetchListUser = async () => {
    try {
      let res = await showAllUser();
      if (res.data.EC === 0) {
        setListUser(res.data.DT);
      } else {
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const fetchListUserWithPaginate = async (page) => {
    try {
      let res = await getUserWithPaginate(page, LIMIT_USER);
      if (res.data.EC === 0) {
        setListUser(res.data.DT.users);
        setPageCount(res.data.DT.totalPages);
      } else {
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const handleClickBtnUpdate = (user) => {
    setShowModalUpdateUser(true);
    setDataUpdate(user);
    // console.log("update user: ", user);
  };

  const handleClickBtnView = (user) => {
    setShowModalViewUser(true);
    setDataUpdate(user);
  };
  const handleClickBtnDelete = (user) => {
    setShowModalDeleteUser(true);
    setDataUpdate(user);
  };

  return (
    <>
      <div className="mannager-user-container">
        <div className="title-manager"></div>
        <div className="users-content">
          <div>
            <button
              className="btn btn-info"
              onClick={() => {
                setshowModalCreateUser(true);
              }}
            >
              Add new users
            </button>
          </div>

          <div>
            {/* <Table
              ListUser={ListUser}
              handleClickBtnUpdate={handleClickBtnUpdate}
              handleClickBtnView={handleClickBtnView}
              handleClickBtnDelete={handleClickBtnDelete}
            ></Table> */}
            <TableReactPaginate
              ListUser={ListUser}
              handleClickBtnUpdate={handleClickBtnUpdate}
              handleClickBtnView={handleClickBtnView}
              handleClickBtnDelete={handleClickBtnDelete}
              pageCount={pageCount}
              fetchListUserWithPaginate={fetchListUserWithPaginate}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            ></TableReactPaginate>

            <br></br>
            <ModalCreateUser
              show={showModalCreateUser}
              onHide={() => setshowModalCreateUser(false)}
              // fetchListUser={fetchListUser}
              fetchListUserWithPaginate={fetchListUserWithPaginate}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            ></ModalCreateUser>

            <ModalUpdateUser
              show={showModalUpdateUser}
              onHide={() => setShowModalUpdateUser(false)}
              // fetchListUser={fetchListUser}
              dataUpdate={dataUpdate}
              fetchListUserWithPaginate={fetchListUserWithPaginate}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            ></ModalUpdateUser>

            <ModalViewUser
              show={showModalViewUser}
              onHide={() => setShowModalViewUser(false)}
              // fetchListUser={fetchListUser}
              dataUpdate={dataUpdate}
              fetchListUserWithPaginate={fetchListUserWithPaginate}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            ></ModalViewUser>

            <ModalDeleteUser
              show={showModalDeleteUser}
              onHide={() => setShowModalDeleteUser(false)}
              // fetchListUser={fetchListUser}
              dataUpdate={dataUpdate}
              fetchListUserWithPaginate={fetchListUserWithPaginate}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            ></ModalDeleteUser>
          </div>
        </div>
      </div>
    </>
  );
};
export default Manager;
