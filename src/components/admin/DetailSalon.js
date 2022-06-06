import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SalonList from "./SalonList.json";

import paperbg from "../../assets/paperbg.jpg";
import bgImg from "../../assets/barbershopbg.jpg";
import patterbg from "../../assets/patterbg.svg";
import imageUnavailable from "../../assets/image-unavailable.png";

export default function ManageService() {
  const fakeData = SalonList.data[0];
  const root = {
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "repeat-y",
    backgroundSize: "100%",
  };
  var status = 0;
  const changeStatus = () => {
    if (status === 0) {
      status = 1;
    } else if (status === 1) {
      status = 0;
    }
    console.log(status + " status");
  };
  return (
    <div style={root}>
      <div className="columns">
        <div className="column is-2"></div>{" "}
        <div
          className="column is-8 p-0 mt-5 mb-5"
          style={{ backgroundImage: "url(" + paperbg + ")" }}
        >
          {" "}
          <div
            className=""
            // style={{ background: "url(" + patterbg + ")" }}
            key={fakeData.salonId}
          >
            <div className="columns mt-0 pt-0">
              <div className="column is-6" style={{ paddingTop: "0px" }}>
                <img
                  style={{ height: "100%", width: "auto" }}
                  src={fakeData.image}
                  alt="..."
                />
              </div>
              <div className="column is-6 pt-5">
                <div className="pb-2 mb-3">
                  <h2
                    style={{ color: "#134068" }}
                    className="is-size-1 has-text-weight-semibold"
                  >
                    {fakeData.nameSalon}
                  </h2>
                  <p className="is-size-5 font-weight-bold">
                    Open:{" "}
                    <span className="text-danger">
                      Mon-Sun {fakeData.timeOpen.slice(0, -3)} -{" "}
                      {fakeData.timeClose.slice(0, -3)}
                    </span>
                  </p>
                  <p>
                    <span className="is-size-5 font-weight-bold">
                      Phone number:{" "}
                    </span>
                    <span
                      className="is-size-5 is-underlined"
                      style={{ color: "#134068" }}
                    >
                      {fakeData.phone}
                    </span>
                  </p>
                  <p>
                    <i className="fa-solid fa-location-dot text-secondary"></i>{" "}
                    <span
                      className="is-size-5 font-weight-bold"
                      style={{ color: "#134068" }}
                    >
                      {fakeData.detailAddress}
                    </span>
                  </p>
                  <p>{fakeData.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="has-text-centered">
            <div
              style={{
                background: "url(" + paperbg + ")",
                // backgroundColor :"#f5f4eb",
                padding: 0,
                marginTop: "30px",
                marginBottom: "30px",
              }}
            >
              <h1 className="is-size-1 mt-5 mb-5">
                Salon Business Information
              </h1>
              <div className="columns">
                <div className="column is-6 has-text-right">
                  <p className="is-size-4">Salon Id : </p>
                  <p className="is-size-4">Salon owner : </p>
                  <p className="is-size-4">Tax code : </p>
                  <p className="is-size-4">Phone number : </p>
                  <p className="is-size-4">Time open : </p>
                  <p className="is-size-4">Time close : </p>
                  <p className="is-size-4">District : </p>
                  <p className="is-size-4">City : </p>
                  <p className="is-size-4">Email : </p>
                </div>
                <div className="column is-6 has-text-left">
                  <p className="is-size-4">{fakeData.salonId}</p>
                  <p className="is-size-4"> {fakeData.nameOwner}</p>
                  <p className="is-size-4 has-text-primary has-text-weight-bold">
                    {fakeData.taxCode}
                  </p>
                  <p className="is-size-4">{fakeData.phone}</p>
                  <p className="is-size-4 has-text-danger">
                    {fakeData.timeOpen}
                  </p>
                  <p className="is-size-4 has-text-danger">
                    {fakeData.timeClose}
                  </p>
                  <p className="is-size-4">{fakeData.district}</p>
                  <p className="is-size-4">{fakeData.city}</p>
                  <p className="is-size-4 is-underlined">{fakeData.email}</p>
                </div>
              </div>
            </div>
            <Link to="/ManageSalon" className="button is-info mr-5 is-rounded">
              Back
            </Link>
            {status === 0 && (
              <button
                onClick={changeStatus}
                className="button is-warning has-text-white is-rounded"
              >
                Deactive
              </button>
            )}
            {status === 1 && (
              <button
                onClick={changeStatus}
                className="button is-success has-text-white is-rounded"
              >
                Active
              </button>
            )}
          </div>
        </div>{" "}
        <div className="column is-2"></div>
      </div>
    </div>
  );
}
