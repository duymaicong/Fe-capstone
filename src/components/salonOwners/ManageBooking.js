import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "react-calendar";
import { currencyFormatter } from "../../utils";

import {
  getListServiceForSalon,
  resetListServiceOfSalon,
  getListStaffForSalon,
  resetListStaffOfSalon,
  getCalendar,
  resetCalendar,
  salonBooking,
} from "../../redux/actions/creators/salon";

import { styled } from "@mui/system";
import {
  Box,
  Button as MuiButton,
  Dialog,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import moment from "moment";
import introbg from "../../assets/introbg-1.jpg";
import videobg from "../../assets/videobg.jpg";
import patterbg from "../../assets/patterbg.svg";
import imageUnavailable from "../../assets/image-unavailable.png";

const root = {
  minHeight: "60rem",
  backgroundImage: `url(${introbg})`,
  backgroundRepeat: "repeat-y",
  backgroundSize: "100%",
  paddingBottom: "2rem",
};

const cardService = {
  height: "12rem",
  borderRadius: "25px",
  marginRight: "3rem",
};
const FieldLabel = styled(Box)({
  display: "flex",
  color: "#305470",
  fontSize: 30,
  fontFamily: "Segoe UI",
  alignItems: "center",
  justifyContent: "flex-end",
});
const FormWrapper = styled(Box)({
  minWidth: 800,
  backgroundColor: "white",
  padding: 30,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});
const ButtonWrapper = styled(Box)({
  backgroundColor: "white",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "2rem",
  paddingBottom: "1rem",
});
const ErrorText = styled(Typography)({
  color: "#ED4337",
  fontSize: 16,
  fontFamily: "Segoe UI",
  lineHeight: 1.75,
});

const SuccessText = styled(Typography)({
  color: "#4F8A10",
  fontSize: "2rem",
  fontFamily: "Segoe UI",
  lineHeight: 1.75,
});

export default function Staff() {
  const minDate = new Date(
    moment().add(4, "hours").add(15, "minutes").startOf("day")
  ); // If the current time is after 7:45pm, the min date will be the next day

  //STATE
  const [date, setDate] = useState(minDate);
  const [staff, setStaff] = useState("");
  const [time, setTime] = useState(undefined);
  const [dateFormated, setDateFormated] = useState(convertDate(minDate));
  const [staffInfo, setStaffInfo] = useState();
  const [serviceInfo, setServiceInfo] = useState(null);
  const [note, setNote] = useState("");

  //STATE ERROR
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listStaff } = useSelector((state) => state.listStaffSalon);

  useEffect(() => {
    if (staff && dateFormated) {
      setTime(undefined);
      setStaffInfo({
        staffId: staff,
        day: dateFormated,
      });
    }
  }, [staff, dateFormated]);

  //LOAD DATA FROM REDUX
  const { listService } = useSelector((state) => state.listServiceSalon);
  const { token, account_name: username } = useSelector(
    (state) => state.loginAccount.account
  );
  const { listCalendar } = useSelector((state) => state.listCalendar);
  const { errMess } = useSelector((state) => state.salonBooking);

  //GET LIST SERVICE OF SALON
  useEffect(() => {
    dispatch(getListServiceForSalon(token));
    return () => {
      dispatch(resetListServiceOfSalon());
    };
  }, [dispatch, token]);

  //GET LIST STAFF Of SALON
  useEffect(() => {
    dispatch(getListStaffForSalon(token));
    return () => {
      dispatch(resetListStaffOfSalon());
    };
  }, [dispatch, token]);

  //GET CALENDAR
  useEffect(() => {
    if (!serviceInfo) {
      setError("Vui lòng chọn một dịch vụ.");

      return;
    }
    setError(null);
    const reqestData = {
      service_time: serviceInfo.service_time,
      day: dateFormated,
      staffId: staff,
    };
    dispatch(getCalendar(token, reqestData));
    return () => {
      dispatch(resetCalendar());
    };
  }, [dispatch, token, staff, serviceInfo, dateFormated]);

  function convertDate(date) {
    var newdate = new Date(date),
      mnth = ("0" + (newdate.getMonth() + 1)).slice(-2),
      day = ("0" + newdate.getDate()).slice(-2);
    return [newdate.getFullYear(), mnth, day].join("-");
  }

  const handleInputDate = (date) => {
    setDate(date);
    setDateFormated(convertDate(date));
  };

  //DIALOG
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClose = () => {
    setDialogOpen(false);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  //BOOKING
  const handleSubmit = () => {
    const bookingInfo = {
      serviceId: serviceInfo.serviceId,
      staffId: staff,
      timeUse: `${dateFormated} ${time}:00`,
      price_original: serviceInfo.price,
      service_time: serviceInfo.service_time,
      note: note,
    };
    const callback = () => {
      setDialogOpen(true);
    };
    dispatch(salonBooking(token, bookingInfo, callback));
  };

  return (
    <div style={root}>
      <div className="columns">
        <div className="column is-1"></div>
        <div className="">
          <div className="mt-5 pt-5 text-center">
            <h2 style={{fontSize:"2rem", fontWeight:"bold"}}>Chọn dịch vụ</h2>
          </div>
          <div
            className="row pb-5"
            style={{
              paddingLeft: "7%",
              paddingTop: "3rem",
              minHeight: "40rem",
            }}
          >
            {listService?.map((service) => (
              <div
                className="card mb-5 col-5"
                style={cardService}
                key={service.serviceId}
                value={serviceInfo}
                onChange={() => setServiceInfo(service)}
              >
                <div className="row" style={{ minWidth: "40rem" }}>
                  <div className="form-check form-check-inline column is-1 ml-5 mt-5 pt-5 ">
                    <input
                      style={{ width: "1.5rem", height: "1.5rem" }}
                      type="radio"
                      name="inlineRadioOptions"
                      value={service.serviceId}
                      className="rounded mr-1 mb-2 bg-white"
                    ></input>
                  </div>
                  <div className="column is-9">
                    <div>
                      <h4 className="has-text-info-dark is-size-4 has-text-weight-bold">
                        {service.name}
                      </h4>
                      <span className="has-text-link-dark is-size-5">
                        {service.content}
                      </span>
                      <p className="is-size-5 has-text-dark">
                        {service.service_time} phút
                      </p>
                      {service.promotion === 0 && (
                        <p className="has-text-danger has-text-weight-semibold">
                          {" "}
                          {currencyFormatter.format(service.price)}{" "}
                        </p>
                      )}

                      {service.promotion !== 0 && (
                        <p className="has-text-grey-light has-text-weight-semibold">
                          <del> {currencyFormatter.format(service.price)} </del>

                          <span className="has-text-danger-dark has-text-weight-semibold">
                            {" "}
                            {"-> "}
                            {currencyFormatter.format(
                              service.price -
                                (service.price / 100) * service.promotion
                            )}{" "}
                          </span>
                          <span className="tag is-danger has-text-weight-semibold">
                            {" "}
                            {service.promotion} %
                          </span>
                        </p>
                      )}
                      <p className="">{service.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="mb-5 pt-5 rows"
            style={{
              background: "url(" + patterbg + ")",
              boxShadow: "1px 1px 20px black",
              minWidth: "1412px",
            }}
          >
            <div className="steps ml-5" id="stepsDemo">
              <div className="step-item is-completed is-link">
                <div className="step-marker">1</div>
                <div className="step-details">
                  <p className="step-title">Chọn ngày</p>
                  <br></br>
                  <Calendar
                    className="rounded"
                    onChange={handleInputDate}
                    value={date}
                    minDate={minDate}
                  />
                </div>
              </div>

              <div className="step-item  is-completed is-link">
                <div className="step-marker">2</div>
                <div className="step-details">
                  <p className="step-title">Chọn barber/Khung giờ</p>
                  <br></br>
                  <select
                    className="form-select form-select-lg mb-3 "
                    value={staff}
                    onChange={(e) => setStaff(e.target.value)}
                    style={{
                      width: "95%",
                      height: "2.5rem",
                      borderRadius: "5px",
                      backgroundColor: "white",
                    }}
                  >
                    <option value="">Chọn barber...</option>
                    {listStaff?.map((staff) => (
                      <option key={staff.staffId} value={staff.staffId}>
                        {staff.name}
                      </option>
                    ))}
                  </select>
                  <br></br>
                  <div className="form-check">
                    {listCalendar ? listCalendar?.map((slot) => (
                      <div
                        className="form-check form-check-inline mr-4"
                        key={slot.toString()}
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      >
                        <input
                          type="radio"
                          name="inlineRadioOptions1"
                          value={slot}
                          className="rounded mr-1 mb-2 bg-white"
                        ></input>
                        <label>{slot}</label>
                      </div>
                    )):<div className="rounded" style={{backgroundColor:"#f0f0f0"}}>
                      <p>Dịch vụ chưa sẵn sàng. Vui lòng chọn 5 ngày gần nhất hoặc barber khác.</p>
                      </div>}
                  </div>
                </div>
              </div>

              <div className="step-item  is-completed is-link">
                <div className="step-marker">3</div>

                <div className="step-details">
                  <p className="step-title">Ghi chú</p>
                  <br></br>
                  <div className="">
                    <textarea
                      className="pl-1"
                      placeholder=" Vui lòng nhập thông tin khách hàng."
                      rows="10"
                      cols="35"
                      maxLength={40}
                      value={note}
                      onChange={(e) => {
                        setNote(e.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              {error && <p className="text-danger">{error}</p>}
              {errMess && <p className="text-danger">{errMess}</p>}
            </div>

            <div className="col-md-12 text-center pb-5 ">
              <button
                style={{ width: "30%" }}
                className="button is-rounded is-info ml-3 has-text-weight-semibold"
                onClick={handleSubmit}
                disabled={
                  !staff || !time || !dateFormated || !serviceInfo || !note
                }
              >
                Đặt lịch
              </button>
            </div>
          </div>
        </div>
        <Dialog open={dialogOpen} maxWidth="lg">
          <FormWrapper style={{ minHeight: "6rem" }}>
            <SuccessText>
              <i className="fa-solid fa-circle-check" style={{fontSize:"4rem"}}></i>
            </SuccessText>
            <SuccessText>Đặt lịch thành công</SuccessText>
          </FormWrapper>
          <ButtonWrapper>
            <button
              className="button is-info has-text-white is-rounded"
              onClick={handleClose}
            >
              Đóng
            </button>
          </ButtonWrapper>
        </Dialog>

        <div className="column is-1"></div>
      </div>
    </div>
  );
}
