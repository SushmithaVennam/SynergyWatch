import React, { useState, useEffect } from "react";
import MyNavbar from "./Navbar";
import Sidebar from "./Sidebar";
import Button from "react-bootstrap/Button";
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

  const [bgcolor, setBGColor] = useState("bg-white");

  const ChangeMode = () => {
    setBGColor(bgcolor === "bg-white" ? "bg-black" : "bg-white");
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
        <MyNavbar props={{ BGcolor: bgcolor, changeMode: ChangeMode }} />
      </section>

      <section className={`container-fluid ${bgcolor}`}>
        <div className="row">
          <div className="col-md-3">
            <Sidebar props={{ BGcolor: bgcolor }} />
          </div>
          <div className={`col-md-9 container ${bgcolor}`}>
            <section className=" ps-3">
              <img
                src={
                  bgcolor !== "bg-black" ? light_theme_logo : black_theme_logo
                }
                width={"100px"}
              ></img>
              <p data-bs-theme="light">
                Buy Synergy watch Premium prepaid plans with UPI
              </p>
              <p data-bs-theme="dark">
                Buy Synergy watch Premium prepaid plans with UPI
              </p>
              <Button variant="light" size="sm">
                GET IT NOW
              </Button>
            </section>
            <section className="input_group_search container my-5">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control input-sm"
                  placeholder="Search"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={(event) => {
                    setSearchString(event.target.value);
                    console.log("search string is set to " + searchString);
                  }}
                />
                <Button
                  variant="light"
                  size="sm"
                  className="input-group-append ri-search-line"
                  onClick={() => {
                    console.log("Search button clicked");
                    setLoading(true);
                    fetchVideos();
                  }}
                ></Button>
              </div>
            </section>

            <div className="thumbnail_container border">
              <section className="thumbnails_layout">
                <div className="container">
                  <div className="row">
                    {videosArray.map((video_json, index) => (
                      <div className="col-md-4 my-3">
                        <div className="thumbnail_image p-10" key={index}>
                          <Link
                            to={"/videos/" + video_json._id}
                            // target="_blank"
                          >
                            <img
                              src={video_json.video_thumbnail_url}
                              alt="Video thumbnail"
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
