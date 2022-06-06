import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "react-calendar";
import {
  getStaffList,
  resetStaffList,
  getServiceList,
  resetServiceList,
  getStaffCalendar,
  resetStaffCalender,
  bookService,
} from "../redux/actions/creators/booking";
import moment from "moment";
import introbg from "../assets/introbg-1.jpg";
import videobg from "../assets/videobg.jpg";
import patterbg from "../assets/patterbg.svg";

const root = {
  backgroundImage: `url(${introbg})`,
  backgroundRepeat: "repeat-y",
  backgroundSize: "100%",
};

export default function Staff() {
  const minDate = new Date(
    moment().add(4, "hours").add(15, "minutes").startOf("day")
  ); // If the current time is after 7:45pm, the min date will be the next day

  const [date, setDate] = useState(minDate);
  const [staff, setStaff] = useState("");
  const [time, setTime] = useState(undefined);
  const [dateFormated, setDateFormated] = useState(convertDate(minDate));
  const [staffInfo, setStaffInfo] = useState();
  const [staffDetail, setStaffDetail] = useState();

  const { serviceId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { staffList } = useSelector((state) => state.staff);
  const { serviceList } = useSelector((state) => state.service);
  const {
    selectedSalonId,
    selectedServiceId,
    priceOriginal,
    serviceTime,
    errMess,
  } = useSelector((state) => state.booking);
  const { calendar } = useSelector((state) => state.staffCalendar);
  const { token } = useSelector((state) => state.loginAccount.account);

  useEffect(() => {
    if (staff && dateFormated) {
      setTime(undefined);
      setStaffInfo({
        staffId: staff,
        day: dateFormated,
        service_time: serviceTime,
      });
    }
  }, [staff, dateFormated, serviceTime]);

  useEffect(() => {
    dispatch(getServiceList(serviceId));

    return () => {
      dispatch(resetServiceList());
    };
  }, [dispatch, serviceId]);

  useEffect(() => {
    dispatch(getStaffList(serviceId));

    return () => {
      dispatch(resetStaffList());
    };
  }, [dispatch, serviceId]);

  useEffect(() => {
    if (staffInfo) {
      dispatch(getStaffCalendar(staffInfo));      
    }
    return () => {
      dispatch(resetStaffCalender());
    };
  }, [dispatch, staffInfo]);

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

  const handleSubmit = () => {
    const bookingInfo = {
      salonId: selectedSalonId,
      serviceId: selectedServiceId,
      staffId: staff,
      timeUse: `${dateFormated} ${time}:00`,
      price_original: parseInt(priceOriginal),
      service_time: serviceTime,
    };

    const callback = () => {
      navigate("/finish_booking");
    };

    dispatch(bookService(bookingInfo, token, callback));
  };

  const cancelBook = `/services/${selectedSalonId}`;

  return (
    <div style={root}>
      <div className="columns">
        <div className="column is-2"></div>
        <div className="column is-8">
          <div
            className="mt-5 mb-5"
            style={{
              background: "url(" + patterbg + ")",
              boxShadow: "1px 1px 20px black",
            }}
          >
            <div className="">
              {serviceList?.dataSalon?.map((salon) => (
                <div
                  className="text-center pt-4"
                  style={{ background: "url(" + videobg + ")" }}
                  key={salon.salonId}
                >
                  <div className="pb-2 mb-3">
                    <h2 className="is-size-2 has-text-link has-text-weight-semibold">
                      {salon.nameSalon}
                    </h2>
                    <p className="is-size-4" style={{ color: "white" }}>
                      Mở cửa:{" "}
                      <span className="text-danger">
                        T2-CN {salon.timeOpen} - {salon.timeClose}
                      </span>
                    </p>
                    <p className="is-size-4 " style={{ color: "white" }}>
                      <span>
                        SĐT:{" "}
                        <span className="has-text-weight-thin">
                          {" "}
                          <span className="has-text-info is-underlined">
                            {salon.phone}
                          </span>
                        </span>
                      </span>
                    </p>
                    <p className="is-size-4" style={{ color: "white" }}>
                      <i className="fa-solid fa-location-dot"></i>{" "}
                      <span className="is-size-4 has-text-primary">
                        {salon.detailAddress}
                      </span>
                    </p>
                  </div>
                  <br></br>                  
                </div>
              ))}
            </div>
            <div className="steps" id="stepsDemo">
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
                  {/* { console.log(staffInfo)}
                   {console.log(staff,dateFormated)}
                   {console.log(calendar)}  */}
                </div>
              </div>
              <div className="step-item  is-completed is-link">
                <div className="step-marker">2</div>
                <div className="step-details">
                  <p className="step-title">Chọn barber</p>
                  <br></br>
                  <select
                    className="form-select form-select-lg mb-3 "
                    value={staff}
                    onChange={(e) => {
                      setStaff(e.target.value);
                      setStaffDetail(
                        staffList?.find(
                          (staffObj) =>
                            staffObj.staffId === parseInt(e.target.value)
                        )
                      );
                    }}
                    style={{
                      width: "95%",
                      height: "2.5rem",
                      borderRadius: "5px",
                      backgroundColor: "white",
                    }}
                  >
                    <option defaultValue={""}>Chọn barber...</option>
                    {staffList?.map((staff) => (
                      <option key={staff.staffId} value={staff.staffId}>
                        {staff.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  {staffDetail ? (
                    <div
                      className="ml-4 mr-4 p-4 rounded"
                      style={{ backgroundColor: "#f3f4f6", fontSize: "1.1rem" }}
                    >
                      <div>
                        <p>
                          <span className="font-weight-bold mr-2">
                            Tên barber:
                          </span>
                          {staffDetail.name}
                        </p>
                      </div>
                      <div>
                        <p>
                          <span className="font-weight-bold mr-2">SĐT:</span>
                          {staffDetail.phone}
                        </p>
                      </div>
                      <div>
                        <p>
                          <span className="font-weight-bold mr-2">
                            Địa chỉ:
                          </span>
                          {staffDetail.address}
                        </p>
                      </div>
                      <div>
                        <p>
                          <span className="font-weight-bold mr-2">
                            Giới thiệu:
                          </span>
                          {staffDetail.title}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              <div className="step-item is-completed is-link">
                <div className="step-marker">3</div>
                <div className="step-details">
                  <p className="step-title">Chọn giờ</p>
                  <br></br>
                  <div className="form-check">
                    {calendar ? calendar?.calendar.map((slot) => (
                      <div
                        className="form-check form-check-inline mr-4"
                        key={slot.toString()}
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      >
                        <input
                          type="radio"
                          name="inlineRadioOptions"
                          value={slot}
                          className="rounded mr-1 mb-2 bg-white"
                        ></input>
                        <label>{slot}</label>
                      </div>
                    )):<div className="rounded" style={{backgroundColor:"#f3f4f6"}}>Dịch vụ chưa sẵn sàng. Vui lòng chọn 5 ngày gần nhất hoặc barber khác.</div>}
                  </div>
                </div>
              </div>
            </div>
            <div>
              {errMess && <p className="text-danger text-center p-5">{errMess}</p>}
            </div>
            <div className="col-md-12 text-center pb-5 ">
              <Link
                style={{ width: "40%" }}
                className="button is-rounded is-danger mr-3 has-text-weight-semibold"
                to={cancelBook}
              >
                Hủy
              </Link>
              <button
                style={{ width: "40%" }}
                className="button is-rounded is-info ml-3 has-text-weight-semibold"
                onClick={handleSubmit}
                disabled={!staff || !time || !dateFormated}
              >
                Đặt trước
              </button>
            </div>
          </div>
        </div>

        <div className="column is-2"></div>
      </div>
    </div>
  );
}
