import { React, useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import { TiHome } from "react-icons/ti";
import { FaFire } from "react-icons/fa";
import { SiYoutubegaming } from "react-icons/si";
import { FaSave } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const SideBar = (props) => {
  const minWidthText = "(min-width: 768px)";
  const [showText, setshowText] = useState(
    window.matchMedia(minWidthText).matches
  );

  useEffect(() => {
    window
      .matchMedia(minWidthText)
      .addEventListener("change", (e) => setshowText(e.matches));
  }, []);

  const list = [
    {
      ref: "/home",
      icon: <TiHome />,
      key: "Home",
      current: props.props.srcpage === "Home",
    },
    {
      ref: "/trending",
      icon: <FaFire />,
      key: "Trending",
      current: props.props.srcpage === "Trending",
    },
    {
      ref: "/gaming",
      icon: <SiYoutubegaming />,
      key: "Gaming",
      current: props.props.srcpage === "Gaming",
    },
    {
      ref: "/saved-videos",
      icon: <FaSave />,
      key: "Saved videos",
      current: props.props.srcpage === "Saved Videos",
    },
    {
      ref: "/liked-videos",
      icon: <FaHeart />,
      key: "Liked videos",
      current: props.props.src === "Liked Videos",
    },
  ];

  const social_media = [
    {
      src: "https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png",
      key: "facebook logo",
    },
    {
      src: "https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png",
      key: "twitter logo",
    },
    {
      src: "https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png",
      key: "linked in logo",
    },
  ];

  return (
    <div>
      <section
        className={`min-vh-100 d-flex flex-column justify-content-between sticky-top`}
        style={{ position: "fixed", marginTop: "50px" }}
      >
        <Container className="w-100">
          {list.map((obj) => (
            <Nav.Link href={obj.ref} key={obj.key}>
              <Row>
                <Col xs={1} className={`${obj.current ? "active_icon" : ""}`}>
                  {obj.icon}
                </Col>
                {showText && <Col>{obj.key}</Col>}
              </Row>
            </Nav.Link>
          ))}
        </Container>

        <div
          className="d-flex ms-2 flex-column my-p"
          style={{ height: "200px" }}
        >
          {showText && <p>CONTACT US</p>}

          <div
            className={`d-flex width-100-px ${
              showText ? "flex-row" : "flex-column"
            }`}
          >
            {social_media.map((obj) => (
              <img
                key={obj.key}
                className="socialmedia_icon"
                src={obj.src}
                alt={obj.key}
              ></img>
            ))}
          </div>
          {showText && (
            <p className="mt-2 width-170-px">
              Enjoy! Now to see your channels and recommendations!
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default SideBar;
