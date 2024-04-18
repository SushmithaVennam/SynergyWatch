import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import "./Navbar.css";
import "remixicon/fonts/remixicon.css";
import { useState } from "react";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BasicExample(props) {
  const LogoutHandler = () => {
    Cookies.remove("jwt_token");
    window.location.href = "/login";
  };
  console.log(props.props.BGcolor);
  return (
    <Navbar expand="lg" className={props.props.BGcolor}>
      <Container>
        <Navbar.Brand>
          <span className="span-class">SYNERGY</span>
          <span
            className={
              props.props.BGcolor !== "bg-black" ? "text-dark" : "text-light"
            }
          >
            WATCH
          </span>
        </Navbar.Brand>
        <div className="icons">
          <div>
            <Button
              variant="outline-info"
              size="sm"
              onClick={props.props.changeMode}
            >
              <i
                className={
                  props.props.BGcolor !== "bg-black"
                    ? "ri-moon-fill"
                    : "ri-sun-fill"
                }
              ></i>
            </Button>
          </div>
          <div>
            <i className="ri-user-fill"></i>
          </div>
          <div>
            <Button variant="outline-info" size="sm" onClick={LogoutHandler}>
              Logout
            </Button>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
