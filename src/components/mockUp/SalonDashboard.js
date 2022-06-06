import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/creators/auth";

export default function SalonDashboard() {
  const [navbar, setNavbar] = useState({});
  const [menu, setMenu] = useState({
    fontSize: "1.2rem",
    color: "white",
    paddingLeft: "22%",
  });
  const [sign, setSign] = useState({
    color: "white",
    positon: "right",
    paddingLeft: "20%",
  });
  const [logo, setLogo] = useState({ width: "100%", height: "5rem" });
  const { account } = useSelector((state) => state.loginAccount);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout("token"));
  };
  const root = {
    height: "100%",
    backgroundColor: "rgb(0, 82, 189, 60%)",
    width: "4.5%",
    position: "fixed",
    top: 0,
    left: 0,
    overflowX: "hidden",
    paddingTop: "7rem",
  };
  const link = {
    // padding: "6px 8px 6px 16px",
    // textDecoration: "none",
    // fontSize: "1.25rem",
    // display: "block",
    fontSize: "30px",
    color: "white",
  };

  return (
    <div style={root}>
      <div>
        <nav
          className="navbar navbar-expand-lg is-fixed-top fixed-top font-weight-bold"
          style={navbar}
        >
          <div className="justify-content-center navbar-collapse text">
            <ul className="menu navbar-nav ml-5" style={menu}>
              <li className="nav-item p-4">
                <Link className="text-reset" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item p-4 ">
                <Link className="text-reset" to="/favorite">
                  Favorite
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about">
                  <img src={logoImg} alt="logo" style={logo} />
                </Link>
              </li>
              <li className="nav-item p-4">
                <Link className="text-reset" to="/history">
                  History
                </Link>
              </li>
              <li className="text-reset nav-item p-4">
                <Link className="text-reset" to="/profile">
                  Profile
                </Link>
              </li>
            </ul>
            {account ? (
              <ul className="menu navbar-nav fixed-right" style={sign}>
                <li className="nav-item p-1">
                  <Link className="text-reset" to="/">
                    <button className="border-0 rounded" onClick={handleLogout}>
                      Logout
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
                  <div
                    class="vl"
                    style={{
                      borderLeft: 2 + "px solid white",
                      height: 40 + "px",
                    }}
                  ></div>
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
        </nav>
      </div>
      <aside className="menu">
        <ul className="menu-list">
          <li>
            <Link
              to="/"
              style={{ fontSize: "30px", paddingLeft: "27px", color: "white" }}
            >
              <i className="fa-solid fa-clipboard-list"></i>
            </Link>
          </li>
          <li>
            <Link to="/manage_service" style={link}>
              <i className="fa-solid fa-shop"></i>
            </Link>
          </li>
          <li>
            <Link to="/" style={link}>
              <i className="fa-solid fa-users"></i>
            </Link>
          </li>
          <li>
            <Link to="/" style={link}>
              <i className="fa-solid fa-gear"></i>
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}
