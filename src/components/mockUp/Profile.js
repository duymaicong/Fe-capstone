import React, { useState } from "react";
import { minHeight, styled } from "@mui/system";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import ReservationTable from "../tables/ReservationTable";
import bgImg from "../../assets/barbershopbg.jpg";
import videobg from "../../assets/videobg.jpg";
import paperbg from "../../assets/paperbg.jpg";

export default function Profile() {
  const root = {
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "repeat-y",
    backgroundSize: "100%",
  };
  // -- TABS --
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const reservationMockData = [
    {
      id: 1,
      serviceName: "Undercut",
      price: 120000,
      timeUse: "30-40 minutes",
      timeRegister: "2022-03-05T14:48:00.000Z",
      status: "Booked",
      staffName: "Nguyen Van A",
    },
  ];

  const historyMockData = [
    {
      id: 1,
      serviceName: "Undercut",
      price: 120000,
      timeUse: "30-40 minutes",
      timeRegister: "2022-03-25T14:48:00.000Z",
      status: "Finished",
      staffName: "Nguyen Van A",
    },
    {
      id: 2,
      serviceName: "Undercut",
      price: 120000,
      timeUse: "30-40 minutes",
      timeRegister: "2022-03-15T14:48:00.000Z",
      status: "Cancelled",
      staffName: "Nguyen Van A",
    },
  ];

  return (
    <div style={root}>
      <div className="columns" style={{ minHeight: "800px" }}>
        <div className="column is-1"></div>
        <div className="column is-10">
          <div className="columns mt-3">
            <div
              className="column is-3 mt-0 mb-0"
              style={{
                height: 400 + "px",
                background: `url(${paperbg})`,
                marginTop: "30px",
                boxShadow: "1px 1px 20px grey",
              }}
            >
              <h1>{}</h1>
            </div>
            <div className="column is-1"></div>
            <div
              className="column is-8 mt-0 mb-0 p-0"
              style={{
                height: 400 + "px",
                background: `url(${videobg})`,
                marginTop: "30px",
                boxShadow: "1px 1px 20px grey",
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
                    <Tab label="Current reservation" value="1" />
                    <Tab label="History" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>
                          <p title="stt">#</p>
                        </th>
                        <th>
                          <p title="serviceName">Service</p>
                        </th>
                        <th>
                          <p title="price">Price</p>
                        </th>
                        <th>
                          <p title="timeUse">Service time</p>
                        </th>
                        <th>
                          <p title="timeRegister"> Date</p>
                        </th>
                        <th>
                          <p title="status"> Status</p>
                        </th>
                        <th>
                          <p title="staffName"> Staff</p>
                        </th>
                        <th className="has-text-centered"  style={{minWidth: "15rem"}}>
                          <p title="Actions">Actions</p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservationMockData?.map((element) => (
                        <tr key={element.id}>
                          <th scope="row">{element.id}</th>
                          <td>{element.serviceName}</td>
                          <td>{element.price}</td>
                          <td>{element.timeUse}</td>
                          <td>{element.timeRegister}</td>{" "}
                          <td className="has-text-info">{element.status}</td>
                          <td>{element.staffName}</td>
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
                  {" "}
                  <table className="table">
                    <thead>
                      <tr>
                        <th>
                          <p title="stt">#</p>
                        </th>
                        <th>
                          <p title="serviceName">Service</p>
                        </th>
                        <th>
                          <p title="price">Price</p>
                        </th>
                        <th>
                          <p title="timeUse">Service time</p>
                        </th>
                        <th>
                          <p title="timeRegister"> Date</p>
                        </th>
                        <th>
                          <p title="status"> Status</p>
                        </th>
                        <th>
                          <p title="staffName"> Staff</p>
                        </th>
                        <th className="has-text-centered"  style={{minWidth: "15rem"}}>
                          <p title="Actions">Actions</p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {historyMockData?.map((element) => (
                        <tr key={element.id}>
                          <th scope="row">{element.id}</th>
                          <td>{element.serviceName}</td>
                          <td>{element.price}</td>
                          <td>{element.timeUse}</td>
                          <td>{element.timeRegister}</td>{" "}
                          {element.status === "Finished" && (
                            <td className="has-text-success is-size-4 has-text-weight-bold has-text-centered">
                              <i className="fa-solid fa-check"></i>
                            </td>
                          )}{" "}
                          {element.status === "Cancelled" && (
                            <td className="has-text-danger is-size-4 has-text-weight-bold has-text-centered">
                              <i class="fa-solid fa-xmark"></i>
                            </td>
                          )}
                          <td>{element.staffName}</td>
                          <td className="has-text-centered">
                            <button className="button is-rounded is-primary">
                              <i class="fa-solid fa-arrow-rotate-right"></i>{" "}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TabPanel>
              </TabContext>
            </div>
          </div>
        </div>
      </div>
      <div className="column is-1"></div>
    </div>
  );
}
