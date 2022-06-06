import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
} from "../../redux/actions/creators/booking";
import moment from "moment";
import introbg from "../../assets/introbg-1.jpg";
import bgImg from "../../assets/barbershopbg.jpg";
import videobg from "../../assets/videobg.jpg";
import patterbg from "../../assets/patterbg.svg";

export default function Staff() {
  const minDate = new Date(
    moment().add(4, "hours").add(15, "minutes").startOf("day")
  ); // If the current time is after 7:45pm, the min date will be the next day

  const [date, setDate] = useState(minDate);
  const [staff, setStaff] = useState("");
  const [time, setTime] = useState(undefined);
  const [dateFormated, setDateFormated] = useState(convertDate(minDate));
  const [staffInfo, setStaffInfo] = useState();

  const { serviceId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { staffList } = useSelector((state) => state.staff);
  const { serviceList } = useSelector((state) => state.service);
  const { selectedSalonId, selectedServiceId, priceOriginal, serviceTime } =
    useSelector((state) => state.booking);
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
  const root = {
    backgroundImage: `url(${introbg})`,
    backgroundRepeat: "repeat-y",
    backgroundSize: "100%",
  };

  return (
    <div style={root}>
      <div className="columns">
        <div className="column is-3"></div>
        <div className="column is-6">
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
                  className="text-center"
                  style={{ background: "url(" + videobg + ")" }}
                  key={salon.salonId}
                >
                  <div className="pb-2 mb-3">
                    <h2 className="is-size-2 has-text-link has-text-weight-semibold">
                      {salon.nameSalon}
                    </h2>
                    <p className="is-size-4" style={{ color: "white" }}>
                      Open:{" "}
                      <span className="text-danger">
                        Mon-Sun {salon.timeOpen.slice(0, -3)} -{" "}
                        {salon.timeClose.slice(0, -3)}
                      </span>
                    </p>
                    <p className="is-size-4 " style={{ color: "white" }}>
                      <span>
                        Phone number:{" "}
                        <span className="has-text-weight-thin">
                          {" "}
                          <span className="has-text-info ">{salon.phone}</span>
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
                </div>
              ))}
            </div>
            <div className=" row g-0 p-5">
              <div className="col-md-6">
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
                  <option defaultValue={""}>Choose a staff...</option>
                  {staffList?.map((staff) => (
                    <option key={staff.staffId} value={staff.staffId}>
                      {staff.name}
                    </option>
                  ))}
                </select>
                <div className="form-check pl-0 mt-3 ml-1">
                  {calendar?.calendar.map((slot) => (
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
                  ))}
                </div>
              </div>
              <div className="col-md-6 pl-5">
                <Calendar
                  className="rounded"
                  onChange={handleInputDate}
                  value={date}
                  minDate={minDate}
                />
                {/* {console.log(staffInfo)}
          {console.log(staff,dateFormated)}
          {console.log(calendar)} */}
              </div>
            </div>
            <div className="col-md-12 text-center pb-5 ">
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={!staff || !time || !dateFormated}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        <div className="column is-3"></div>
      </div>
    </div>
  );
}
