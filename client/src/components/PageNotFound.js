import React, { useState } from "react";
import MyNavbar from "./Navbar";
import Sidebar from "./SideBar";
import Button from "react-bootstrap/Button";
import logo_dark from "../resources/PFXWatchBlack.png";
import "./VideoGrid.css";
import "./Mainpage.css";

const PageNotFound = (props) => {
  const [showPay, setshowPay] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const failureImage =
    "https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png";

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
            <div className="thumbnail_container">
              <section className="thumbnails_layout">
                <div className="container">
                  <div className="row">
                    <div className="d-flex flex-column align-items-center">
                      <img
                        src={failureImage}
                        alt="page not found"
                        style={{ width: "500px", height: "400px" }}
                      />
                      <h1>Page Not Found</h1>
                      <p>
                        We are sorry, the page you requested could not be found.
                      </p>
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
