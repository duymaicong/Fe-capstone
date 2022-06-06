import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getSalonList,
  resetSalonList,
  updateSelectedSalonId,
} from "../redux/actions/creators/booking";
import imageUnavailable from "../assets/image-unavailable.png";

export default function HomePage() {
  const dispatch = useDispatch();
  const salonList = [
    {
      phone: "012 512 5372",
      salonId: "1",
      image:
        "http://cdn-img-v2.webbnc.net/uploadv2/web/12/12589/product/2019/05/30/02/00/1559181658_salon-toc-dep-1.jpg?v=4",
      nameSalon: "Hiếu's salon",
      detailAddress: "Hoàn Kiếm, Hà Nội",
      detailSalon:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.",
      openDay: "Mon - Fri",
    },
    {
      phone: "123",
      salonId: "2",
      image:
        "https://images.foody.vn/res/g13/125249/prof/s640x400/foody-mobile-hairsalon2-jpg-536-635617565819314287.jpg",
      nameSalon: "Cây kéo vàng",
      detailAddress: "Hoàn Kiếm, Hà Nội",
      detailSalon:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.",
      openDay: "Mon - Fri",
    },
    {
      phone: "123",
      salonId: "3",
      image: "",
      nameSalon: "Vũ's salon",
      detailAddress: "Hoàn Kiếm, Hà Nội",
      detailSalon:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.",
      openDay: "Mon - Fri",
    },
    {
      phone: "123",
      salonId: "4",
      image:
        "https://isalon.vn/tin-tuc/wp-content/uploads/2019/01/hairsalon-1068x713.jpg",
      nameSalon: "Duy's salon",
      detailAddress: "Hoàn Kiếm, Hà Nội",
      detailSalon:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.",
      openDay: "Mon - Fri",
    },
    {
      phone: "123",
      salonId: "5",
      image:
        "https://images.foody.vn/res/g13/125249/prof/s640x400/foody-mobile-hairsalon2-jpg-536-635617565819314287.jpg",
      nameSalon: "Cây kéo vàng",
      detailAddress: "Hoàn Kiếm, Hà Nội",
      detailSalon:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.",
      openDay: "Mon - Fri",
    },
  ];
  // const { salonList } = useSelector((state) => state.salon);

  useEffect(() => {
    dispatch(getSalonList());

    return () => {
      dispatch(resetSalonList());
    };
  }, [dispatch]);

  return (
    <div className="p-5">
      <div className="card-columns">
        {salonList?.map((salon) => (
          <div
            className="card m-2 rounded"
            style={{ width: "33rem", height: "40rem" }}
            key={salon.salonId}
          >
            <div className="">
              <img
                className="card-img-top rounded-top mb-2 border-0"
                src={salon.image ? salon.image : imageUnavailable}
                alt="Title"
                style={{
                  width: "100%",
                  height: "25rem",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{salon.nameSalon}</h5>
                <p className="card-text">
                  <span className="font-weight-bold">Phone:</span> {salon.phone}
                </p>
                <p className="card-text">
                  <span className="font-weight-bold">Address:</span>{" "}
                  {salon.detailAddress}
                </p>
                <Link
                  to={`/services/${salon.salonId}`}
                  className="btn btn-primary"
                  onClick={() => dispatch(updateSelectedSalonId(salon.salonId))}
                >
                  Book now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
