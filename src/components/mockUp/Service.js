import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getServiceList,
  resetServiceList,
  updateSelectedService,
} from "../../redux/actions/creators/booking";
import { currencyFormatter } from "../../utils";

import bgImg from "../../assets/barbershopbg.jpg";
import serviceLists from "../../components/mockUp/serviceData.json";
import imageUnavailable from "../../assets/image-unavailable.png";

export default function Service() {
  const { salonId } = useParams();

  const dispatch = useDispatch();
  const serviceList = serviceLists;
  // const { serviceList } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(getServiceList(salonId));

    return () => {
      dispatch(resetServiceList());
    };
  }, [dispatch, salonId]);
  const root = {
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "repeat-y",
    backgroundSize: "100%",
  };

  return (
    <div style={root}>
      <div className="columns">
        <div className="column is-3"></div>
        <div className="column is-6">
          <div
            className="pl-3 pb-3 pr-3 container"
            style={{
              background:
                "url(https://img.freepik.com/free-photo/gray-wall-textures-background_74190-4389.jpg)",
            }}
          >
            <div>
              {/* Salon info */}

              {serviceList?.dataSalon?.map((salon) => (
                <div
                  className="rounded-bottom"
                  style={{
                    background:
                      "url(https://cdn.shopify.com/s/files/1/0123/6218/6809/products/9057-a.jpg?v=1624991103)",
                    border: 1 + "px solid black",
                  }}
                >
                  <div
                    style={{
                      minHeight: "10rem",
                      maxHeight: "15rem",
                    }}
                    className="mb-3"
                  >
                    <img
                      style={{ minHeight: "10rem", maxHeight: "15rem" }}
                      src={salon.image}
                      alt="..."
                    />
                  </div>
                  <div className="pl-3 pb-2 mb-3">
                    <h2
                      className="has-text-weight-bold is-size-3"
                      style={{ color: "#134068" }}
                    >
                      {salon.nameSalon}
                    </h2>
                    <p className="font-weight-bold is-size-5">
                      Open:{" "}
                      <span className="text-danger">
                        Mon-Sun {salon.timeOpen.slice(0, -3)} -{" "}
                        {salon.timeClose.slice(0, -3)}
                      </span>
                    </p>
                    <p className="is-size-5">
                      <span className="font-weight-bold ">Phone number: </span>
                      <span className="text" style={{ color: "#134068" }}>
                        {salon.phone}
                      </span>
                    </p>
                    <p className="is-size-5">
                      <i class="fa-solid fa-location-dot text-secondary"></i>{" "}
                      <span
                        className="font-weight-bold"
                        style={{ color: "#134068" }}
                      >
                        {salon.detailAddress}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Salon service */}
            {serviceList?.data?.map((service) => (
              <div
                className="columns mt-5 mb-5"
                style={{
                  background:
                    "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxa8IOyjyaad_1eWoDAeU2nx9VUUS4jgzgy7LA7ZNErOnYkl9_3nQAjmIGxf6vt7Z15Fs&usqp=CAU)",
                  border: " 1px solid #949494",
                  marginLeft: 10 + "px",
                  borderRadius : "15px",
                  marginRight: 10 + "px",
                }}
              >
                <div className="column is-4">
                  <img src={service.image} style={{ height: "100%", width: "100%  " }}></img>
                </div>
                <div className="column is-5">
                  <h1>
                    <span className="has-text-weight-semibold is-size-3 has-text-link-dark">
                      {service.name}
                    </span>
                    <span className="is-size-4"> - {service.description}</span>
                  </h1>
                  <p className="is-size-5">
                    {service.service_time} minutes -{" "}
                    <span className="has-text-danger-dark">
                      {service.price} vnd
                    </span>
                  </p>
                  <p>{service.content}</p>
                </div>
                <div className="column is-3">
                  <Link
                    to={`/staff/${service.salonId}`}
                    onClick={() =>
                      dispatch(updateSelectedService(service.serviceId))
                    }
                    style={{borderRadius : "15px"}}
                    className="button w-100 is-info"
                  >
                    <span className="has-text-weight-semibold">Book now</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="column is-3"></div>
      </div>
    </div>
  );
}
