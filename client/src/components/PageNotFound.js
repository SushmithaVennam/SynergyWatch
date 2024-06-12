import React, { useState } from "react";
import MyNavbar from "./Navbar";
import Sidebar from "./Sidebar";
import Button from "react-bootstrap/Button";
import logo_dark from "../resources/PFXWatchBlack.png";
import "./VideoGrid.css";
import "./Mainpage.css";

const PageNotFound = (props) => {
  const [showPay, setshowPay] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const notconnected =
    theme === "light"
      ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
      : "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png";

  localStorage.setItem("theme", theme);

  const ToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleClosePay = () => {
    setshowPay(false);
  };

  return (
    <div className={theme}>
      <section className="nav_bar_component">
        <MyNavbar
          props={{
            toggleTheme: ToggleTheme,
            Theme: theme,
          }}
        />
      </section>
      <section className={`container-fluid`}>
        <div className="row">
          <div className="col-md-3">
            <Sidebar props={{ srcpage: "notFound" }} />
          </div>
          <div className={`col-md-9 container`}>
            {showPay && (
              <section className="Banner">
                <div>
                  <div className="d-flex w-100 justify-content-between">
                    <img
                      alt="logo"
                      src={logo_dark}
                      width="100px"
                      height="25px"
                    ></img>
                    <Button
                      onClick={handleClosePay}
                      variant={`light`}
                      size="sm"
                    >
                      X
                    </Button>
                  </div>
                  <p className="normalText ps-1">
                    Buy PFX watch Premium prepaid plans with UPI
                  </p>
                  <Button variant={`outline-dark`} size="sm" className="ms-1">
                    GET IT NOW
                  </Button>
                </div>
              </section>
            )}

            <div className="thumbnail_container">
              <section className="thumbnails_layout">
                <div className="container">
                  <div className="row">
                    <div className="d-flex flex-column align-items-center">
                      <img
                        src={notconnected}
                        alt="Page not found"
                        style={{ width: "500px", height: "400px" }}
                      />
                      <h3> The Page you are looking for does not exist</h3>
                      <Button>Go Home</Button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default PageNotFound;
