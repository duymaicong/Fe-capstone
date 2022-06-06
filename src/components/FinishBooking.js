import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { currencyFormatter } from "../utils";
import moment from "moment";
import { resetBookingDetails } from "../redux/actions/creators/booking";

import introbg from "../assets/introbg-1.jpg";
import paperbg from "../assets/paperbg.jpg";
import patterbg from "../assets/patterbg.svg";

const message = "Đặt lịch thành công";
export default function FinishBooking() {
  const { bookingDetails } = useSelector((state) => state.booking);
  const dispatch = useDispatch();

  React.useEffect(() => {
    return () => {
      dispatch(resetBookingDetails());
    };
  }, [dispatch]);

  // -- CSS --
  const root = {
    backgroundImage: `url(${introbg})`,
    backgroundRepeat: "repeat-y",
    backgroundSize: "100%",
    minHeight: "60rem",
  };
  const rightReceipt = {
    height: 400 + "px",
    background: `url(${patterbg})`,
    // borderRadius: "0 25px 25px 0",
  };
  const leftReceipt = {
    minHeight: 400 + "px",
    // borderRadius: "25px 0 0 25px",
    background: "url(" + paperbg + ")",
    borderRight: "1px solid gray",
  };

  return bookingDetails ? (
    <div style={root}>
      <div className="columns">
        <div className="column is-2"></div>
        <div className="column is-8">
          {/* -- FINISH CARD -- */}
          <div
            className="columns mt-5 mb-5"
            style={{ boxShadow: "1px 1px 20px black" }}
          >
            {/* -- RIGHT CARD -- */}
            <div className="column is-4 " style={leftReceipt}>
              <h2
                className="font-weight-bold is-size-2"
                style={{ color: "#134068" }}
              >
                {bookingDetails.nameSalon}
              </h2>
              <p className="font-weight-bold  is-size-5">
                Mở cửa:{" "}
                <span className="text-danger">
                  T2-CN {bookingDetails.timeOpen}-{bookingDetails.timeClose}
                </span>
              </p>
              <p className=" is-size-5">
                <span className="font-weight-bold">Sđt: </span>{" "}
                {bookingDetails.phoneSalon}
              </p>
              <p className="is-size-5">
                <i className="fa-solid fa-location-dot text-secondary"></i>{" "}
                <span>{bookingDetails.detailAddress}</span>
              </p>
              <hr
                className="solid"
                style={{
                  marginTop: 5,
                  marginBottom: 5,
                  borderTop: 1 + "px solid grey",
                  opacity: 40 + "%",
                }}
              />
              <h5 className="font-weight-bold is-size-4">
                {bookingDetails.nameService}
              </h5>
              <p className="is-size-5">
                {bookingDetails.service_time} phút{" "}
                {/* <span className="font-weight-bold text-danger is-size-5">
                  -{" "}
                  {currencyFormatter.format(
                    bookingDetails.price_original -
                      bookingDetails.price_original *
                        (bookingDetails.promotion / 100)
                  )}
                </span> */}
              </p>
              <p>
                <span className="font-weight-bold text-danger is-size-5">
                {bookingDetails.promotion === 0 && (
                  <p className="has-text-danger has-text-weight-semibold">
                    {" "}
                    {currencyFormatter.format(bookingDetails.price_original)}{" "}
                  </p>
                )}

                {bookingDetails.promotion !== 0 && (
                  <p className="has-text-grey-light has-text-weight-semibold">
                    <del>
                      {" "}
                      {currencyFormatter.format(bookingDetails.price_original)}{" "}
                    </del>

                    <span className="has-text-danger-dark has-text-weight-semibold">
                      {" "}
                      {"-> "}
                      {currencyFormatter.format(
                        bookingDetails.price_original -
                          (bookingDetails.price_original / 100) *
                            bookingDetails.promotion
                      )}{" "}
                    </span>
                    <span className="tag is-danger has-text-weight-semibold">
                      {" "}
                      {bookingDetails.promotion} %
                    </span>
                  </p>
                )}
                </span>
              </p>
              <hr
                className="solid"
                style={{
                  marginTop: 5,
                  marginBottom: 5,
                  borderTop: 1 + "px solid grey",
                  opacity: 40 + "%",
                }}
              />
              <p className="is-size-5">
                <span className="font-weight-bold"> Lịch hẹn: </span>
                <span>
                  {moment(bookingDetails.timeUse).format("DD/MM/YYYY - HH:mm")}
                </span>
              </p>
              <hr
                className="solid"
                style={{
                  marginTop: 5,
                  marginBottom: 5,
                  borderTop: 1 + "px solid grey",
                  opacity: 40 + "%",
                }}
              />
              <p className="is-size-5">
                <span className="font-weight-bold">Barber: </span>
                {bookingDetails.nameStaff}
              </p>
              <hr
                className="solid"
                style={{
                  marginTop: 5,
                  marginBottom: 5,
                  borderTop: 1 + "px solid grey",
                  opacity: 40 + "%",
                }}
              />
              <p className="is-size-4">
                <span className="font-weight-bold">
                  Phương thức thanh toán:{" "}
                </span>
              </p>
              <p className="is-size-5">Tiền mặt</p>
            </div>

            {/* -- LEFT CARD -- */}
            <div className="column is-8" style={rightReceipt}>
              <div className="card-body text-center">
                <h1 className="text-success display-2">
                  <i className="fa-solid fa-circle-check"></i>
                </h1>
                <h2 className="font-weight-bold text-success is-size-3">
                  {message}
                </h2>
                <p className="is-size-4">
                  Cảm ơn{" "}
                  <span className="font-weight-bold">
                    {bookingDetails.nameCustomer}
                  </span>{" "}
                  đã sử dụng dịch vụ của chúng tôi!
                </p>
                <Link to="/">
                  <p className="font-weight-bold has-text-link is-size-5">
                    <u>Quay lại trang chủ</u>
                  </p>
                </Link>
              </div>
            </div>
          </div>
          {/* -- FINISH CARD -- */}
        </div>

        <div className="column is-2"></div>
      </div>
    </div>
  ) : (
    <></>
  );
}
