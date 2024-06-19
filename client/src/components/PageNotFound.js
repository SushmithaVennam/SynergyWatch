import React, { useState } from "react";
import MyNavbar from "./Navbar";
import SideBar from "./SideBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo_dark from "../resources/PFXWatchBlack.png";
import "./VideoGrid.css";
import "./Mainpage.css";

const PageNotFound = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const failureImage =
    "https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png";

  localStorage.setItem("theme", theme);

  const ToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={theme}>
      <MyNavbar
        props={{
          toggleTheme: ToggleTheme,
          Theme: theme,
        }}
      />
      <div className="d-flex flex-row container-fluid">
        <div className="col-md-3 ">
          <SideBar props={{ srcpage: "notFound" }} />
        </div>
        <Container>
          <Row className="vh-100 justify-content-md-center">
            <Col display="flex" alignItems="center">
              <div className="d-flex flex-column align-items-md-center">
                <img
                  src={failureImage}
                  alt="page not found"
                  style={{ width: "500px", height: "400px" }}
                />
                <h1>Page Not Found</h1>
                <p>We are sorry, the page you requested could not be found.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default PageNotFound;
