import { Link } from "react-router-dom";
import paperbg from "../../assets/paperbg.jpg";
import bgImg from "../../assets/barbershopbg.jpg";
import salonFixedData from "./DashboardData.json";
import { logout } from "../../redux/actions/creators/auth";
import {
  getListStaffForSalon,
  resetListStaffOfSalon,
  addStaff,
  editStaff,
  deleteStaff,
} from "../../redux/actions/creators/salon";

import { useState, useEffect } from "react";
import { Modal, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { validPhone } from "../../validations/regex";

export default function SalonDashboard() {
  //STATE ADD STAFF
  const [staffName, setStaffName] = useState("");
  const [staffPhone, setStaffPhone] = useState("");
  const [staffAddress, setStaffAddress] = useState("");
  const [staffTitle, setStaffTitle] = useState("");

  //STATE EDIT STAFF
  const [newStaffInfo, setNewStaffInfo] = useState(null);

  //STATE DELETE STAFF
  const [staffDeleteSelected, setStaffDeleteSelected] = useState("");

  //ERROR
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  //RESET ADD STAFF FORM
  const resetFormAddStaff = () => {
    setStaffName("");
    setStaffPhone("");
    setStaffAddress("");
    setStaffTitle("");
  };

  //ADD STAFF
  const handleAddStaff = (e) => {
    e.preventDefault();
    setError(false);
    setPhoneError(false);

    const newStaff = {
      name: staffName,
      phone: staffPhone,
      address: staffAddress,
      title: staffTitle,
    };

    let pass = true;

    if (
      staffName === "" ||
      staffPhone === "" ||
      staffAddress === "" ||
      staffTitle === ""
    ) {
      setError(true);
      pass = false;
      return;
    }
    if (!validPhone.test(staffPhone)) {
      setPhoneError(true);
      pass = false;
    }
    if (pass) {
      console.log(newStaff);
      resetFormAddStaff();
      const successCallback = () => {
        dispatch(resetListStaffOfSalon);
        handleCloseAdd();
        dispatch(getListStaffForSalon(token));
      };
      dispatch(addStaff(token, newStaff, successCallback));
    }
  };

  //EDIT STAFF
  const handleEditStaff = (event) => {
    event.preventDefault();
    const { name, address, title, phone } = newStaffInfo;
    if (!name || !phone || !address || !title) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    if (!validPhone.test(phone)) {
      setError("Số điện thoại không hợp lệ.");
      return;
    }
    setError(null);
    const submitObject = {
      name,
      phone,
      address,
      title,
    };
    const successCallback = () => {
      dispatch(resetListStaffOfSalon());
      setNewStaffInfo(null);
      handleCloseEdit();
      dispatch(getListStaffForSalon(token));
    };
    dispatch(
      editStaff(token, submitObject, successCallback, newStaffInfo.staffId)
    );
  };

  const root = {
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "repeat-y",
    backgroundSize: "100%",
    minHeight: "55rem",
  };
  const fakeDashboardData = salonFixedData;

  // -- GET DATA --
  const dispatch = useDispatch();
  const { token, account_name: username } = useSelector(
    (state) => state.loginAccount.account
  );
  const { listStaff } = useSelector((state) => state.listStaffSalon);
  const { staffEdited, successMess } = useSelector(
    (state) => state.editStaffProfile
  );

  useEffect(() => {
    dispatch(getListStaffForSalon(token));
    return () => {
      dispatch(resetListStaffOfSalon());
    };
  }, [dispatch, token]);

  // -- MODAL --
  const modalcss = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "25px",
    boxShadow: 24,
    p: 4,
  };
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => {
    setError(false);
    setOpenAdd(false);}

  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenEdit = (staffInfo) => {
    setOpenEdit(true);
    setNewStaffInfo(staffInfo);
  };
  const handleCloseEdit = () => setOpenEdit(false);

  const [openDeleteStaff, setOpenDeleteStaff] = useState(false);
  const handleOpenDeleteStaff = (data) => {
    setOpenDeleteStaff(true);
    setStaffDeleteSelected(data);
  };
  const handleCloseDeleteStaff = () => {
    setOpenDeleteStaff(false);
    setStaffDeleteSelected("");
  };

  //DELETE STAFF
  const handleDeleteStaff = () => {
    if (!staffDeleteSelected) return;
    const successCallback = () => {
      dispatch(resetListStaffOfSalon());
      handleCloseDeleteStaff();
      dispatch(getListStaffForSalon(token));
    };
    dispatch(
      deleteStaff(token, { id: staffDeleteSelected.staffId }, successCallback)
    );
  };

  return (
    <div>
      <div style={root}>
        <div className="columns">
          <div className="column is-2"></div>
          <div
            className="column is-8"
            style={{
              background: "url(" + paperbg + ")",
              padding: 0,
              marginTop: "30px",
              marginBottom: "30px",
            }}
          >
            <h2 className="is-size-1 has-text-centered mt-5 mb-5">
              Quản lý nhân viên
            </h2>
            <div className="has-text-right mb-5 mr-5">
              <button
                className="button is-info is-rounded"
                onClick={handleOpenAdd}
              >
                {" "}
                Thêm nhân viên
              </button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <p title="stt">#</p>
                  </th>
                  <th>
                    <p title="EmployeeName">Tên</p>
                  </th>
                  <th>
                    <p title="EmployeeTitle">Địa chỉ</p>
                  </th>
                  <th>
                    <p title="Phone">SĐT</p>
                  </th>
                  <th>
                    <p title="Phone">Mô tả</p>
                  </th>
                  <th className="has-text-centered" style={{minWidth: "15rem"}}>
                    <p title="Actions"></p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {listStaff?.map((element) => (
                  <tr key={element.staffId}>
                    <th scope="row">{listStaff.indexOf(element) + 1}</th>
                    <td>{element.name}</td>
                    <td>{element.address}</td>
                    <td>{element.phone}</td>
                    <td>{element.title}</td>

                    <td className="has-text-centered">
                      <button
                        onClick={() => handleOpenEdit(element)}
                        className="button is-rounded is-primary mr-5"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button
                        onClick={() => {
                          handleOpenDeleteStaff(element);
                        }}
                        className="button is-rounded is-danger"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="column is-2"></div>
        </div>
      </div>
      {/* Modal add staff */}
      <Modal
        open={openAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalcss}>
          <div>
            <div className="has-text-centered">
              <h1 className="is-size-3 mb-5">Thêm nhân viên</h1>
              {phoneError && (
                <p className="text-danger">Số điện thoại không hợp lệ.</p>
              )}
              {error && (
                <p className="text-danger mb-3">Vui lòng điền đầy đủ thông tin!</p>
              )}
            </div>
            <form action="" method="post" className="addEmployee">
              <fieldset>
                <div
                  className="has-text-right"
                  style={{ marginRight: "100px" }}
                >
                  <label>Họ và tên*:</label>
                  <input
                    id="Name"
                    className="input w-50 ml-5"
                    style={{ height: "30px" }}
                    type="text"
                    placeholder="Name"
                    maxLength={40}
                    value={staffName}
                    onChange={(event) => {
                      setStaffName(event.target.value);
                    }}
                  />
                  
                  <br></br>
                  <label className="mt-5">SĐT*:</label>
                  <input
                    id="Phone"
                    className="input w-50 mt-5 ml-5"
                    style={{ height: "30px" }}
                    type="phone"
                    placeholder="Phone"
                    maxLength={40}
                    value={staffPhone}
                    onChange={(event) => {
                      setStaffPhone(event.target.value);
                    }}
                  />{" "}
                  <br></br>
                  <label className="mt-5">Địa chỉ*:</label>
                  <input
                    id="Address"
                    className="input w-50 mt-5 ml-5"
                    style={{ height: "30px" }}
                    type="text"
                    placeholder="Address"
                    maxLength={40}
                    value={staffAddress}
                    onChange={(event) => {
                      setStaffAddress(event.target.value);
                    }}
                  />{" "}
                  <br></br>
                  <label className="mt-5">Mô tả*:</label>
                  <textarea
                    id="Title"
                    rows="4"
                    cols="50"
                    className="input mt-5 w-50 ml-5"
                    style={{ minHeight: "8rem" }}
                    type="text"
                    placeholder="Description"
                    maxLength={100}
                    value={staffTitle}
                    onChange={(event) => {
                      setStaffTitle(event.target.value);
                    }}
                  />{" "}
                  <br></br>
                </div>{" "}
                <br></br>
                <div className="has-text-right">
                  <button
                    className="button is-rounded is-info"
                    onClick={handleCloseAdd}
                  >
                    {" "}
                    Đóng
                  </button>
                  <button
                    className="button is-rounded is-primary ml-3"
                    onClick={handleAddStaff}
                  >
                    {" "}
                    Xác nhận
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </Box>
      </Modal>
      {/*  */}

      {/* Modal edit staff */}
      <Modal
        open={openEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalcss}>
          <div>
            <div className="has-text-centered">
              <h1 className="is-size-3 mb-5">Chỉnh sửa thông tin nhân viên</h1>
            </div>
            <form action="" method="post" className="editEmployee">
              <fieldset>
                <div
                  className="has-text-right"
                  style={{ marginRight: "100px" }}
                >
                  <label>Họ và tên*:</label>
                  <input
                    id="Name"
                    className="input w-50 ml-5"
                    style={{ height: "30px" }}
                    type="text"
                    maxLength={40}
                    placeholder="Text input"
                    value={newStaffInfo?.name}
                    onChange={(e) => {
                      setNewStaffInfo({
                        ...newStaffInfo,
                        name: e.target.value,
                      });
                    }}
                  />
                  
                  <br></br>
                  <label className="mt-5" htmlfor="Phone">
                    SĐT*:
                  </label>
                  <input
                    id="Phone"
                    className="input w-50 mt-5 ml-5"
                    style={{ height: "30px" }}
                    type="phone"
                    maxLength={40}
                    placeholder="Text input"
                    value={newStaffInfo?.phone}
                    onChange={(e) => {
                      setNewStaffInfo({
                        ...newStaffInfo,
                        phone: e.target.value,
                      });
                    }}
                  />{" "}
                  <br></br>
                  <label className="mt-5" htmlfor="Address">
                    Địa chỉ*:
                  </label>
                  <input
                    id="Address"
                    className="input w-50 mt-5 ml-5"
                    style={{ height: "30px" }}
                    type="text"
                    maxLength={40}
                    placeholder="Text input"
                    value={newStaffInfo?.address}
                    onChange={(e) => {
                      setNewStaffInfo({
                        ...newStaffInfo,
                        address: e.target.value,
                      });
                    }}
                  />{" "}
                  <br></br>
                  <label className="mt-5">Mô tả*:</label>
                  <textarea
                    id="Title"
                    className="input mt-5 w-50 ml-5"
                    style={{ minHeight: "8rem" }}
                    type="text"
                    maxLength={100}
                    placeholder="Description"
                    value={newStaffInfo?.title}
                    onChange={(e) => {
                      setNewStaffInfo({
                        ...newStaffInfo,
                        title: e.target.value,
                      });
                    }}
                  />{" "}
                  <br></br>
                </div>{" "}
                <br></br>
                <div>{error && <p className="text-danger">{error}</p>}</div>
                <div className="has-text-right">
                  <button
                    className="button is-rounded is-danger"
                    onClick={handleCloseEdit}
                  >
                    {" "}
                    Hủy
                  </button>
                  <button
                    className="button is-rounded is-primary ml-3"
                    onClick={(e) => handleEditStaff(e)}
                  >
                    {" "}
                    Xác nhận
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </Box>
      </Modal>
      {/*  */}
      {/* Modal delete staff */}
      <Modal
        open={openDeleteStaff}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalcss}>
          <div className="has-text-centered">
            <h1 className="is-size-4 has-text-weight-semibold">
              {" "}
              Bạn có muốn <span className="has-text-danger">
                xóa
              </span>{" "}
              nhân viên này ?
            </h1>
            <br></br>{" "}
            <button
              onClick={handleCloseDeleteStaff}
              className="button is-rounded is-danger mr-5"
              style={{ width: "150px" }}
            >
              Hủy
            </button>
            <button
              className="button is-rounded is-info ml-5"
              style={{ width: "150px" }}
              onClick={handleDeleteStaff}
            >
              Xác nhận
            </button>
          </div>
        </Box>
      </Modal>
      {/*  */}
    </div>
  );
}
