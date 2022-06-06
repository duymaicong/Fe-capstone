import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const root = {
    backgroundColor: "black",
  };
  const social = {
    fontSize: "1.7rem",
  };
  const textColor = {
    color: "#a47d5e",
  };
  return (
    <div style={root}>
      <footer className="text-center text-lg-start text-white">
        {/* Section: Social media */}
        <section className="justify-content-center justify-content-lg-between p-4">
          {/* Left */}
          <div className="me-1 d-none d-lg-block">
            <Link className="pr-4 text-reset" to="/">
              Privacy policy
            </Link>
            <Link className="pr-4 text-reset" to="/">
              Terms of Use
            </Link>
            <Link className="text-reset" to="/">
              Site Map
            </Link>
          </div>
          {/* Left */}

          {/* Right */}

          {/* Right */}
        </section>
        {/* Section: Social media */}

        {/* Section: Links  */}
        <section className="">
          <div className="container text-left text-md-start mt-5">
            {/* Grid row */}
            <div className="row mt-3">
              {/* Grid column */}
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                {/* Content */}
                <h6 className="text-uppercase fw-bold mb-4" style={textColor}>
                  <i className="fas fa-gem me-3"></i> House of Gentlement
                </h6>
                <p>
                  Here you can use rows and columns to organize your footer
                  content. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit.
                </p>
              </div>
              {/* Grid column */}

              {/* Grid column */}
              <div
                className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4"
                style={social}
              >
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">We're social</h6>
                <p>
                  <Link to="/" className="text-reset">
                    <i className="fa-brands fa-facebook-square"></i>
                  </Link>
                  <Link to="/" className="text-reset col-xl-2">
                    <i className="fa-brands fa-instagram-square"></i>
                  </Link>
                  <Link to="/" className="text-reset">
                    <i className="fa-brands fa-github-square"></i>
                  </Link>
                </p>
              </div>
              {/* Grid column */}

              {/* Grid column */}
              <div className="col-md-3 col-lg-2 col-xl- mx-auto mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">Our Location</h6>
                <p style={textColor}>Hanoi</p>
                <p>
                  <Link to="/" className="text-reset">
                    FPT University, Hoa Lac, Thach That, Ha Noi
                  </Link>
                </p>
                <p>
                  Tel: <span style={textColor}>+84 123 456 78</span>
                </p>
                <p style={textColor}>duymc@fpt.edu.vn</p>
              </div>
              {/* Grid column */}

              {/* Grid column */}
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i className="fas fa-home me-3 pr-2"></i>Hoa Lac, Ha Noi, Viet
                  Nam
                </p>
                <p>
                  <i className="fas fa-envelope me-3 pr-2"></i>
                  <span style={textColor}>duymc@fpt.edu.vn</span>
                </p>
                <p>
                  <i className="fas fa-phone me-3 pr-2"></i>
                  <span style={textColor}>+84 123 456 78</span>
                </p>
              </div>
              {/* Grid column */}
            </div>
            {/* Grid row */}
          </div>
        </section>
        {/* Section: Links  */}

        {/* Copyright */}
        <div className="text-center p-4">
          © 2021 Copyright:{" "}
          <Link className="text-reset fw-bold" to="/">
            Gentlement - 2022 | SWP490_G11 Team - For Gentlement with Attitude
          </Link>
        </div>
        {/* Copyright */}
      </footer>
      {/* Footer */}
    </div>
  );
}
