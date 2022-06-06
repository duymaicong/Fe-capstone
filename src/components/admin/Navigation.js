import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/creators/auth";

const title = {
  fontSize: "3.8rem",
  color: "#c5a85b",
  fontFamily: 'Parisienne',
};

export default function Navigation() {
  const [navbar, setNavbar] = useState({
    backgroundColor: "#202124",
  });
  const [menu, setMenu] = useState({
    fontSize: "1.2rem",
    color: "white",
  });
  const [sign, setSign] = useState({
    color: "white",
  });
  const [logo, setLogo] = useState({ width: "100%", height: "5rem" });
  const { account } = useSelector((state) => state.loginAccount);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout("token"));
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg is-fixed-top fixed-top font-weight-bold"
        style={navbar}
      >
        <div className="justify-content-center navbar-collapse text row">
          <div className="col-2">
            <ul className="menu navbar-nav ml-5" style={menu}>
              <li className="nav-item">
                <Link to="/about">
                  <img src={logoImg} alt="logo" style={logo} />
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-8 text-center" style={title}>
            <h2>House of Gentlemen</h2>
          </div>
          <div className="col-2 row">
            <div className="col-6"></div>
            <div className="col-6">
              {account ? (
                <ul className="menu navbar-nav fixed-right" style={sign}>
                  <li className="nav-item p-1">
                    <Link className="text-reset" to="/">
                      <button
                        className="button is-dark is-outlined is-inverted"
                        onClick={handleLogout}
                      >
                        Đăng xuất
                      </button>
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="menu navbar-nav fixed-right" style={sign}>
                  <li className="nav-item p-1">
                    <Link className="text-reset" to="/register">
                      <button className="button is-dark">Sign up</button>
                    </Link>
                  </li>
                  <li className="nav-item p-1">
                   
                  </li>
                  <li className="nav-item p-1">
                    <Link className="text-reset" to="/login">
                      <button className="button is-dark is-outlined is-inverted">
                        Log in
                      </button>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
