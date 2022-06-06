import React from "react";

import titlebig from "../assets/titlebig.svg";
import Background from "../assets/headerhome.jpg";
import { useSelector } from "react-redux";

export default function Header() {
  const root = {};
  const masthead = {
    backgroundImage: `url(${Background})`,
    backgroundColor: "black",
    paddingTop: "10rem",
    paddingBottom: "8rem",
    textAlign: "center",
    backgroundRepeat: "no-repeat",
    background_attchment: "scroll",
    backgroundPosition: "top",
    backgroundSize: "cover",
  };
  const mastheadHeading = {
    fontSize: "7rem",
  };
  const mastheadSubheading = {
    with: "50rem",
    height: "6rem", 
  };
  const mastheadSubheadingBottom = {
    with: "50rem",
    height: "6rem",
    transform: "rotate(180deg)",
  };

  const { account } = useSelector((state) => state.loginAccount);

  React.useEffect(() => {
    console.log(account);
  }, [account]);

  return (
    <div style={root}>
      <div>
        <header style={masthead}>
          <div className="container">
            <div>
              <img style={mastheadSubheading} src={titlebig} />
            </div>
            <div className="text-white">
              <h1 style={mastheadHeading}>House of Gentlemen</h1>
              <h4>AN ESTABLISHMENT BY THE GENTLEMEN WITH ATTITUDE</h4>
            </div>
            <div>
              <img style={mastheadSubheadingBottom} src={titlebig} />
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
