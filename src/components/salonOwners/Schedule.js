import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getScheduleCurrent,
  resetScheduleCurentList,
  getListStaffForSalon,
  resetListStaffOfSalon,
  finishOrder,
  cancelOrder,
  getSalonBookingHistory,
  resetSalonBookingHistoryList,
} from "../../redux/actions/creators/salon";
import bgImg from "../../assets/barbershopbg.jpg";
import paperbg from "../../assets/paperbg.jpg";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "bulma/css/bulma.css";
import "bulma-extensions/dist/css/bulma-extensions.min.css";

import {
  convertISOStringToLocaleTimeString,
  currencyFormatter,
  convertISOStringToLocaleDateString,
} from "../../utils";

const link = {
  fontSize: "20px",
  color: "white",
};
const root = {
  backgroundImage: `url(${bgImg})`,
  backgroundRepeat: "repeat-y",
  backgroundSize: "100%",
  minHeight: "60rem",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  borderRadius: "25px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Schedule() {
  const minDate = new Date().toISOString().substring(0, 10);
  const [date, setDate] = useState(minDate);
  const [dateHistory, setDateHistory] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [data, setData] = useState({
    day: convertDate(date),
    nameStaff: "",
  });

  //set staff id for order current
  const [staff, setStaff] = useState("");
  //set staff id for history order
  const [staffId, setStaffId] = useState("");
  //set order id selected
  const [orderIdSelected, setOrderIdSelected] = useState("");
  const [orderIdCancel, setOrderIdCancel] = useState("");
  const [value, setValue] = React.useState("1");

  //set action dialog
  const [openFinish, setOpenFinish] = React.useState(false);
  const [openCancel, setOpenCancel] = React.useState(false);

  //handle function set, show data
  //open dialog finish order
  const handleOpenFinish = (data) => {
    setOrderIdSelected(data);
    setOpenFinish(true);
  };
  //close dialog finish order
  const handleCloseFinish = () => {
    setOpenFinish(false);
    setOrderIdSelected("");
  };
  //open dialog cancel order
  const handleOpenCancel = (data) => {
    setOpenCancel(true);
    setOrderIdCancel(data);
  };
  //close dialog cancel order
  const handleCloseCancel = () => {
    setOpenCancel(false);
    setOrderIdCancel("");
  };

  //handle function select data
  const handleSelectDate = (e) => {
    setDate(convertDate(e.target.value));
  };

  const handleSelectStaff = (e) => {
    setStaff(e.target.value);
  };
  const handleSelectStaffIdForHistory = (e) => {
    setStaffId(e.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSelectDateHistory = (e) => {
    setDateHistory(e.target.value);
  };

  const dispatch = useDispatch();

  //call redux store
  const { listStaff } = useSelector((state) => state.listStaffSalon);
  const { currentSchedule } = useSelector((state) => state.scheduleCurent);
  const { token, account_name: username } = useSelector(
    (state) => state.loginAccount.account
  );
  const { historyBooking } = useSelector((state) => state.salonHistory);

  //call api get list staff
  useEffect(() => {
    dispatch(getListStaffForSalon(token));
    return () => {
      dispatch(resetListStaffOfSalon());
    };
  }, [dispatch, token]);

  //call api get schedule
  useEffect(() => {
    dispatch(getScheduleCurrent(token, data));
    return () => {
      dispatch(resetScheduleCurentList());
    };
  }, [dispatch, token, data]);

  //call api get history booking
  useEffect(() => {
    dispatch(
      getSalonBookingHistory(token, { day: dateHistory, staffId: staffId })
    );
    return () => {
      dispatch(resetSalonBookingHistoryList());
    };
  }, [dispatch, token, dateHistory, staffId]);

  //feature finish order
  const handleFinish = () => {
    if (!orderIdSelected) return;
    const successCallback = () => {
      console.log("callback");
      dispatch(resetScheduleCurentList());
      handleCloseFinish();
      dispatch(getScheduleCurrent(token, data));
    };
    dispatch(
      finishOrder(
        token,
        { id: orderIdSelected.registerServiceId },
        successCallback
      )
    );
  };

  const handleCancel = () => {
    if (!orderIdCancel) return;
    const successCallback = () => {
      dispatch(resetScheduleCurentList());
      handleCloseCancel();
      dispatch(getScheduleCurrent(token, data));
    };
    dispatch(
      cancelOrder(
        token,
        {
          registerServiceId: orderIdCancel.registerServiceId,
          note: "Customer confirmed!",
        },
        successCallback
      )
    );
  };

  useEffect(() => {
    if (date) {
      setData({ day: date, staffId: staff });
    }
  }, [date, staff]);

  function convertDate(date) {
    var newdate = new Date(date),
      mnth = ("0" + (newdate.getMonth() + 1)).slice(-2),
      day = ("0" + newdate.getDate()).slice(-2);
    return [newdate.getFullYear(), mnth, day].join("-");
  }

  const handleLoadCurrentData = () => {
    dispatch(resetScheduleCurentList());
    dispatch(getScheduleCurrent(token, data));
  };

  const handleLoadHistoryData = () => {
    dispatch(resetSalonBookingHistoryList());
    dispatch(
      getSalonBookingHistory(token, { day: dateHistory, staffId: staffId })
    );
  };

  return (
    <div className="p-5" style={root}>
      <div
        className="columns"
        style={{
          minHeight: "400px",
          // , marginTop: "96px"
        }}
      >
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
          <TabContext value={value}>
            <Box
              sx={{
                bgcolor: "background.paper",
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <TabList
                variant="fullWidth"
                onChange={handleChange}
                aria-label="disabled tabs example"
              >
                <Tab
                  label="Lịch hẹn"
                  value="1"
                  onClick={handleLoadCurrentData}
                />
                <Tab
                  label="Lịch sử"
                  value="2"
                  onClick={handleLoadHistoryData}
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              {" "}
              <div className="row">
                <div className="mb-5">
                  <input
                    style={{ width: "400px" }}
                    className="input is-normal"
                    placeholder="Normal input"
                    type="date"
                    value={date}
                    min={minDate}
                    onChange={handleSelectDate}
                  ></input>
                </div>
                <div className="col-3">
                  <select
                    className="custom-select"
                    value={staff}
                    onChange={handleSelectStaff}
                    style={{ width: "20rem" }}
                  >
                    <option value="">Tất cả...</option>
                    {listStaff?.map((staff) => (
                      <option key={staff.staffId} value={staff.staffId}>
                        {staff.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <p title="stt">#</p>
                    </th>{" "}
                    <th>
                      <p title="CustomerName">Khách hàng</p>
                    </th>
                    <th>
                      <p title="Order">Dịch vụ</p>
                    </th>
                    <th>
                      <p title="Time">Thời gian</p>
                    </th>
                    <th>
                      <p title="Time">Giá</p>
                    </th>
                    <th>
                      <p title="Stylist">Barber</p>
                    </th>
                    <th>
                      <p title="Status">Trạng thái</p>
                    </th>
                    <th className="has-text-centered">
                      <p title="Actions"></p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentSchedule?.map((element) => (
                    <tr>
                      <th>{currentSchedule.indexOf(element) + 1}</th>

                      <td>
                        {" "}
                        {element?.nameCustomer === "Bookingforcustomer" ? (
                          <span className="is-size-5 has-text-weight-semibold text-success">
                            Đặt hộ khách hàng
                          </span>
                        ) : (
                          <span className="is-size-5 has-text-weight-semibold has-text-info-dark">
                            {element.nameCustomer}
                          </span>
                        )}
                        
                        <p> {element.phone ? (<span>{element.phone}</span>):(<span>{element.note}</span>)}</p>
                      </td>
                      <td>
                        <p className="has-text-weight-bold">
                          {element.nameService}
                        </p>
                        <p>{element.service_time} phút</p>
                      </td>
                      <td>
                        {" "}
                        {convertISOStringToLocaleTimeString(
                          element.timeUse
                        ).slice(0, -3)}
                      </td>
                      <td className="text-danger">
                        {currencyFormatter.format(
                          element.price_original -
                            element.price_original * (element.promotion / 100)
                        )}
                      </td>
                      <td>{element.nameStaff}</td>
                      <td className="has-text-link has-text-weight-bold">
                        {element.nameStatus}
                      </td>

                      <td className="has-text-centered has-text-white">
                        <button
                          className="button is-rounded is-success mr-2"
                          onClick={() => handleOpenFinish(element)}
                        >
                          <i className="fa-solid fa-circle-check"></i>
                        </button>
                        <button
                          className="button is-rounded is-danger mr-2"
                          onClick={() => handleOpenCancel(element)}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Modal
                open={openFinish}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div className="has-text-centered">
                    <h1 className="is-size-4 has-text-weight-semibold">
                      {" "}
                      Bạn có muốn{" "}
                      <span className="has-text-info">hoàn thành</span> lịch hẹn
                      của{" "}
                      <span className="text-success">
                        {orderIdSelected.nameCustomer}
                        {console.log(orderIdSelected)}
                      </span>{" "}
                      ?
                    </h1>
                    <br></br>
                    <button
                      onClick={handleFinish}
                      className="button is-rounded is-success mr-5"
                      style={{ width: "150px" }}
                    >
                      Xác nhận
                    </button>
                    <button
                      onClick={handleCloseFinish}
                      className="button is-rounded is-danger ml-5"
                      style={{ width: "150px" }}
                    >
                      Hủy
                    </button>
                  </div>
                </Box>
              </Modal>
              <Modal
                open={openCancel}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div className="has-text-centered">
                    <h1 className="is-size-4 has-text-weight-semibold">
                      {" "}
                      Bạn có muốn <span className="has-text-danger">
                        hủy
                      </span>{" "}
                      lịch hẹn này ?
                    </h1>
                    <br></br>
                    <button
                      onClick={handleCancel}
                      className="button is-rounded is-success mr-5"
                      style={{ width: "150px" }}
                    >
                      Xác nhận
                    </button>
                    <button
                      onClick={handleCloseCancel}
                      className="button is-rounded is-danger ml-5"
                      style={{ width: "150px" }}
                    >
                      Đóng
                    </button>
                  </div>
                </Box>
              </Modal>
            </TabPanel>
            <TabPanel value="2">
              <div className="row">
                <div className="mb-5">
                  <input
                    style={{ width: "400px" }}
                    className="input is-normal"
                    placeholder="Normal input"
                    value={dateHistory}
                    onChange={handleSelectDateHistory}
                    type="date"
                  ></input>
                </div>
                <div className="col-3">
                  <select
                    className="custom-select"
                    value={staffId}
                    onChange={handleSelectStaffIdForHistory}
                    style={{ width: "20rem" }}
                  >
                    <option value="">Tất cả...</option>
                    {listStaff?.map((staff) => (
                      <option key={staff.staffId} value={staff.staffId}>
                        {staff.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <p title="stt">#</p>
                    </th>
                    <th>
                      <p title="CustomerName">Khách hàng</p>
                    </th>
                    <th>
                      <p title="Order">Dịch vụ</p>
                    </th>
                    <th>
                      <p title="Order">Giá</p>
                    </th>
                    <th>
                      <p title="Date">Thời gian</p>
                    </th>
                    <th>
                      <p title="Stylist">Barber</p>
                    </th>
                    <th className=" has-text-centered">
                      <p title="Status">Trạng thái</p>
                    </th>
                    <th>
                      <p title="Note">Ghi chú</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {historyBooking?.map((element) => (
                    <tr>
                      <th>{historyBooking?.indexOf(element) + 1}</th>
                      <td>
                        <span className="is-size-5 has-text-weight-semibold has-text-info-dark">
                          {element.nameCustomer}
                        </span>
                        <p> {element.phone ? element.phone : "Salon booked"}</p>
                      </td>{" "}
                      <td>
                        <span className="has-text-weight-bold">
                          {" "}
                          {element.nameService}
                        </span>
                        <p>{element.service_time} phút</p>
                      </td>{" "}
                      <td>
                        <span className="has-text-danger">
                          {" "}
                          {currencyFormatter.format(
                            element.price_original -
                              element.price_original * (element.promotion / 100)
                          )}
                        </span>
                      </td>
                      <td>
                        {" "}
                        <span className="has-text-weight-bold">Date:</span>{" "}
                        {convertISOStringToLocaleDateString(element.timeUse)}
                        <p>
                          <span className="has-text-weight-bold">Time:</span>{" "}
                          {convertISOStringToLocaleTimeString(
                            element.timeUse
                          ).slice(0, -3)}
                        </p>
                      </td>
                      <td>{element.nameStaff}</td>
                      {element.nameStatus === "finished" && (
                        <td className="has-text-success is-size-4 has-text-weight-bold has-text-centered">
                          <i className="fa-solid fa-check"></i>
                        </td>
                      )}{" "}
                      {element.nameStatus === "cancelled" && (
                        <td className="has-text-danger is-size-4 has-text-weight-bold has-text-centered">
                          <i className="fa-solid fa-xmark"></i>
                        </td>
                      )}
                      <td>{element.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabPanel>
          </TabContext>
        </div>
        <div className="column is-2"></div>
      </div>
    </div>
  );
}
