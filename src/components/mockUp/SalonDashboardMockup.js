import { Link } from "react-router-dom";
import paperbg from "../../assets/paperbg.jpg";
import bgImg from "../../assets/barbershopbg.jpg";
import salonFixedData from "../salonOwners/DashboardData.json";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";

export default function SalonDashboard() {
  const menuStyle = {
    height: "100%",
    backgroundColor: "rgb(0, 82, 189, 95%)",
    width: "3%",
    position: "fixed",
    top: 0,
    left: 0,
    overflowX: "hidden",
    marginTop: "96px",
  };
  // -- SCROLL SIDE MENU STYLE CHANGE --
  // const [sideMenu, setMenu] = useState({});
  // useEffect(() => {
  //   const handleScroll = () => {
  //     //console.log(window.scrollY);

  //     if (window.scrollY >= 80) {
  //       setMenu({
  //         height: "100%",
  //         backgroundColor: "rgb(0, 82, 189, 95%)",
  //         width: "3%",
  //         position: "fixed",
  //         top: 0,
  //         left: 0,
  //         overflowX: "hidden",
  //         marginTop: "64px",
  //       });
  //     } else {
  //       setMenu({
  //         height: "100%",
  //         backgroundColor: "rgb(0, 82, 189, 95%)",
  //         width: "3%",
  //         position: "fixed",
  //         top: 0,
  //         left: 0,
  //         overflowX: "hidden",
  //         marginTop: "96px",
  //       });
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  // }, []);

  // -- SIDE MENU HOVER --
  const changeMouseOver = (e) => {
    e.target.style.color = "rgb(0, 82, 189)";
  };
  const changeMouseOut = (e) => {
    e.target.style.color = "white";
  };

  const link = {
    fontSize: "20px",
    color: "white",
  };
  const root = {
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "repeat-y",
    backgroundSize: "100%",
  };
  const fakeDashboardData = salonFixedData;

  // -- TABS --
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div style={menuStyle}>
        <aside className="menu">
          <ul className="menu-list">
            <li>
              <Link
                onMouseOver={changeMouseOver}
                onMouseOut={changeMouseOut}
                to="/SalonDashboard"
                style={{
                  fontSize: "20px",
                  paddingLeft: "20px",
                  color: "white",
                }}
              >
                <i className="fa-solid fa-clipboard-list"></i>
              </Link>
            </li>
            <div
              className="is-divider"
              style={{ width: "80%", color: "grey", margin: "auto" }}
            ></div>
            <li>
              <Link
                onMouseOver={changeMouseOver}
                onMouseOut={changeMouseOut}
                to="/manage_service"
                style={link}
              >
                <i className="fa-solid fa-shop"></i>
              </Link>
            </li>
            <div
              className="is-divider"
              style={{ width: "80%", color: "grey", margin: "auto" }}
            ></div>

            <li>
              <Link
                onMouseOver={changeMouseOver}
                onMouseOut={changeMouseOut}
                to="/SalonStaff"
                style={link}
              >
                <i className="fa-solid fa-users"></i>
              </Link>
            </li>
            <div
              className="is-divider"
              style={{ width: "80%", color: "grey", margin: "auto" }}
            ></div>

            <li>
              <Link
                onMouseOver={changeMouseOver}
                onMouseOut={changeMouseOut}
                to="/SalonBusinessInfo"
                style={{
                  fontSize: "20px",
                  paddingLeft: "18px",
                  color: "white",
                }}
              >
                <i className="fa-solid fa-gear"></i>
              </Link>
            </li>
            <div
              className="is-divider"
              style={{ width: "80%", color: "grey", margin: "auto" }}
            ></div>
          </ul>
        </aside>
      </div>
      <div style={root}>
        {/* logo */}
        {/* <div>
          <nav
            className="navbar navbar-expand-lg is-fixed-top fixed-top font-weight-bold"
            style={{ backgroundColor: "rgb(0,0,0,90%)" }}
          >
            <div className="justify-content-center navbar-collapse text">
              <ul className="menu navbar-nav ml-5">
                <li className="nav-item">
                  <Link to="/about">
                    <img
                      src={logoImg}
                      alt="logo"
                      style={{ width: "100%", height: "5rem" }}
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div> */}

        <div
          className="columns"
          style={{
            minHeight: "400px",
            // , marginTop: "96px"
          }}
        >
          <div className="column is-2"></div>
          <div
            className="column is-8"
            style={{
              background: "url(" + paperbg + ")",
              padding: 0,
              marginTop: "30px",
              marginBottom: "30px",
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
                  <Tab label="Current Order" value="1" />
                  <Tab label="History" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                {" "}
                <div className="mb-5">
                  <input
                    style={{ width: "400px" }}
                    className="input is-normal"
                    placeholder="Normal input"
                    type="date"
                  ></input>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        <p title="stt">#</p>
                      </th>
                      <th>
                        <p title="Order">Order</p>
                      </th>
                      <th>
                        <p title="CustomerName">Customer's name</p>
                      </th>
                      <th>
                        <p title="Time">Time</p>
                      </th>
                      <th>
                        <p title="Stylist">Stylist</p>
                      </th>
                      <th>
                        <p title="Status">Status</p>
                      </th>
                      <th className="has-text-centered"  style={{minWidth: "15rem"}}>
                        <p title="Actions">Actions</p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fakeDashboardData[0]?.map((element) => (
                      <tr>
                        <th>{element.stt}</th>
                        <td>{element.order}</td>
                        <td>{element.customerName}</td>
                        <td>{element.time}</td>
                        <td>{element.stylist}</td>
                        <td className="has-text-link">{element.status}</td>
                        <td className="has-text-centered">
                          <button className="button is-rounded is-danger">
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabPanel>
              <TabPanel value="2">
                <div className="mb-5">
                  <input
                    style={{ width: "400px" }}
                    className="input is-normal"
                    placeholder="Normal input"
                    type="date"
                  ></input>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        <p title="stt">#</p>
                      </th>
                      <th>
                        <p title="Order">Order</p>
                      </th>
                      <th>
                        <p title="CustomerName">Customer's name</p>
                      </th>
                      <th>
                        <p title="Time">Time</p>
                      </th>
                      <th>
                        <p title="Stylist">Stylist</p>
                      </th>
                      <th>
                        <p title="Status">Status</p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fakeDashboardData[1]?.map((element) => (
                      <tr>
                        <th>{element.stt}</th>
                        <td>{element.order}</td>
                        <td>{element.customerName}</td>
                        <td>{element.time}</td>
                        <td>{element.stylist}</td>
                        {element.status === "Finished" && (
                          <td className="has-text-success">{element.status}</td>
                        )}
                        {element.status === "Cancelled" && (
                          <td className="has-text-danger">{element.status}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabPanel>
            </TabContext>
          </div>
          <div className="column is-2"></div>
        </div>
      </div>
    </div>
  );
}
