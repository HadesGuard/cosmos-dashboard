import { Link } from "react-router-dom";
import "./index.scss";
import Logo from "../../assets/logo.png";
import { useAuth } from "../AuthContext";
import BasicMenu from "../BasicMenu/BasicMenu";

export const Header = () => {
  const auth = useAuth();

  return (
    <div
      className="navigation position-absolute w-100 rounded-bottom-3 rounded-bottom-sm-4 navbar-val"
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      <nav
        className="navbar navbar-expand-xl px-2"
        aria-label="Offcanvas navbar large"
      >
        <div className="container px-3 py-2">
          <a className="navbar-brand p-1" href="/">
            <img src={Logo} height="64" alt="logo" />
            <strong className="text-body-emphasis fw-bolder fst-italic text-2xl">
              {" "}
              ValidatorVN{" "}
            </strong>
          </a>

          <button
            className="navbar-toggler collapsed"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar2"
            aria-controls="offcanvasNavbar2"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="toggler-icon top-bar"></span>
            <span className="toggler-icon middle-bar"></span>
            <span className="toggler-icon bottom-bar"></span>
          </button>

          <div
            className="offcanvas offcanvas-bottom rounded-top-5 h-auto"
            tabIndex={-1}
            id="offcanvasNavbar2"
            aria-labelledby="offcanvasNavbar2Label"
          >
            <div className="offcanvas-header px-4 pt-4 pb-4">
              <h5 className="offcanvas-title m-0" id="offcanvasNavbar2Label">
                <a className="navbar-brand px-2 py-1">
                  {/* href="javascript:;" */}
                  {/* <!-- <img src="./assets/logo/logo.png" height="32" alt="logo"> --> */}
                  <strong className="text-body-emphasis fw-bolder fst-italic ">
                    {" "}
                    ValidatorVN{" "}
                  </strong>
                </a>
              </h5>
              <button
                type="button"
                className="btn-close text-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div className="offcanvas-body">
              <ul className="navbar-nav align-items-xl-center justify-content-center flex-grow-1 column-gap-4 row-gap-4">
                <li
                  className="nav-item ms-xl-auto"
                  data-bs-dismiss="offcanvas"
                  style={{ cursor: "pointer" }}
                >
                  <a
                    // href="javascript:;"
                    // onclick="scrollToSection('#home')"
                    className="nav-link rounded-3 px-3 text-lg fw-semibold leading-6 text-body-emphasis bg-body-secondary-hover"
                  >
                    Introduction
                  </a>
                </li>

                <li className="nav-item" data-bs-dismiss="offcanvas">
                  <a
                    // href="javascript:;"
                    // onclick="scrollToSection('#projects')"
                    className="nav-link rounded-3 px-3 text-lg fw-semibold leading-6 text-body-emphasis bg-body-secondary-hover"
                    style={{ cursor: "pointer" }}
                  >
                    Dashboard
                  </a>
                </li>

                <li className="nav-item ms-xl-auto" data-bs-dismiss="offcanvas">
                  {auth.isAuthenticated ? (
                    <BasicMenu onLogout={auth.logout} />
                  ) : (
                    <Link
                      to="/sign-in"
                      className="btn btn-primary text-white btn-lg rounded-3 px-3 text-lg fw-semibold leading-6 w-100"
                    >
                      Sign In
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
