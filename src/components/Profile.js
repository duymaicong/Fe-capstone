import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  Button as MuiButton,
  Dialog,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import ReservationTable from "./tables/ReservationTable";
import {
  changePassword,
  getCustomerProfile,
  updateCustomerProfile,
  resetMessage,
} from "../redux/actions/creators/profile";
import {
  getHistoryBooking,
  getReservation,
  resetReservationList,
} from "../redux/actions/creators/booking";
import { convertISOStringToLocaleDateString } from "../utils";
import { validPhone, validPassword } from "../validations/regex";

import introbg from "../assets/introbg-1.jpg";
import bgImg from "../assets/barbershopbg.jpg";
import videobg from "../assets/videobg.jpg";
import patterbg from "../assets/patterbg.svg";

const PageWrapper = styled(Grid)({
  backgroundImage: `url(${bgImg})`,
  minHeight: "100vh",
  padding: 40,
});

const UserInfo = styled(Box)({
  padding: 20,
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  minHeight: "25rem",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  borderRadius: 10,
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

const UserInfoText = styled(Typography)({
  color: "#305470",
  fontSize: 20,
  fontFamily: "Segoe UI",
  lineHeight: 1.75,
});

const UsernameText = styled(UserInfoText)({
  fontSize: 36,
  fontWeight: 600,
});

const ButtonWrapper = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 20,
});

const Button = styled(MuiButton)(({ width }) => ({
  textTransform: "capitalize",
  fontSize: 16,
  borderRadius: 12,
  lineHeight: "40px",
  minWidth: 110,
  height: 40,
}));

const ActionButton = styled(Button)({
  fontSize: 20,
  backgroundColor: "#1e6296",
});

const SecondaryActionButton = styled(ActionButton)({
  backgroundColor: "#ff6060",
  marginRight: 30,
});

const ReservationHistory = styled(Box)({
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  minHeight: 550,
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  borderRadius: 10,
});

const Tabs = styled(Grid)({
  height: 50,
  
});

const Tab = styled(Box)(({ selected }) => ({
  backgroundColor: "white",
  display: "flex",
  color: selected ? "#1e6296" : "#4a4a4a",
  fontSize: 25,
  fontFamily: "Roboto",
  lineHeight: 1.75,
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  borderBottom: selected ? "solid 2px #1e6296" : "",
  
}));

const FormWrapper = styled(Box)({
  minWidth: 800,
  backgroundColor: "white",
  padding: 30,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const FieldWrapper = styled(Grid)({
  height: 60,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const FieldLabel = styled(Box)({
  display: "flex",
  color: "#305470",
  fontSize: 20,
  fontFamily: "Segoe UI",
  alignItems: "center",
  justifyContent: "flex-end",
});

const TextInput = styled(TextField)({
  height: 30,
  width: 300,
});
const InputPassword = styled(TextField)({
  height: 30,
  width: 300,
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

export default function Profile() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [profileInfo, setProfileInfo] = useState(null);
  const [validationErr, setValidationErr] = useState(null);

  const [dialogChangepassOpen, setDialogChangepassOpen] = useState(false);

  //STATE CHANGE PASSWORD
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");

  const dispatch = useDispatch();
  const { token, account_name: username } = useSelector(
    (state) => state.loginAccount.account
  );
  const { info, errMess, successMess } = useSelector((state) => state.profile);
  const { historyList, reservationList, reservationErrMess, historyErrMess } =
    useSelector((state) => state.historyBooking);

  useEffect(() => {
    dispatch(getCustomerProfile(token));
  }, [dispatch, token, dialogOpen]);

  useEffect(() => {
    dispatch(resetReservationList());
    dispatch(getHistoryBooking(token));
    dispatch(getReservation(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (info) {
      setProfileInfo(info);
    }
  }, [info]);

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleChangePassClose = () => {
    setDialogChangepassOpen(false);
  };

  const handleReservationTab = () => {
    setSelectedTab(0);
    dispatch(reservationList());
    dispatch(getReservation(token));
  };

  const handleHistoryTab = () => {
    setSelectedTab(1);
    dispatch(getHistoryBooking(token));
  };

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !reNewPassword) {
      setValidationErr("Please enter all the fields");
      return;
    }
    if (!validPassword.test(newPassword)) {
      setValidationErr("New password is invalid!");
      return;
    }
    if (newPassword !== reNewPassword) {
      setValidationErr("The entered passwords do not match. Try again!");
      return;
    }
    setValidationErr(null);
    const submitObject = {
      old_password: oldPassword,
      new_password: newPassword,
    };
    const callback = () => {
      setDialogChangepassOpen(false);
      setOldPassword("");
      setNewPassword("");
      setReNewPassword("");
      dispatch(resetMessage());
    };
    dispatch(changePassword(token, submitObject, callback));
  };
  return (
    <>
      <PageWrapper container spacing={2}>
        <Grid item xs={12} md={3}>
          <UserInfo>
            {info ? (
              <>
                <UsernameText>{info?.nameCustomer}</UsernameText>
                <UserInfoText>
                  <b>Ngày sinh:</b>{" "}
                  {convertISOStringToLocaleDateString(info?.birthday)}
                </UserInfoText>
                <UserInfoText>
                  <b>Số điện thoại:</b> {info?.phone}
                </UserInfoText>
                <UserInfoText>
                  <b>Địa chỉ:</b> {info?.address}
                </UserInfoText>
                <ButtonWrapper>
                  <ActionButton
                    width={180}
                    variant="contained"
                    onClick={() => setDialogOpen(true)}
                  >
                    Chỉnh sửa
                  </ActionButton>
                </ButtonWrapper>
                <ButtonWrapper>
                  <Button
                    width={180}
                    variant="outlined"
                    onClick={() => setDialogChangepassOpen(true)}
                  >
                    Đổi mật khẩu
                  </Button>
                </ButtonWrapper>
              </>
            ) : (
              <Loading />
            )}
          </UserInfo>
        </Grid>
        <Grid item xs={12} md={9}>
          <ReservationHistory>
            <Tabs container>
              <Grid item xs={6}>
                <Tab
                  selected={selectedTab === 0}
                  onClick={handleReservationTab}
                >
                  Lịch hẹn
                </Tab>
              </Grid>
              <Grid item xs={6}>
                <Tab selected={selectedTab === 1} onClick={handleHistoryTab}>
                  Lịch sử
                </Tab>
              </Grid>
            </Tabs>
            {selectedTab === 0 &&
              (reservationList?.length > 0 ? (
                <div style={{ overflowY: "scroll", height: "35rem" }}>
                  <ReservationTable data={reservationList} />
                  {reservationErrMess && (
                    <ErrorText>{reservationErrMess}</ErrorText>
                  )}
                </div>
              ) : (
                <UserInfoText className="text-center">
                  Bạn chưa có cuộc hẹn nào
                </UserInfoText>
              ))}
            {selectedTab === 1 &&
              (historyList?.length > 0 ? (
                <div style={{ overflowY: "scroll", height: "35rem" }}>
                  <ReservationTable historyTable data={historyList} />
                  {historyErrMess && <ErrorText>{historyErrMess}</ErrorText>}
                </div>
              ) : (
                <Loading />
              ))}
          </ReservationHistory>
        </Grid>
      </PageWrapper>
      {/* edit profile */}
      <Dialog onClose={handleClose} open={dialogOpen} maxWidth="lg">
        <FormWrapper style={{ minHeight: "50vh" }}>
          <FieldLabel style={{ fontSize: "2rem" }}>Thông tin</FieldLabel>
          <FieldWrapper container spacing={2}>
            <Grid item xs={4}>
              <FieldLabel>Họ và tên</FieldLabel>
            </Grid>
            <Grid item xs={8}>
              <TextInput
                variant="standard"
                margin="dense"
                size="small"
                value={profileInfo?.nameCustomer}
                onChange={(e) => {
                  setProfileInfo({
                    ...profileInfo,
                    nameCustomer: e.target.value,
                  });
                }}
              />
            </Grid>
          </FieldWrapper>
          <FieldWrapper container spacing={2}>
            <Grid item xs={4}>
              <FieldLabel>Ngày sinh</FieldLabel>
            </Grid>
            <Grid item xs={8}>
              {/* <DatePicker
                selected={new Date(profileInfo?.birthday)}
                onChange={(date) => {
                  const dateStr = date.toISOString();
                  setProfileInfo({ ...profileInfo, birthday: dateStr });
                }}
              /> */}
              <DatePicker
                selected={new Date(profileInfo?.birthday)}
                onChange={(date) => {
                //   const localISOTime = (date).toISOString();
                  var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
                  var localISOTime = (new Date(date - tzoffset)).toISOString().slice(0, -1);
                  console.log(localISOTime)
                  setProfileInfo({ ...profileInfo, birthday: localISOTime });
                }}
              />
            </Grid>
          </FieldWrapper>
          <FieldWrapper container spacing={2}>
            <Grid item xs={4}>
              <FieldLabel>Số điện thoại</FieldLabel>
            </Grid>
            <Grid item xs={8}>
              <TextInput
                variant="standard"
                margin="dense"
                size="small"
                inputProps={{ maxLength: 10 }}
                value={profileInfo?.phone}
                onChange={(e) => {
                  setProfileInfo({
                    ...profileInfo,
                    phone: e.target.value,
                  });
                }}
              />
            </Grid>
          </FieldWrapper>
          <FieldWrapper container spacing={2}>
            <Grid item xs={4}>
              <FieldLabel>Địa chỉ</FieldLabel>
            </Grid>
            <Grid item xs={8}>
              <TextInput
                variant="standard"
                margin="dense"
                size="small"
                value={profileInfo?.address}
                onChange={(e) => {
                  setProfileInfo({
                    ...profileInfo,
                    address: e.target.value,
                  });
                }}
              />
            </Grid>
          </FieldWrapper>
          <ButtonWrapper>
            {successMess && <SuccessText>{successMess}</SuccessText>}
            {errMess && <ErrorText>{errMess}</ErrorText>}
            {validationErr && <ErrorText>{validationErr}</ErrorText>}
          </ButtonWrapper>
          <ButtonWrapper>
            <SecondaryActionButton
              variant="contained"
              color="error"
              width={110}
              onClick={() => {
                setDialogOpen(false);
                setProfileInfo(info);
                setValidationErr(null);
              }}
            >
              Hủy
            </SecondaryActionButton>
            <ActionButton
              variant="contained"
              width={110}
              onClick={() => {
                const { nameCustomer, phone, address, birthday } = profileInfo;
                if (!nameCustomer || !phone || !address || !birthday) {
                  setValidationErr("Please enter all the fields");
                  return;
                }
                if (!validPhone.test(phone)) {
                  setValidationErr("Phone number is invalid!");
                  return;
                }
                setValidationErr(null);
                const submitObject = {
                  nameCustomer,
                  phone,
                  address,
                  birthday: birthday.substring(0, 10),
                };
                const callback = () => {
                  setDialogOpen(false);
                };
                dispatch(updateCustomerProfile(submitObject, token, callback));
              }}
            >
              Xong
            </ActionButton>
          </ButtonWrapper>
        </FormWrapper>
      </Dialog>

      {/* change password */}
      <Dialog
        onClose={handleChangePassClose}
        open={dialogChangepassOpen}
        maxWidth="lg"
      >
        <FormWrapper style={{ minHeight: "50vh" }}>
          <FieldLabel style={{ fontSize: "2rem" }}>Đổi mật khẩu</FieldLabel>
          <FieldWrapper container spacing={2}>
            <Grid item xs={4}>
              <FieldLabel>Mật khẩu hiện tại</FieldLabel>
            </Grid>
            <Grid item xs={8}>
              <InputPassword
                type="password"
                variant="standard"
                margin="dense"
                size="small"
                value={oldPassword}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
              />
            </Grid>
          </FieldWrapper>
          <FieldWrapper container spacing={2}>
            <Grid item xs={4}>
              <FieldLabel>Mật khẩu mới</FieldLabel>
            </Grid>
            <Grid item xs={8}>
              <InputPassword
                type="password"
                variant="standard"
                margin="dense"
                size="small"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
            </Grid>
          </FieldWrapper>
          <FieldWrapper container spacing={2}>
            <Grid item xs={4}>
              <FieldLabel>Nhập lại mật khẩu mới</FieldLabel>
            </Grid>
            <Grid item xs={8}>
              <InputPassword
                type="password"
                variant="standard"
                margin="dense"
                size="small"
                value={reNewPassword}
                onChange={(e) => {
                  setReNewPassword(e.target.value);
                }}
              />
            </Grid>
          </FieldWrapper>
          <ButtonWrapper>
            {successMess && <SuccessText>{successMess}</SuccessText>}
            {errMess && <ErrorText>{errMess}</ErrorText>}
            {validationErr && <ErrorText>{validationErr}</ErrorText>}
          </ButtonWrapper>
          <ButtonWrapper>
            <SecondaryActionButton
              variant="contained"
              color="error"
              width={110}
              onClick={() => {
                setDialogChangepassOpen(false);
                setNewPassword("");
                setOldPassword("");
                setReNewPassword("");
                setValidationErr(null);
              }}
            >
              Hủy
            </SecondaryActionButton>
            <ActionButton
              variant="contained"
              width={110}
              onClick={handleChangePassword}
            >
              Xác nhận
            </ActionButton>
          </ButtonWrapper>
        </FormWrapper>
      </Dialog>
    </>
  );
}
