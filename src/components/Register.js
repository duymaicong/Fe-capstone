import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { validPassword, validEmail, validPhone } from "../validations/regex";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../redux/actions/creators/auth";

export default function Register() {
  //create useState
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(false);
  const [confirmPwdError, setConfirmPwdError] = useState(false);
  //validate
  const [pwdErr, setPwdErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);

  const { registeredAccount, errMess, successMessage } = useSelector(
    (state) => state.registerAccount
  );

  const dispatch = useDispatch();

  //style
  const root = {
    textAlign: "center",
    paddingTop: "7rem",
    paddingBottom: "7rem",
  };
  const formContent = {
    padding: "5%",
    marginBottom: "2%",
  };

  const btnSubmit = {
    border: "none",
    borderRadius: "0.5rem",
    padding: "1%",
    marginTop: "2rem",
    width: "20%",
    cursor: "pointer",
    background: "#0062cc",
    color: "#fff",
  };

  //function
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleCPassword = (e) => {
    setConfirmPwd(e.target.value);
  };
  const handleFirstname = (e) => {
    setAddress(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleDob = (e) => {
    setDob(e.target.value);
  };

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPwd("");
    setAddress("");
    setName("");
    setPhone("");
    setDob("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPwdErr(false);
    setEmailErr(false);
    setPhoneErr(false);
    setConfirmPwdError(false);
    setError(false);
    const newAccount = {
      account_name: username,
      password: password,
      address: address,
      nameCustomer: name,
      email: email,
      phone: phone,
      birthday: dob,
      role: "customer",
    };
    let pass = true;
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      address === "" ||
      name === "" ||
      phone === "" ||
      dob === ""
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
      dispatch(register(newAccount));
    }
  };

  useEffect(() => {
    if (successMessage) {
      resetForm();
    }
  }, [successMessage]);

  //render screen
  return (
    <div className=" bg-transparent" style={root}>
      <div>
        <h2
          className="fw-normal mb-3 pb-3"
          style={{
            letterSpacing: "1px",
            fontSize: "2.2rem",
            fontWeight: "bold",
          }}
        >
          ????ng k?? t??i kho???n m???i
        </h2>
      </div>
      <div className="messages">
        {error && (
          <div className="error">
            <p className="text-danger">
              B???n vui l??ng ??i???n ?????y ????? th??ng tin c?? nh??n!
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
              {successMessage}: {registeredAccount?.account_name}
            </p>
          </div>
        )}
      </div>
      <div className="container register-form">
        <div className="form">
          <form style={formContent}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    value={username}
                    onChange={handleUsername}
                    placeholder="T??n ????ng nh???p*"
                    maxLength={40}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={handlePassword}
                    placeholder="M???t kh???u*"
                    maxLength={40}
                  />
                  {pwdErr && (
                    <p className="text-danger">
                      M???t kh???u ph???i t??? 8 ?????n 40 k?? t???, trong ???? c?? ch???a ??t nh???t
                      1 ch??? c??i vi???t hoa, m???t ch??? c??i vi???t th?????ng v?? 1 s???
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="password"
                    value={confirmPwd}
                    onChange={handleCPassword}
                    placeholder="Nh???p l???i m???t kh???u*"
                    maxLength={40}
                  />
                  {confirmPwdError && (
                    <p className="text-danger">
                      M???t kh???u kh??ng tr??ng kh???p, vui l??ng ki???m tra l???i!
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={handleEmail}
                    placeholder="Email*"
                    maxLength={40}
                  />
                  {emailErr && (
                    <p className="text-danger">
                      ?????a ch??? email c???a b???n kh??ng ch??nh x??c!
                    </p>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      maxLength={40}
                      value={name}
                      onChange={handleName}
                      placeholder="H??? v?? t??n*"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      maxLength={40}
                      value={phone}
                      onChange={handlePhone}
                      placeholder="S??? di ?????ng*"
                    />
                    {phoneErr && (
                      <p className="text-danger">S??? di ?????ng kh??ng h???p l???</p>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="date"
                      value={dob}
                      onChange={handleDob}
                      placeholder="Ng??y sinh*"
                    />
                  </div>
                  <input
                    className="form-control"
                    type="text"
                    maxLength={40}
                    value={address}
                    onChange={handleFirstname}
                    placeholder="?????a ch???*"
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="mt-4">
                ????? tr??? th??nh salon ?????i t??c c???a website:{" "}
                <Link to="/register_salon" className="text-primary pl-2">
                  ????ng k?? t???i ????y
                </Link>
              </p>
            </div>
            <button style={btnSubmit} onClick={handleSubmit}>
              ????ng k??
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
