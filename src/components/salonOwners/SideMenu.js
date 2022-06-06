import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/creators/auth";
import { Tooltip } from "@mui/material";
export default function SalonDashboard() {
  const menuStyle = {
    height: "100%",
    backgroundColor: "#2e2e2e",

    width: "10%",
    position: "fixed",
    top: 0,
    left: 0,
    overflowX: "hidden",
    fontWeight: "bold",
  };
  const link = {
    fontSize: "20px",
    color: "white",
  };
  // -- SIDE MENU HOVER --
  const changeMouseOver = (e) => {
    e.target.style.color = "rgb(0, 82, 189)";
  };
  const changeMouseOut = (e) => {
    e.target.style.color = "white";
  };
  // -- LOG OUT --
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.loginAccount);
  const handleLogout = () => {
    dispatch(logout("token"));
  };
  return (
    <div style={menuStyle}>
      <aside className="menu">
        <ul className="menu-list">
          <li>
            <Link
              onMouseOver={changeMouseOver}
              onMouseOut={changeMouseOut}
              to="/"
              style={{
                fontSize: "20px",
                paddingLeft: "20px",
                color: "white",
              }}
            >
              {/* <Tooltip title="Order" placement="right"> */}
              <p>
                {" "}
                <i className="fa-solid fa-clipboard-list"></i> Lịch hẹn
              </p>
              {/* </Tooltip> */}
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
              <p>
                {" "}
                <i className="fa-solid fa-shop"></i> Dịch vụ
              </p>
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
              to="/ManageBooking"
              style={link}
            >
              <p>
                {" "}
                <i className="fa-solid fa-book-open-reader"></i> Đặt lịch{" "}
              </p>
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
              <p>
                {" "}
                <i className="fa-solid fa-users"></i> Nhân viên{" "}
              </p>
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
              <p>
                {" "}
                <i className="fa-solid fa-gear"></i> Hồ sơ
              </p>
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
              className="text-white"
              style={{
                fontSize: "20px",
                paddingLeft: "18px",
                color: "white",
              }}
              to="/"
              onClick={handleLogout}
            >
              <p>
                {" "}
                <i className="fa-solid fa-right-from-bracket"></i> Đăng xuất{" "}
              </p>
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}
