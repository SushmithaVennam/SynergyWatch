import React from "react";
import { Link } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { FaFire } from "react-icons/fa";
import { SiYoutubegaming } from "react-icons/si";
import { FaSave } from "react-icons/fa";
// import { BiSolidLike } from "react-icons/bi";

import "remixicon/fonts/remixicon.css";
import "./Sidebar.css";

const Sidebar = (props) => {
  return (
    <div>
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
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
