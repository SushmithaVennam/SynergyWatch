import React, { useState, useEffect } from "react";
import MyNavbar from "./Navbar";
import Sidebar from "./Sidebar";
import Button from "react-bootstrap/Button";
import "remixicon/fonts/remixicon.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import "./VideoGrid.css";

const Saved = () => {
  const port = 4444;
  const [videosArray, setVideosArray] = useState([]);
  const [loading, setLoading] = useState("Loading");
  const [theme, setTheme] = useState("light");

  const ToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    console.log("theme toggled");
  };

  useEffect(() => {
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken === undefined) {
      Cookies.remove("jwt_token");
      window.location.href = "/login";
    }
    if (loading) {
      fetchVideos();
    }
  });

  const fetchVideos = async () => {
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken === undefined) {
      Cookies.remove("jwt_token");
      window.location.href = "/login";
    }
    try {
      const response = await fetch(
        `http://localhost:${port}/get-video-details`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: jwtToken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const filterdData = data.filter(
          (video_json) => video_json.video_saved === "True"
        );
        setVideosArray(filterdData);
        console.log(data);
        setLoading(false);
      } else {
        setLoading(response.message);
      }
    } catch (error) {
      console.log("Error while fetching videos. " + error.message);
    }
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
      <section className={`container-fluid ${theme}`}>
        <div className="row">
          <div className="col-md-3">
            <Sidebar props={{ Theme: theme }} />
          </div>
          <div className={`col-md-9 container ${theme}`}>
            <section className="input_group_search container my-5">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control input-sm"
                  placeholder="Search"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <div className="input-group-append">
                  <span className="input-group-text" id="basic-addon2">
                    <i className="ri-search-line"></i>
                  </span>
                </div>
              </div>
            </section>

            <div className="thumbnail_container border">
              <section className="thumbnails_layout">
                <div className="container">
                  <div className="row">
                    {videosArray.map((video_json, index) => (
                      <div className="col-md-4 my-3">
                        <div className="thumbnail_image" key={index}>
                          <Link to={"/videos/" + video_json._id}>
                            <img
                              src={video_json.video_thumbnail_url}
                              alt="Video thumbnail"
                              className="img-fluid"
                            />
                          </Link>
                        </div>
                        <div className="home_thumbnail_title">
                          <h6 className="my-3" href={video_json.video_url}>
                            {video_json.video_title}
                          </h6>
                        </div>
                        <div className="home_channel_description d-flex">
                          <div className="channel_logo border">
                            <img
                              src={video_json.channel_logo_url}
                              href={video_json.video_url}
                              alt="Video Thumbnail"
                            />
                          </div>
                          <div className="channel_description ms-2 ">
                            <p>{video_json.channel_name}</p>
                            <p>9.24M subscribers</p>
                            <p>{video_json.video_published_date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* row */}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Saved;
