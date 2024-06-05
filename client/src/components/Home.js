import React, { useState, useEffect } from "react";
import MyNavbar from "./Navbar";
import Sidebar from "./Sidebar";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import "remixicon/fonts/remixicon.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import "./VideoGrid.css";
import black_theme_logo from "../resources/PFXWatchWhite.png";
import light_theme_logo from "../resources/PFXWatchBlack.png";

const Home = () => {
  const port = 4444;
  const [videosArray, setVideosArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchString, setSearchString] = useState("");
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

        const filterdData = data.filter((video_json) =>
          video_json.video_title
            .toLowerCase()
            .includes(searchString.toLowerCase())
        );
        setVideosArray(filterdData);
        console.log(filterdData);
        console.log("Searched for '" + searchString + "'");
        setLoading(false);
      }
    } catch (error) {
      console.log("Error while fetching videos. " + error.message);
    }
  };

  return (
    <div>
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
            <section>
              <img
                src={theme !== "dark" ? light_theme_logo : black_theme_logo}
                width={"100px"}
              ></img>
              <p>Buy PFX watch Premium prepaid plans with UPI</p>

              <Button
                variant={`outline-${theme === "light" ? "dark" : "light"}`}
                size="sm"
                className={theme}
              >
                GET IT NOW
              </Button>
            </section>

            <InputGroup className={`mb-3 mt-3 ${theme}`}>
              <Form.Control
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <Button
                variant={`outline-${theme == "light" ? "dark" : "light"}`}
                // variant={`outline-secondary`}
                size="sm"
                className="input-group-append ri-search-line"
                onClick={() => {
                  setLoading(true);
                  fetchVideos();
                }}
              ></Button>
            </InputGroup>

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

export default Home;
