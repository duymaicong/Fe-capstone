import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SalonList from "./SalonList.json";

import { styled } from "@mui/system";
import {
  Box,
  Button as MuiButton,
  Dialog,
  Grid,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";

import paperbg from "../../assets/paperbg.jpg";
import bgImg from "../../assets/barbershopbg.jpg";
import patterbg from "../../assets/patterbg.svg";
import { convertISOStringToLocaleDateString } from "../../utils/index";
import { Rating } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useDispatch, useSelector } from "react-redux";
import {
  getListSalonActive,
  getListSalonDeactive,
  getListSalonRequest,
  resetListSalonActive,
  resetListSalonDeactive,
  resetListSalonRequest,
  updateSelectedSalonActiveBussinessInfo,
  updateSelectedSalonBussinessInfo,
  updateSelectedSalonDeactiveBussinessInfo,
  updateSelectedSalonRequestBussinessInfo,
} from "../../redux/actions/creators/admin";
import {
  deactiveSalon,
  activeSalon,
  rejectSalon,
} from "../../redux/actions/creators/admin";

const root = {
  backgroundImage: `url(${bgImg})`,
  backgroundRepeat: "repeat-y",
  backgroundSize: "100%",
  minHeight: "60rem",
  paddingTop: "3rem",
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

export default function ManageService() {
  const fakeData = SalonList.data;

  // -- TABS --
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // DISPATCH
  const dispatch = useDispatch();

  //STATE SALON SELECTED
  const [salonActive, setSalonActive] = useState(null);
  const [salonDeactive, setSalonDeactive] = useState(null);
  const [salonReject, setSalonReject] = useState(null);
  //STATE NAME SALON FOR FILTER
  const [nameSalonActive, setNameSalonActive] = useState("");
  const [nameSalonDeactive, setNameSalonDeactive] = useState("");
  const [nameSalonRequest, setNameSalonRequest] = useState("");

  //LOAD DATA FROM REDUX STORE
  //LOAD TOKEN FROM REDUX STORE
  const { token, account_name: username } = useSelector(
    (state) => state.loginAccount.account
  );
  //LOAD LIST SALON ACTIVE
  const { listSalonActive } = useSelector((state) => state.litSalonActivated);
  //LOAD LIST SALON DEACTIVE
  const { listSalonDeactive } = useSelector((state) => state.listSalonDeactive);
  //LOAD LIST SALON REQUEST
  const { listSalonRequest } = useSelector((state) => state.listSalonRequest);

  const { deactiveSuccessMess } = useSelector((state) => state.deactiveSalon);
  const { rejectSuccessMess } = useSelector((state) => state.rejectSalon);
  const { activeSuccessMess } = useSelector((state) => state.activeSalon);

  //GET DATA FORM API
  //GET LIST SALON ACTIVE
  useEffect(() => {
    dispatch(getListSalonActive(token, { nameSalon: nameSalonActive }));
    return () => {
      dispatch(resetListSalonActive());
    };
  }, [dispatch, token, nameSalonActive]);

  //GET LIST SALON DEACTIVE
  useEffect(() => {
    dispatch(getListSalonDeactive(token, { nameSalon: nameSalonDeactive }));
    return () => {
      dispatch(resetListSalonDeactive());
    };
  }, [dispatch, token, nameSalonDeactive]);

  //GET LIST SALON REQUEST
  useEffect(() => {
    dispatch(getListSalonRequest(token, { nameSalon: nameSalonRequest }));
    return () => {
      dispatch(resetListSalonRequest());
    };
  }, [dispatch, token, nameSalonRequest]);

  //DIALOG ACTIVE
  const [dialogActiveOpen, setDialogActiveOpen] = useState(false);
  const handleActiveClose = () => {
    setDialogActiveOpen(false);
  };

  //DIALOG REJECT
  const [dialogRejectOpen, setDialogRejectOpen] = useState(false);
  const handleRejectClose = () => {
    setDialogRejectOpen(false);
  };

  //DIALOG DEACTIVE
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClose = () => {
    setDialogOpen(false);
  };

  //DEACTIVE SALON
  const handleDeactive = () => {
    if (!salonDeactive) return;
    const callback = () => {
      dispatch(resetListSalonActive());
      dispatch(resetListSalonDeactive());
      dispatch(resetListSalonRequest());
      setDialogOpen(false);
      dispatch(getListSalonActive(token, { nameSalon: nameSalonActive }));
      dispatch(getListSalonDeactive(token, { nameSalon: nameSalonDeactive }));
      dispatch(getListSalonRequest(token, { nameSalon: nameSalonRequest }));
    };
    dispatch(
      deactiveSalon(token, { salonId: salonDeactive.salonId }, callback)
    );
  };

  //ACTIVE SALON
  const handleActive = () => {
    if (!salonActive) return;
    const callback = () => {
      dispatch(resetListSalonActive());
      dispatch(resetListSalonDeactive());
      dispatch(resetListSalonRequest());
      setDialogActiveOpen(false);
      dispatch(getListSalonActive(token, { nameSalon: nameSalonActive }));
      dispatch(getListSalonDeactive(token, { nameSalon: nameSalonDeactive }));
      dispatch(getListSalonRequest(token, { nameSalon: nameSalonRequest }));
    };
    dispatch(activeSalon(token, { salonId: salonActive.salonId }, callback));
  };

  //REJECT SALON
  const handleReject = () => {
    if (!salonReject) return;
    const callback = () => {
      dispatch(resetListSalonActive());
      dispatch(resetListSalonDeactive());
      dispatch(resetListSalonRequest);
      setDialogRejectOpen(false);
      dispatch(getListSalonActive(token, { nameSalon: nameSalonActive }));
      dispatch(getListSalonDeactive(token, { nameSalon: nameSalonDeactive }));
      dispatch(getListSalonRequest(token, { nameSalon: nameSalonRequest }));
    };
    dispatch(rejectSalon(token, { salonId: salonReject.salonId }, callback));
  };

  return (
    <div>
      <div style={root}>
        <div className="columns">
          <div className="column is-2"></div>
          <div
            className="column is-8 mt-5 mb-5"
            style={{
              padding: "0px",
              minHeight: "400px",
              background: "url('" + paperbg + "')",
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
                  <Tab label="Salon đang hoạt động" value="1" />
                  <Tab label="Salon dừng hoạt động" value="2" />
                  <Tab label="Salon đang chờ duyệt" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <div>
                  <div className="mb-5 form-outline row">
                    <div className="col-6"></div>
                    <div className="input-group col-6">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-magnifying-glass"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Tìm kiếm"
                        maxLength={40}
                        value={nameSalonActive}
                        onChange={(e) => {
                          setNameSalonActive(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>

                  <table className="table">
                    <thead>
                      <tr>
                        <th>
                          <p title="stt">#</p>
                        </th>
                        <th>
                          <p title="SalonName">Tên salon</p>
                        </th>
                        <th>
                          <p title="SalonAddress">Địa chỉ</p>
                        </th>
                        <th>
                          <p title="DateJoin">Ngày vào</p>
                        </th>
                        <th>
                          <p title="Rating" className="has-text-centered">
                            Đánh giá
                          </p>
                        </th>
                        <th
                          className="has-text-centered"
                          style={{ minWidth: "15rem" }}
                        >
                          <p title="Actions"></p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {listSalonActive?.map((element) => (
                        <tr key={element.salonId}>
                          <th scope="row">
                            {listSalonActive.indexOf(element) + 1}
                          </th>
                          <td>{element?.nameSalon}</td>
                          <td style={{ maxWidth: "20rem" }}>
                            {element?.detailAddress}
                          </td>
                          <td>
                            {convertISOStringToLocaleDateString(
                              element?.joinDate
                            )}
                          </td>
                          <td className="has-text-centered">
                            <Rating
                              name="half-rating-read"
                              defaultValue={element?.star}
                              precision={0.5}
                              readOnly
                            />
                          </td>

                          <td className="has-text-centered">
                            <Link
                              to={`/DetailSalonActive/${element.salonId}`}
                              className="button is-rounded is-info mr-5"
                              onClick={() => {
                                dispatch(
                                  updateSelectedSalonActiveBussinessInfo(
                                    element
                                  )
                                );
                              }}
                            >
                              <i className="fa-solid fa-circle-info"></i>
                            </Link>{" "}
                            <button
                              style={{ backgroundColor: "#f7e202" }}
                              className="button is-rounded  has-text-white"
                              onClick={() => {
                                setSalonDeactive(element);
                                setDialogOpen(true);
                              }}
                            >
                              <i className="fa-solid fa-stop"></i>
                            </button>{" "}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div>
                  <div className="mb-5 form-outline row">
                    <div className="col-6"></div>
                    <div className="input-group col-6">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-magnifying-glass"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Tìm kiếm"
                        maxLength={40}
                        value={nameSalonDeactive}
                        onChange={(e) => {
                          setNameSalonDeactive(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>

                  <table className="table">
                    <thead>
                      <tr>
                        <th>
                          <p title="stt">#</p>
                        </th>
                        <th>
                          <p title="SalonName">Tên salon</p>
                        </th>
                        <th>
                          <p title="SalonAddress">Địa chỉ</p>
                        </th>
                        <th>
                          <p title="Rating" className="has-text-centered">
                            Đánh giá
                          </p>
                        </th>
                        <th
                          className="has-text-centered"
                          style={{ minWidth: "15rem" }}
                        >
                          <p title="Actions"></p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {listSalonDeactive?.map((element) => (
                        <tr key={element.salonId}>
                          <th scope="row">
                            {listSalonDeactive.indexOf(element) + 1}
                          </th>
                          <td>{element.nameSalon}</td>
                          <td style={{ maxWidth: "20rem" }}>
                            {element.detailAddress}
                          </td>

                          <td className="has-text-centered">
                            {" "}
                            <Rating
                              name="half-rating-read"
                              defaultValue={element.star}
                              precision={0.5}
                              readOnly
                            />
                          </td>

                          <td className="has-text-centered">
                            <Link
                              to={`/DetailSalonDeactive/${element.salonId}`}
                              className="button is-rounded is-info mr-5"
                              onClick={() => {
                                dispatch(
                                  updateSelectedSalonDeactiveBussinessInfo(
                                    element
                                  )
                                );
                              }}
                            >
                              <i className="fa-solid fa-circle-info"></i>
                            </Link>{" "}
                            <button
                              className="button is-rounded is-primary has-text-white"
                              onClick={() => {
                                setSalonActive(element);
                                setDialogActiveOpen(true);
                              }}
                            >
                              <i className="fa-solid fa-play"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabPanel>
              <TabPanel value="3">
                <div>
                  {" "}
                  <div className="mb-5 form-outline row">
                    <div className="col-6"></div>
                    <div className="input-group col-6">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-magnifying-glass"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Tìm kiếm"
                        maxLength={40}
                        value={nameSalonRequest}
                        onChange={(e) => {
                          setNameSalonRequest(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>
                          <p title="stt">#</p>
                        </th>
                        <th>
                          <p title="SalonName">Tên salon</p>
                        </th>
                        <th>
                          <p title="SalonAddress">Địa chỉ</p>
                        </th>
                        <th>
                          <p title="DateJoin">Ngày vào</p>
                        </th>
                        <th>
                          <p title="Rating">Email</p>
                        </th>
                        <th
                          className="has-text-centered"
                          style={{ minWidth: "20rem" }}
                        >
                          <p title="Actions"></p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {listSalonRequest?.map((element) => (
                        <tr key={element.salonId}>
                          <th scope="row">
                            {listSalonRequest.indexOf(element) + 1}
                          </th>
                          <td>{element.nameSalon}</td>
                          <td style={{ maxWidth: "20rem" }}>
                            {element.detailAddress}
                          </td>
                          <td>
                            {convertISOStringToLocaleDateString(
                              element.requestDate
                            )}
                          </td>
                          <td>{element.email}</td>

                          <td className="has-text-centered">
                            <Link
                              to={`/RequestForm/${element.salonId}`}
                              className="button is-rounded is-info mr-5"
                              onClick={() => {
                                dispatch(
                                  updateSelectedSalonRequestBussinessInfo(
                                    element
                                  )
                                );
                              }}
                            >
                              <i className="fa-solid fa-circle-info"></i>
                            </Link>{" "}
                            <button
                              className="button is-rounded is-success mr-5 has-text-white"
                              onClick={() => {
                                setSalonActive(element);
                                setDialogActiveOpen(true);
                              }}
                            >
                              <i className="fa-solid fa-check"></i>
                            </button>
                            <button
                              className="button is-rounded is-danger has-text-white"
                              onClick={() => {
                                setSalonReject(element);
                                setDialogRejectOpen(true);
                              }}
                            >
                              <i className="fa-solid fa-trash-can"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabPanel>
            </TabContext>
          </div>
          {/* DIALOG ACTIVE */}
          <Dialog
            onClose={handleActiveClose}
            open={dialogActiveOpen}
            maxWidth="lg"
          >
            <FormWrapper style={{ minHeight: "6rem" }}>
              <FieldLabel>Bạn muốn kích hoạt salon này?</FieldLabel>
            </FormWrapper>
            <ButtonWrapper>
              {activeSuccessMess && (
                <SuccessText>{activeSuccessMess}</SuccessText>
              )}
            </ButtonWrapper>
            <ButtonWrapper>
              <button
                className="button is-danger mr-5 has-text-white is-rounded"
                onClick={() => setDialogActiveOpen(false)}
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
          {/* DIALOG Reject */}
          <Dialog
            onClose={handleRejectClose}
            open={dialogRejectOpen}
            maxWidth="lg"
          >
            <FormWrapper style={{ minHeight: "6rem" }}>
              <FieldLabel>
                Bạn muốn từ chối đơn đăng ký của salon này?
              </FieldLabel>
            </FormWrapper>
            <ButtonWrapper>
              {rejectSuccessMess && (
                <SuccessText>{rejectSuccessMess}</SuccessText>
              )}
            </ButtonWrapper>
            <ButtonWrapper>
              <button
                className="button is-danger mr-5 has-text-white is-rounded"
                onClick={() => setDialogRejectOpen(false)}
              >
                Hủy
              </button>
              <button
                className="button is-success has-text-white is-rounded"
                onClick={handleReject}
              >
                Xác nhận
              </button>
            </ButtonWrapper>
          </Dialog>
          {/* DIALOG DEACTIVE */}
          <Dialog onClose={handleClose} open={dialogOpen} maxWidth="lg">
            <FormWrapper style={{ minHeight: "6rem" }}>
              <FieldLabel>Bạn muốn dừng hoạt động của salon này?</FieldLabel>
            </FormWrapper>
            <ButtonWrapper>
              {deactiveSuccessMess && (
                <SuccessText>{deactiveSuccessMess}</SuccessText>
              )}
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
                onClick={handleDeactive}
              >
                Xác nhận
              </button>
            </ButtonWrapper>
          </Dialog>
          <div className="column is-2"></div>
        </div>
      </div>
    </div>
  );
}
