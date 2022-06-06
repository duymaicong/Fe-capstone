import paperbg from "../../assets/paperbg.jpg";
import bgImg from "../../assets/barbershopbg.jpg";
import imageUnavailable from "../../assets/image-unavailable.png";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileOfSalon,
  editSalonBusinessInfo,
  editSalonBusinessInfoFirebase,
} from "../../redux/actions/creators/salon";
import { Modal, Box, Tooltip } from "@mui/material";
import { logout } from "../../redux/actions/creators/auth";
import { districts, times } from "../../assets/data/data.js";
import { validEmail, validPhone, validPassword } from "../../validations/regex";
import {
  Button as MuiButton,
  Dialog,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  changePassword,
  resetMessage,
} from "../../redux/actions/creators/profile";

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

const InputPassword = styled(TextField)({
  height: 30,
  width: 300,
});

// CSS

const root = {
  backgroundImage: `url(${bgImg})`,
  backgroundRepeat: "repeat-y",
  backgroundSize: "100%",
};

export default function SalonDashboard() {
  const dispatch = useDispatch();

  const [validationErr, setValidationErr] = useState(null);
  const [dialogChangepassOpen, setDialogChangepassOpen] = useState(false);

  //STATE CHANGE PASSWORD
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");

  // -- GET SALON PROFILE --
  const { token, account_name: username } = useSelector(
    (state) => state.loginAccount.account
  );
  const { profileSalon } = useSelector((state) => state.profileSalon);
  useEffect(() => {
    dispatch(getProfileOfSalon(token));
  }, [dispatch, token]);

  //EDIT INFO
  const handleEditInfor = (e) => {
    handleOpen();
    console.log(e);
  };

  // -- MODAL --
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setEmptyError(false);
    setEmailErr(false);
    setPhoneErr(false);
    if (profileSalon) {
      setBusinessInfo(profileSalon[0]);
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //LOAD REDUX EDIT BUSINESS INFO
  const { businessInfoEdited, infoSuccessMess, infoErrMess } = useSelector(
    (state) => state.editBusinessInfo
  );
  //STATE EDIT BUSINESS INFO
  const [businessInfo, setBusinessInfo] = useState(null);
  const [checkImage, setCheckImage] = useState("");
  const [message, setMessage] = useState("");

  //LOAD BUSINESS INFO
  useEffect(() => {
    if (profileSalon) {
      setBusinessInfo(profileSalon[0]);
      setCheckImage(profileSalon[0].image);
    }
  }, [profileSalon]);

  //VALIDATION ERROR
  const [emptyError, setEmptyError] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);

  //EDIT BUSINESS INFO
  const handleEditBusinessInfo = (e) => {
    e.preventDefault();
    setEmptyError(false);
    setEmailErr(false);
    setPhoneErr(false);
    const {
      nameSalon,
      nameOwner,
      email,
      phone,
      taxCode,
      district,
      city,
      detailAddress,
      timeOpen,
      timeClose,
      image,
    } = businessInfo;

    if (
      !nameSalon ||
      !nameOwner ||
      !email ||
      !phone ||
      !taxCode ||
      !district ||
      !city ||
      !detailAddress ||
      !timeOpen ||
      !timeClose
    ) {
      setEmptyError(true);
      return;
    }
    if (!validEmail.test(email)) {
      setEmailErr(true);
      return;
    }
    if (!validPhone.test(phone)) {
      setPhoneErr(true);
      return;
    }
    setEmptyError(false);
    setEmailErr(false);
    setPhoneErr(false);
    const submitOjb = {
      nameSalon,
      nameOwner,
      email,
      phone,
      taxCode,
      district,
      city,
      detailAddress,
      timeOpen,
      timeClose,
      image,
    };
    if (!image) {
      submitOjb.image = checkImage;
    }
    const successCallback = () => {
      handleClose();
      dispatch(getProfileOfSalon(token));
    };
    const errorCallback = (mess) => {
      if (
        mess ==
        "Could not upload the file: undefined. Error: Only .png, .jpg and .jpeg format allowed!"
      ) {
        setMessage("chọn ảnh .png .jpg .jpeg");
      } else if (mess == "File size cannot be larger than 2MB!") {
        setMessage("chọn ảnh có dung lượng lớn nhất là 2M");
      } else {
        setMessage(mess);
      }
    };
    if (typeof submitOjb.image == "string") {
      dispatch(
        editSalonBusinessInfo(token, submitOjb, successCallback, errorCallback)
      );
    } else {
      dispatch(
        editSalonBusinessInfoFirebase(
          token,
          submitOjb,
          successCallback,
          errorCallback
        )
      );
    }
  };

  const handleChangePassClose = () => {
    setDialogChangepassOpen(false);
  };

  const { errMess, successMess } = useSelector((state) => state.profile);
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

  return profileSalon ? (
    <div>
      <div style={root}>
        <div
          className="columns"
          style={{
            minHeight: "400px",
            // , marginTop: "96px"
          }}
        >
          <div className="column is-2"></div>
          <div
            className="column is-8  has-text-centered "
            style={{
              background: "url(" + paperbg + ")",
              // backgroundColor :"#f5f4eb",
              padding: 0,
              marginTop: "30px",
              marginBottom: "30px",
            }}
          >
            <h2 className="is-size-1 mt-5 mb-5 font-weight-bold">Hồ sơ</h2>
            <div className="columns">
              <div className="column is-6 has-text-right">
                <p className="is-size-4">Tên salon : </p>
                <p className="is-size-4">Tên chủ salon : </p>
                <p className="is-size-4">Mã số thuế : </p>
                <p className="is-size-4">SĐT : </p>
                <p className="is-size-4">Giờ mở cửa : </p>
                <p className="is-size-4">Giờ đóng cửa : </p>
                <p className="is-size-4">Quận : </p>
                <p className="is-size-4">Thành phố : </p>
                <p className="is-size-4">Địa chỉ cụ thể : </p>
                <p className="is-size-4">Email : </p>
                <p className="is-size-4">Ảnh đại diện : </p>
              </div>
              <div className="column is-6 has-text-left">
                <p className="is-size-4">{profileSalon[0].nameSalon}</p>
                <p className="is-size-4"> {profileSalon[0].nameOwner}</p>
                <p className="is-size-4 has-text-primary has-text-weight-bold">
                  {profileSalon[0].taxCode}
                </p>
                <p className="is-size-4">{profileSalon[0].phone}</p>
                <p className="is-size-4 has-text-danger">
                  {profileSalon[0].timeOpen}
                </p>
                <p className="is-size-4 has-text-danger">
                  {profileSalon[0].timeClose}
                </p>
                <p className="is-size-4">{profileSalon[0].district}</p>
                <p className="is-size-4">{profileSalon[0].city}</p>
                <p className="is-size-4">{profileSalon[0].detailAddress}</p>
                <p className="is-size-4 is-underlined">
                  {profileSalon[0].email}
                </p>
                <img
                  style={{
                    maxHeight: "300px",
                    maxWidth: "500px",
                    marginTop: "10px",
                  }}
                  src={
                    profileSalon[0].image
                      ? profileSalon[0].image
                      : imageUnavailable
                  }
                  alt="..."
                ></img>
              </div>
            </div>

            <div className="has-text-centered mb-5 pr-0 ">
              <button
                className="button is-info is-rounded"
                style={{ width: "200px" }}
                onClick={(e) => {
                  setCheckImage(profileSalon[0].image);
                  console.log(profileSalon[0].image);
                  handleOpen();
                }}
              >
                Chỉnh sửa hồ sơ
              </button>
              <button
                className="button is-info ml-5 is-rounded"
                style={{ width: "200px" }}
                onClick={() => {
                  setDialogChangepassOpen(true);
                }}
              >
                Đổi mật khẩu
              </button>
            </div>
          </div>
          <div className="column is-2"></div>
        </div>
      </div>
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
      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
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
          }}
        >
          <div>
            <form>
              <div className="form-outline mb-4">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="">
                      Tên salon*
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    maxLength={40}
                    value={businessInfo?.nameSalon}
                    onChange={(e) => {
                      setBusinessInfo({
                        ...businessInfo,
                        nameSalon: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="form-outline mb-4">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="">
                      Tên chủ salon*
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    maxLength={40}
                    value={businessInfo?.nameOwner}
                    onChange={(e) => {
                      setBusinessInfo({
                        ...businessInfo,
                        nameOwner: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="form-outline mb-4">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="">
                      Email
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    maxLength={40}
                    value={businessInfo?.email}
                    onChange={(e) => {
                      setBusinessInfo({
                        ...businessInfo,
                        email: e.target.value,
                      });
                    }}
                  />
                </div>
                {emailErr && (
                  <p className="text-danger">Địa chỉ email không hợp lệ.</p>
                )}
              </div>

              <div className="form-outline mb-4">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="">
                      SĐT*
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    maxLength={40}
                    value={businessInfo?.phone}
                    onChange={(e) => {
                      setBusinessInfo({
                        ...businessInfo,
                        phone: e.target.value,
                      });
                    }}
                  />
                </div>
                {phoneErr && (
                  <p className="text-danger">Số điện thoại không hợp lệ.</p>
                )}
              </div>

              <div className="form-outline mb-4">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="">
                      Mã số thuế*
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    maxLength={40}
                    value={businessInfo?.taxCode}
                    onChange={(e) => {
                      setBusinessInfo({
                        ...businessInfo,
                        taxCode: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="form-outline mb-4">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label
                      className="input-group-text"
                      htmlFor="inputGroupSelect01"
                    >
                      Quận*
                    </label>
                  </div>
                  <select
                    className="custom-select"
                    id="inputGroupSelect01"
                    onChange={(e) => {
                      setBusinessInfo({
                        ...businessInfo,
                        district: e.target.value,
                      });
                    }}
                  >
                    <option defaultValue={businessInfo?.district}>
                      {businessInfo?.district}
                    </option>
                    {districts.map((district) => (
                      <option key={district.toString()} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                  <div className="input-group-prepend ml-3">
                    <label
                      className="input-group-text"
                      htmlFor="inputGroupSelect02"
                    >
                      Thành phố
                    </label>
                  </div>
                  <select className="custom-select" id="inputGroupSelect02">
                    <option value={businessInfo?.city}>
                      {businessInfo?.city}
                    </option>
                  </select>
                </div>
              </div>

              <div className="form-outline mb-4">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="">
                      Địa chỉ cụ thể*
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    maxLength={100}
                    value={businessInfo?.detailAddress}
                    onChange={(e) => {
                      setBusinessInfo({
                        ...businessInfo,
                        detailAddress: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="form-outline mb-4">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label
                      className="input-group-text"
                      htmlFor="inputGroupSelect03"
                    >
                      Mở cửa
                    </label>
                  </div>
                  <select
                    className="custom-select"
                    id="inputGroupSelect03"
                    onChange={(e) => {
                      setBusinessInfo({
                        ...businessInfo,
                        timeOpen: e.target.value,
                      });
                    }}
                  >
                    <option defaultValue={businessInfo?.timeOpen}>
                      {businessInfo?.timeOpen}
                    </option>
                    {times.map((time) => (
                      <option key={time.toString()} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  <div className="input-group-prepend ml-3">
                    <label
                      className="input-group-text"
                      htmlFor="inputGroupSelect04"
                    >
                      Đóng cửa
                    </label>
                  </div>
                  <select
                    className="custom-select"
                    id="inputGroupSelect04"
                    onChange={(e) => {
                      setBusinessInfo({
                        ...businessInfo,
                        timeClose: e.target.value,
                      });
                    }}
                  >
                    <option value={businessInfo?.timeClose}>
                      {businessInfo?.timeClose}
                    </option>
                    {times.map((time) => (
                      <option key={time.toString()} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-outline mb-4">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="">
                      Ảnh đại diện
                    </span>
                  </div>
                  {/* <input
                    type="text"
                    className="form-control"
                    maxLength={2000}
                    value={businessInfo?.image}
                    onChange={(e) => {
                      setBusinessInfo({
                        ...businessInfo,
                        image: e.target.value,
                      });
                    }}
                  /> */}
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => {
                      setBusinessInfo({
                        ...businessInfo,
                        image: e.target.files[0],
                      });
                    }}
                  />
                  {!businessInfo?.image ?(<></>):(<>{typeof businessInfo?.image==='string' ? (<img alt="" width={"150px"} src={businessInfo?.image}></img>):(<img alt="" width={"150px"} src={URL.createObjectURL(businessInfo?.image)}/>)}</>) }
                </div>
              </div>
              <p className="text-success">{message}</p>
              {/* <div> 
                {infoSuccessMess && (
                  <p className="text-success">{infoSuccessMess}</p>
                )}
                {infoErrMess && <p className="text-danger">{infoErrMess}</p>}
                {emptyError && (
                  <p className="text-danger">Vui lòng điền đầy đủ thông tin!</p>
                )}
              </div> */}

              <div className="has-text-right">
                <button
                  className="button is-rounded is-danger"
                  onClick={handleClose}
                >
                  {" "}
                  Hủy
                </button>
                <button
                  className="button is-rounded is-primary ml-4"
                  onClick={handleEditBusinessInfo}
                >
                  {" "}
                  Xác nhận
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
      {/*  */}
    </div>
  ) : (
    <div></div>
  );
}
