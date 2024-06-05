import React from "react";
import "remixicon/fonts/remixicon.css";
import "./Sidebar.css";

const Sidebar = (props) => {
  return (
    <div>
      <section className={`sidebar-component sticky-top`}>
        <div className="container-fluid pl-5 pt-4">
          <div className="sidebar_content">
            <a
              className={`ri-home-3-fill pr-3 pb-2 ${
                props.props.srcpage === "Home" ? "active_icon" : ""
              }`}
              href="/home"
            >
              Home
            </a>
          </div>
          <div className="sidebar_content">
            <a
              className={`ri-fire-fill pr-3 pb-2 ${
                props.props.srcpage === "Trending" ? "active_icon" : ""
              }`}
              href="/trending"
            >
              Trending
            </a>
          </div>
          <div className="sidebar_content">
            <a
              className={`ri-discord-fill pr-3 pb-2 ${
                props.props.srcpage === "Gaming" ? "active_icon" : ""
              }`}
              href="/gaming"
            >
              Gaming
            </a>
          </div>
          <div className="sidebar_content">
            <a
              className={`ri-save-fill pr-3 pb-2 ${
                props.props.srcpage === "Saved" ? "active_icon" : ""
              }`}
              href="/saved"
            >
              Saved Videos
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
