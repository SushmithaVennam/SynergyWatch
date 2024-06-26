import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import "./Navbar.css";
import "remixicon/fonts/remixicon.css";
import black_theme_logo from "../resources/PFXWatchWhite.png";
import light_theme_logo from "../resources/PFXWatchBlack.png";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MyNavbar(props) {
  const LogoutHandler = () => {
    Cookies.remove("jwt_token");
    window.location.href = "/login";
  };

  return (
    <Navbar expand="lg" className={props.props.Theme}>
      <Container>
        <Navbar.Brand>
          <img
            alt="Logo"
            src={
              props.props.Theme !== "dark" ? light_theme_logo : black_theme_logo
            }
            width={"100px"}
          ></img>
        </Navbar.Brand>
        <div className="icons">
          <div>
            <Button
              variant="outline-info"
              size="sm"
              onClick={props.props.toggleTheme}
              className={
                props.props.Theme !== "dark" ? "ri-moon-fill" : "ri-sun-fill"
              }
            ></Button>
          </div>
          <Button variant="btn-outline">
            <img
              className="userprofile"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
            />
          </Button>
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

export default MyNavbar;
