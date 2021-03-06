import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bgImg from "../../assets/introbg-1.jpg";
import { districts, times } from "../../assets/data/data.js";
import { validPassword, validEmail, validPhone } from "../../validations/regex";
import { registerSalon } from "../../redux/actions/creators/auth/index";
import { useDispatch, useSelector } from "react-redux";

export default function RegisterSalon() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [email, setEmail] = useState("");
  const [nameSalon, setNameSalon] = useState("");
  const [phone, setPhone] = useState("");
  const [taxCode, setTaxCode] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("Hanoi");
  const [dedtailAddress, setDetailAddress] = useState("");
  const [timeOpen, setTimeOpen] = useState("");
  const [timeClose, setTimeClose] = useState("");
  const [salonImage, setSalonImage] = useState("");
  const [salonDescription, setSalonDescription] = useState("");
  const [nameOwner, setNameOwner] = useState("");

  //error
  const [error, setError] = useState(false);
  const [confirmPwdError, setConfirmPwdError] = useState(false);
  //validation
  const [pwdErr, setPwdErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);

  //registerSalon
  const { registeredSalon, errMess, successMessage } = useSelector(
    (state) => state.registerSalon
  );
  const dispatch = useDispatch();

  const root = {
    textAlign: "center",
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  const btnSubmit = {
    border: "none",
    borderRadius: "0.5rem",
    padding: "1%",
    marginTop: "2rem",
    width: "30%",
    height: "2.6rem",
    cursor: "pointer",
    background: "#0062cc",
    color: "#fff",
    fontSize: "1.3rem",
  };

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleCPassword = (e) => {
    setConfirmPwd(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleNameSalon = (e) => {
    setNameSalon(e.target.value);
  };
  const handleDetailAddress = (e) => {
    setDetailAddress(e.target.value);
  };
  const handleCity = (e) => {
    setCity(e.target.value);
  };
  const handleDistrict = (e) => {
    setDistrict(e.target.value);
  };
  const handleTaxCode = (e) => {
    setTaxCode(e.target.value);
  };
  const handleTimeOpen = (e) => {
    setTimeOpen(e.target.value);
  };

  const handleTimeClose = (e) => {
    setTimeClose(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleSalonImage = (e) => {
    setSalonImage(e.target.value);
  };
  const handleNameOwner = (e) => {
    setNameOwner(e.target.value);
  };
  const handleSalonDescription = (e) => {
    setSalonDescription(e.target.value);
  };

  const resetForm = () => {
    setUserName("");
    setPassword("");
    setConfirmPwd("");
    setNameSalon("");
    setEmail("");
    setPhone("");
    setTaxCode("");
    setDistrict("");
    setCity("Hanoi");
    setDetailAddress("");
    setTimeOpen("");
    setTimeClose("");
    setSalonImage("");
    setNameOwner("");
    setSalonDescription("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPwdErr(false);
    setEmailErr(false);
    setPhoneErr(false);
    setConfirmPwdError(false);
    setError(false);

    const newSalon = {
      account_name: username,
      password: password,
      email: email,
      phone: phone,
      nameSalon: nameSalon,
      detailAddress: dedtailAddress,
      city: city,
      district: district,
      taxCode: taxCode,
      timeOpen: timeOpen,
      timeClose: timeClose,
      role: "salon",
      image: salonImage,
      description: salonDescription,
      nameOwner: nameOwner,
    };
    let pass = true;
    if (
      username === "" ||
      password === "" ||
      confirmPwd === "" ||
      nameSalon === "" ||
      email === "" ||
      phone === "" ||
      taxCode === "" ||
      district === "" ||
      city === "" ||
      timeOpen === "" ||
      timeClose === "" ||
      salonImage === "" ||
      salonDescription === "" ||
      nameOwner === ""
    ) {
      setError(true);
      pass = false;
      return;
    }
    if (!validPassword.test(password)) {
      setPwdErr(true);
      pass = false;
      
    }
    if (confirmPwd !== password) {
      setConfirmPwdError(true);
      pass = false;
      
    }
    if (!validEmail.test(email)) {
      setEmailErr(true);
      pass = false;
      
    }
    if (!validPhone.test(phone)) {
      setPhoneErr(true);
      pass = false;
      
    }
    if (pass) {
      dispatch(registerSalon(newSalon));
    }
    // console.log(newSalon)
  };
  useEffect(() => {
    if (successMessage) {
      resetForm();
    }
  }, [successMessage]);

  return (
    <div style={root}>
      <div className="container register-form ">
        <section className=" bg-image ">
          <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                  <div
                    className="card bg-transparent"
                    style={{ borderRadius: "15px", border: "none" }}
                  >
                    <div className="card-body p-5">
                      <h2
                        className="text-center mb-5 pt-5 pb-5"
                        style={{ fontSize: "1.7rem", fontWeight: "bold" }}
                      >
                        ????ng k?? tr??? th??nh salon ?????i t??c
                      </h2>
                      <div className="messages">
                        {error && (
                          <div className="error">
                            <p className="text-danger">
                              Vui l??ng ??i???n ?????y ????? th??ng tin!
                            </p>
                          </div>
                        )}
                        {errMess && (
                          <div className="error">
                            <p className="text-danger">{errMess}</p>
                          </div>
                        )}
                        {successMessage && (
                          <div className="success">
                            <p className="text-success">
                              {successMessage}: {registeredSalon?.account_name}
                            </p>
                          </div>
                        )}
                      </div>
                      <form>
                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text" id="">
                                T??n ????ng nh???p*
                              </span>
                            </div>
                            <input
                              value={username}
                              type="text"
                              className="form-control"
                              maxLength={40}
                              onChange={handleUserName}
                            />
                          </div>
                        </div>
                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text" id="">
                                M???t kh???u*
                              </span>
                            </div>
                            <input
                              value={password}
                              type="password"
                              className="form-control"
                              maxLength={40}
                              onChange={handlePassword}
                            />
                          </div>
                          {pwdErr && (
                            <p className="text-danger">
                              M???t kh???u ph???i t??? 8 ?????n 40 k?? t???, trong ???? c?? ch???a
                              ??t nh???t 1 ch??? c??i vi???t hoa, m???t ch??? c??i vi???t
                              th?????ng v?? 1 s???.
                            </p>
                          )}
                        </div>

                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text" id="">
                                Nh???p l???i m???t kh???u*
                              </span>
                            </div>
                            <input
                              value={confirmPwd}
                              maxLength={40}
                              type="password"
                              className="form-control"
                              onChange={handleCPassword}
                            />
                          </div>
                          {confirmPwdError && (
                            <p className="text-danger">
                              M???t kh???u kh??ng tr??ng kh???p, vui l??ng ki???m tra l???i!
                            </p>
                          )}
                        </div>
                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text" id="">
                                T??n salon*
                              </span>
                            </div>
                            <input
                              value={nameSalon}
                              type="text"
                              className="form-control"
                              maxLength={40}
                              onChange={handleNameSalon}
                            />
                          </div>
                        </div>
                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text" id="">
                                T??n ch??? salon*
                              </span>
                            </div>
                            <input
                              value={nameOwner}
                              type="text"
                              className="form-control"
                              maxLength={40}
                              onChange={handleNameOwner}
                            />
                          </div>
                        </div>
                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text" id="">
                                Email*
                              </span>
                            </div>
                            <input
                              value={email}
                              type="text"
                              className="form-control"
                              maxLength={40}
                              onChange={handleEmail}
                            />
                          </div>
                          {emailErr && (
                            <p className="text-danger">
                              ?????a ch??? email c???a b???n kh??ng ch??nh x??c!
                            </p>
                          )}
                        </div>

                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text" id="">
                                S??T*
                              </span>
                            </div>
                            <input
                              value={phone}
                              type="text"
                              className="form-control"
                              maxLength={40}
                              onChange={handlePhone}
                            />
                          </div>
                          {phoneErr && (
                            <p className="text-danger">
                              S??? ??i???n tho???i kh??ng h???p l???.
                            </p>
                          )}
                        </div>

                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text" id="">
                                M?? s??? thu???*
                              </span>
                            </div>

                            <input
                              value={taxCode}
                              type="text"
                              className="form-control"
                              maxLength={40}
                              onChange={handleTaxCode}
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
                                Qu???n*
                              </label>
                            </div>
                            <select
                              className="custom-select"
                              id="inputGroupSelect01"
                              value={district}
                              onChange={handleDistrict}
                            >
                              <option defaultValue={""}>Ch???n Qu???n/Huy???n</option>
                              {districts.map((district) => (
                                <option
                                  key={district.toString()}
                                  value={district}
                                >
                                  {district}
                                </option>
                              ))}
                            </select>
                            <div className="input-group-prepend ml-3">
                              <label
                                className="input-group-text"
                                htmlFor="inputGroupSelect02"
                              >
                                Th??nh ph???*
                              </label>
                            </div>
                            <select
                              className="custom-select"
                              id="inputGroupSelect02"
                              value={city}
                              onChange={handleCity}
                            >
                              <option value="1">Hanoi</option>
                            </select>
                          </div>
                        </div>

                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text" id="">
                                ?????a ch??? c??? th???*
                              </span>
                            </div>
                            <input
                              value={dedtailAddress}
                              type="text"
                              className="form-control"
                              maxLength={400}
                              onChange={handleDetailAddress}
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
                                M??? c???a*
                              </label>
                            </div>
                            <select
                              className="custom-select"
                              id="inputGroupSelect03"
                              value={timeOpen}
                              onChange={handleTimeOpen}
                            >
                              <option defaultValue={""}>Ch???n gi??? m??? c???a...</option>
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
                                ????ng c???a*
                              </label>
                            </div>
                            <select
                              className="custom-select"
                              id="inputGroupSelect04"
                              value={timeClose}
                              onChange={handleTimeClose}
                            >
                              <option value={""}>Ch???n gi??? ????ng c???a...</option>
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
                                ???nh ?????i di???n c???a salon*
                              </span>
                            </div>
                            {/* <input
                              value={salonImage}
                              type="text"
                              className="form-control"
                              maxLength={2000}
                              onChange={handleSalonImage}
                            /> */}
                            <input type="file" accept=".png, .jpg, .jpeg" onChange={(e) => { 
                            setSalonImage( e.target.files[0])
                           }} />
                          </div>
                        </div>
                        <div className="">
                          <div className="form-group text-left">
                            <label className="pl-2">M?? t??? v??? salon c???a b???n*:</label>
                            <textarea
                              value={salonDescription}
                              type="text"
                              className="form-control"
                              maxLength={2000}
                              onChange={handleSalonDescription}
                              placeholder="Nh???p m?? t??? t???i ????y"
                              style={{ minHeight: "10rem" }}
                            />
                          </div>
                        </div>

                        <div className="d-flex justify-content-center">
                          <button
                            type="submit"
                            style={btnSubmit}
                            onClick={handleSubmit}
                          >
                            ????ng k??
                          </button>
                        </div>

                        <p className="text-center text-muted mt-5 mb-0">
                          B???n ???? c?? t??i kho???n?{" "}
                          <Link to="/login" className="fw-bold text-body">
                            <u>????ng nh???p t???i ????y</u>
                          </Link>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
