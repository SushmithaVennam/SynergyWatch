import React from "react";
import { Link } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { FaFire } from "react-icons/fa";
import { SiYoutubegaming } from "react-icons/si";
import { FaSave } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import "remixicon/fonts/remixicon.css";
import "./Sidebar.css";

const Sidebar = (props) => {
  return (
    <div className="min-vh-100 d-flex flex-column justify-content-between ">
      <section className={`sidebar-component sticky-top`}>
        <div className="container-fluid pl-5 pt-4">
          <Link
            className={`d-block pb-2 sidebar_content ${
              props.props.srcpage === "Home" ? "active_icon" : ""
            }`}
            to="/home"
          >
            <TiHome style={{ marginRight: "20px" }} /> Home
          </Link>

          <Link
            className={`d-block pb-2 sidebar_content ${
              props.props.srcpage === "Trending" ? "active_icon" : ""
            }`}
            to="/trending"
          >
            <FaFire style={{ marginRight: "20px" }} /> Trending
          </Link>

          <Link
            className={`d-block pb-2 sidebar_content ${
              props.props.srcpage === "Gaming" ? "active_icon" : ""
            }`}
            to="/gaming"
          >
            <SiYoutubegaming style={{ marginRight: "20px" }} /> Gaming
          </Link>

          <Link
            className={`d-block pb-2 sidebar_content ${
              props.props.srcpage === "Saved" ? "active_icon" : ""
            }`}
            to="/saved"
          >
            <FaSave style={{ marginRight: "20px" }} /> Saved videos
          </Link>

          <Link
            className={`d-block pb-2 sidebar_content ${
              props.props.srcpage === "Liked" ? "active_icon" : ""
            }`}
            to="/liked"
          >
            <FaHeart style={{ marginRight: "20px" }} /> Liked videos
          </Link>
        </div>
      </section>

      <div className="d-flex ms-2 flex-column mb-3 justify-content-start">
        <p>CONTACT US</p>
        <div className="d-flex justify-content-between width-100-px">
          <img
            className="socialmedia"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
          ></img>
          <img
            className="socialmedia"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
          ></img>
          <img
            className="socialmedia"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
          ></img>
        </div>
        <p className="mt-2 width-170-px">
          Enjoy! Now to see your channels and recommendations!
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
