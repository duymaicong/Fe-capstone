import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import { logout } from "../../redux/actions/creators/auth";

export default function Navigation() {
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.loginAccount);

  const handleLogout = () => {
    dispatch(logout("token"));
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg is-fixed-top fixed-top font-weight-bold"
        style={{ backgroundColor: "rgb(0,0,0,90%)" }}
      >
        <div
          className="justify-content-center navbar-collapse text"
          style={{ paddingLeft: "35%" }}
        >
          <ul className="menu navbar-nav ml-5">
            <li className="nav-item">
              <Link to="../components/about">
                <img
                  src={logoImg}
                  alt="logo"
                  style={{ width: "100%", height: "90px" }}
                />
              </Link>
            </li>
          </ul>{" "}
          {account ? (
            <ul
              className="menu navbar-nav fixed-right"
              style={{ color: "white", positon: "right", paddingLeft: "60%" }}
            >
              <li className="nav-item p-1">
                <button
                  className="button is-dark  is-outlined is-inverted"
                  onClick={handleLogout}
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
                </button>
              </li>
            </ul>
          ) : (
            <></>
          )}
        </div>
      </nav>
    </div>
  );
}
