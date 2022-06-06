import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { styled } from "@mui/system";
import {
  Box,
  Button as MuiButton,
  Dialog,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Modal, Tooltip, Rating, Stack } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CircularProgress from "@mui/material/CircularProgress";
import bgImg from "../../assets/barbershopbg.jpg";
import paperbg from "../../assets/paperbg.jpg";
import {
  activeSalon,
  getSalonInfo,
  getSalonReview,
  resetSalonInfo,
  resetSalonReview,
} from "../../redux/actions/creators/admin";
import {
  convertISOStringToLocaleDateString,
  currencyFormatter,
} from "../../utils";
import imageUnavailable from "../../assets/image-unavailable.png";

//CSS
const root = {
  backgroundRepeat: "repeat-y",
  backgroundSize: "100%",
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
  fontSize: 16,
  fontFamily: "Segoe UI",
  lineHeight: 1.75,
});
const Loading = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <CircularProgress />
  </Box>
);

export default function DetailSalonDeactive() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { salonId } = useParams();

  //STATE
  const [tabValue, setTabValue] = useState("1");
  const [rate, setRate] = useState(null);

  //LOAD DATA FROM REDUX
  const { salonDeactivated } = useSelector((state) => state.salonBusinessInfo);
  const { activeSuccessMess, errMess } = useSelector(
    (state) => state.activeSalon
  );
  const { token, account_name: username } = useSelector(
    (state) => state.loginAccount.account
  );
  const { salonBusinessInfo, serviceList } = useSelector(
    (state) => state.salonInfo
  );
  const { listReview } = useSelector((state) => state.salonReviewList);

  //API SALON INFO
  useEffect(() => {
    dispatch(getSalonInfo(token, { salonId: salonId }));
    return () => {
      dispatch(resetSalonInfo());
    };
  }, [dispatch, salonId, token]);

  //API SALON REVIEW
  useEffect(() => {
    if (!rate) {
      setRate("");
    }
    dispatch(getSalonReview(token, { salonId: salonId, star: rate }));
    return () => {
      dispatch(resetSalonReview);
    };
  }, [dispatch, salonId, token, rate]);

  //DIALOG
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClose = () => {
    setDialogOpen(false);
  };

  //ACTIVE SALON
  const handleActive = () => {
    if (!salonDeactivated) return;
    const callback = () => {
      setDialogOpen(false);
      navigate("/");
    };
    dispatch(
      activeSalon(token, { salonId: salonDeactivated.salonId }, callback)
    );
  };

  return salonBusinessInfo ? (
    <div style={root}>
      <div className="container rounded">
        <div>
          {salonBusinessInfo ? (
            <div style={{ backgroundColor: "#f8f9fa" }}>
              <div>
                <div className="columns mt-0 pt-0">
                  <div className="column is-6" style={{ paddingTop: "0px" }}>
                    <img
                      style={{ height: "100%", width: "auto" }}
                      src={
                        salonBusinessInfo.image
                          ? salonBusinessInfo.image
                          : imageUnavailable
                      }
                      alt="..."
                    />
                  </div>
                  <div className="column is-6 pt-5">
                    <div className="pb-2 mb-3">
                      <h2
                        style={{ color: "#134068" }}
                        className="is-size-1 has-text-weight-semibold"
                      >
                        {salonBusinessInfo.nameSalon}
                      </h2>
                      <p className="is-size-5 font-weight-bold">
                        Mở cửa:{" "}
                        <span className="text-danger">
                          T2-CN {salonBusinessInfo.timeOpen} -{" "}
                          {salonBusinessInfo.timeClose}
                        </span>
                      </p>
                      <p>
                        <span className="is-size-5 font-weight-bold">
                          SĐT:{" "}
                        </span>
                        <span
                          className="is-size-5 is-underlined"
                          style={{ color: "#134068" }}
                        >
                          {salonBusinessInfo.phone}
                        </span>
                      </p>
                      <p>
                        <i className="fa-solid fa-location-dot text-secondary"></i>{" "}
                        <span
                          className="is-size-5 font-weight-bold"
                          style={{ color: "#134068" }}
                        >
                          {salonBusinessInfo.detailAddress}
                        </span>
                      </p>
                      <p>{salonBusinessInfo.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <TabContext value={tabValue}>
          <Box
            sx={{
              backgroundColor: "white",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <TabList
              variant="fullWidth"
              onChange={(event, newValue) => {
                setTabValue(newValue);
              }}
              aria-label="disabled tabs example"
            >
              <Tab label="Thông tin" value="1" />
              <Tab label="Dịch vụ" value="2" />
              <Tab label="Đánh giá" value="3" />
            </TabList>
          </Box>
          <div
            style={{
              background: "url(" + paperbg + ")",
              minHeight: "30rem",
            }}
          >
            <TabPanel value="1" className="p-0">
              {salonBusinessInfo ? (
                <div>
                  <div className="mb-5">
                    <div className="has-text-centered">
                      <div>
                        <h2 className="is-size-1 pt-5 mb-5">
                          Hồ sơ kinh doanh
                        </h2>
                        <div className="columns">
                          <div className="column is-6 has-text-right">
                            <p className="is-size-4">Salon Id : </p>
                            <p className="is-size-4">Chủ salon : </p>
                            <p className="is-size-4">Mã số thuế : </p>
                            <p className="is-size-4">SĐT : </p>
                            <p className="is-size-4">Giờ mở cửa : </p>
                            <p className="is-size-4">Giờ đóng cửa : </p>
                            <p className="is-size-4">Quận : </p>
                            <p className="is-size-4">Thành phố : </p>
                            <p className="is-size-4">Email : </p>
                          </div>
                          <div className="column is-6 has-text-left">
                            <p className="is-size-4">
                              {salonBusinessInfo.salonId}
                            </p>
                            <p className="is-size-4">
                              {" "}
                              {salonBusinessInfo.nameOwner}
                            </p>
                            <p className="is-size-4 has-text-primary has-text-weight-bold">
                              {salonBusinessInfo.taxCode}
                            </p>
                            <p className="is-size-4">
                              {salonBusinessInfo.phone}
                            </p>
                            <p className="is-size-4 has-text-danger">
                              {salonBusinessInfo.timeOpen}
                            </p>
                            <p className="is-size-4 has-text-danger">
                              {salonBusinessInfo.timeClose}
                            </p>
                            <p className="is-size-4">
                              {salonBusinessInfo.district}
                            </p>
                            <p className="is-size-4">
                              {salonBusinessInfo.city}
                            </p>
                            <p className="is-size-4 is-underlined">
                              {salonBusinessInfo.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </TabPanel>
            <TabPanel value="2">
              {serviceList?.length ? (
                serviceList?.map((service) => (
                  <div className="pl-5 pr-5 pt-2 pb-2">
                    <div
                      className="card mb-3"
                      style={{
                        width: "98%",
                        // background: "url(" + paperbg + ")",
                        height: "12rem",
                        borderRadius: "25px",
                      }}
                      key={service.serviceId}
                    >
                      <div className="columns">
                        <div className="column is-3">
                          <img
                            src={
                              service.image ? service.image : imageUnavailable
                            }
                            alt="..."
                            style={{
                              height: "100%",
                              width: "100%  ",
                              maxHeight: "12rem",
                              borderRadius: "25px",
                            }}
                          />
                        </div>
                        <div className="column is-7 mt-2 has-text-left">
                          <div>
                            <h4 className="has-text-info-dark is-size-4 has-text-weight-bold">
                              {service.name} -{" "}
                              <span className="has-text-link-dark is-size-5">
                                {service.content}
                              </span>
                            </h4>

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
                                <del>
                                  {" "}
                                  {currencyFormatter.format(service.price)}{" "}
                                </del>

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
                  </div>
                ))
              ) : (
                <div
                  className="text-center p-5"
                  style={{
                    fontSize: "2rem",
                  }}
                >
                  <h2>Salon này chưa có dịch vụ nào.</h2>
                </div>
              )}
            </TabPanel>
            <TabPanel value="3">
              {salonBusinessInfo ? (
                <div>
                  <div className=" columns">
                    <div className="column is-3 has-text-centered">
                      <p className="has-text-info">
                        {" "}
                        <span className="is-size-4 has-text-weight-semibold">
                          {salonBusinessInfo?.AverangeVote ? (
                            <>
                              <span>
                                {salonBusinessInfo?.AverangeVote.toFixed(1)}
                                {"/5"}
                              </span>
                            </>
                          ) : (
                            <>
                              <span>0/5</span>
                            </>
                          )}
                        </span>
                        <br></br>
                        <Rating
                          name="half-rating-read"
                          defaultValue={salonBusinessInfo.AverangeVote}
                          precision={0.5}
                          readOnly
                        />
                        <br></br>
                        <p className="text-dark">
                          <span className="font-weight-bold ">
                            {salonBusinessInfo.TotalVote}{" "}
                          </span>
                          đánh giá {"&"} bình luận
                        </p>
                      </p>
                    </div>
                    <div className="col-6"></div>
                    <div
                      className="column is-3 has-text-centered mt-3"
                      style={{ display: "inline-block" }}
                    >
                      <div className="col-4 font-weight-bold pr-0 pl-5 text-center">
                        <label>Đánh giá:</label>
                      </div>
                      <div className="col-3 pl-2">
                        <Rating
                          name="simple-controlled"
                          value={rate}
                          onChange={(event, newValue) => {
                            setRate(newValue);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      overflowY: "scroll",
                      height: "700px",
                      backgroundColor: "white",
                    }}
                    className="rounded"
                  >
                    {listReview ? (
                      listReview.map((review) => (
                        <div
                          className="m-4 pl-3 pr-3 pt-5 pb-5 mb-5 "
                          style={{
                            backgroundColor: "white",
                            height: "12rem",
                            borderRadius: "25px",
                          }}
                        >
                          <div className="row pt-3 pb-3">
                            <div className="col-6">
                              <h2 className="is-size-5 row">
                                <div
                                  className="is-size-5 ml-4 mt-5 mr-2 has-text-weight-semibold rounded p-2 text-center"
                                  style={{
                                    backgroundColor: "#dddddd",
                                    width: "35px",
                                    height: "35px",
                                  }}
                                >
                                  {review.nameCustomer.charAt(0)}
                                </div>
                                <span className="is-size-5 p-2 mt-5 has-text-weight-semibold">
                                  {review.nameCustomer}
                                </span>
                              </h2>
                            </div>
                            <div className="col-6 has-text-right mt-5 pt-2">
                              <p className=" font-weight-bold">
                                <span>
                                  <i className="fa-regular fa-clock mr-1"></i>
                                </span>
                                {convertISOStringToLocaleDateString(
                                  review.dateCreate
                                )}
                              </p>
                            </div>
                          </div>
                          <div
                            className="rounded p-4"
                            style={{ backgroundColor: "#f3f4f6" }}
                          >
                            <div>
                              <Rating
                                name="half-rating-read"
                                value={review.rate / 2}
                                precision={0.5}
                                readOnly
                              />
                            </div>

                            <div className="pl-1">
                              <p>
                                <span className="font-weight-bold">
                                  Bình luận:{" "}
                                </span>{" "}
                                {review.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div
                        className="text-center pt-5 font-weight-bold"
                        style={{ fontSize: "1.5rem" }}
                      >
                        Chưa có bình luận {"&"} đánh giá nào.
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </TabPanel>
            <div className="text-center">
              <div className="pb-5">
                <Link
                  to="/ManageSalon"
                  className="button is-info has-text-white mr-5 is-rounded"
                >
                  Quay lại
                </Link>
                <button
                  className="button is-success has-text-white is-rounded"
                  onClick={() => setDialogOpen(true)}
                >
                  Kich hoạt
                </button>
                <Dialog onClose={handleClose} open={dialogOpen} maxWidth="lg">
                  <FormWrapper style={{ minHeight: "6rem" }}>
                    <FieldLabel>Bạn có muốn kích hoạt salon này?</FieldLabel>
                  </FormWrapper>
                  <ButtonWrapper>
                    {activeSuccessMess && (
                      <SuccessText>{activeSuccessMess}</SuccessText>
                    )}
                    {errMess && <ErrorText>{errMess}</ErrorText>}
                  </ButtonWrapper>
                  <ButtonWrapper>
                    <button
                      className="button is-danger mr-5 has-text-white is-rounded"
                      onClick={() => setDialogOpen(false)}
                    >
                      Hủy
                    </button>
                    <button
                      className="button is-success has-text-white is-rounded"
                      onClick={handleActive}
                    >
                      Xác nhận
                    </button>
                  </ButtonWrapper>
                </Dialog>
              </div>
            </div>
          </div>
        </TabContext>
      </div>
    </div>
  ) : (
    <div>
      <Loading />
    </div>
  );
}
