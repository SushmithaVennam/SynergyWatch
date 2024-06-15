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
  const [showText, setshowText] = useState(
    window.matchMedia("(min-width: 750px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 750px)")
      .addEventListener("change", (e) => setshowText(e.matches));
  }, []);

  const list = [
    {
      ref: "/home",
      icon: <TiHome />,
      text: "Home",
      current: props.props.srcpage === "Home",
    },
    {
      ref: "/trending",
      icon: <FaFire />,
      text: "Trending",
      current: props.props.srcpage === "Trending",
    },
    {
      ref: "/gaming",
      icon: <SiYoutubegaming />,
      text: "Gaming",
      current: props.props.srcpage === "Gaming",
    },
    {
      ref: "/saved",
      icon: <FaSave />,
      text: "Saved videos",
      current: props.props.srcpage === "Saved",
    },
    {
      ref: "/liked",
      icon: <FaHeart />,
      text: "Liked videos",
      current: props.props.src === "Liked",
    },
  ];

  const social_media = [
    {
      src: "https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png",
      alt: "facebook logo",
    },
    {
      src: "https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png",
      alt: "twitter logo",
    },
    {
      src: "https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png",
      alt: "linked in logo",
    },
  ];

  // console.log("Sidebar : " + props.props.srcpage);

  return (
    <div>
      <section className={`sidebar-component sticky-top`}>
        <Container className=" w-100">
          {list.map((obj) => (
            <Nav.Link href={obj.ref}>
              <Row>
                <Col xs={1} className={`${obj.current ? "active_icon" : ""}`}>
                  {obj.icon}
                </Col>
                {showText && <Col>{obj.text}</Col>}
              </Row>
            </Nav.Link>
          ))}
        </Container>
      </section>

      <section className={`sidebar-component sticky-bottom`}>
        <div className="d-flex ms-2 flex-column mb-3 ">
          {showText && <p>CONTACT US</p>}

          <div
            className={`d-flex ms-2 width-100-px ${
              showText ? "flex-row" : "flex-column"
            }`}
          >
            {social_media.map((obj) => (
              <img
                className="socialmedia_icon"
                src={obj.src}
                alt={obj.alt}
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
