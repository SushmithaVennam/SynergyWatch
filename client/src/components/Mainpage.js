import React, { useState } from "react";
import MyNavbar from "./Navbar";
import SideBar from "./SideBar";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import logo_dark from "../resources/PFXWatchBlack.png";
import "./VideoGrid.css";
import "./Mainpage.css";

const Mainpage = (props) => {
  const [showPay, setshowPay] = useState(props.props.src === "Home");
  const [searchString, setSearchString] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const notTheme = theme === "light" ? "dark" : "light";
  const [filteredVideos, setVideos] = useState(props.props.videos);
  const notconnected =
    theme === "light"
      ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
      : "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png";
  const searchEmpty =
    "https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png";
  const SavedEmpty =
    "https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png";

  var failureImage = notconnected;
  var failure_alt = "Not connected to network";
  var failure_h3 = "Oops! Something Went Wrong";
  var failure_p = "We are having some trouble to complete your request.";

  if (props.props.src === "Saved") {
    failureImage = SavedEmpty;
    failure_alt = "no saved videos";
    failure_h3 = "No saved videos found";
    failure_p = "You can save your videos while watching them";
  }
  localStorage.setItem("theme", theme);

  const ToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleClosePay = () => {
    setshowPay(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchString(e.target.value);
    searchHandler();
  };

  const searchHandler = () => {
    const data = props.props.videos;

    const filterdData = data.filter((video_json) =>
      video_json.title.toLowerCase().includes(searchString.toLowerCase())
    );
    setVideos(filterdData);
  };
  console.log("MainPage : " + props.props.videos.length);

  const saveVideoJson = (video_json) => {
    localStorage.setItem("video_json", JSON.stringify(video_json));
  };

  return (
    <div className={theme}>
      <MyNavbar
        props={{
          toggleTheme: ToggleTheme,
          Theme: theme,
        }}
      />
      <div className="d-flex flex-row container-fluid">
        <div className="col-md-3 ">
          <SideBar props={{ srcpage: props.props.src }} />
        </div>
        <div className={`col-md-9 container width-100`}>
          {showPay && (
            <section className="Banner">
              <div>
                <div className="d-flex w-100 justify-content-between">
                  <img
                    alt="logo"
                    src={logo_dark}
                    width="100px"
                    height="25px"
                  ></img>
                  <Button onClick={handleClosePay} variant={`light`} size="sm">
                    X
                  </Button>
                </div>
                <p className="normalText ps-1">
                  Buy PFX watch Premium prepaid plans with UPI
                </p>
                <Button variant={`outline-dark`} size="sm" className="ms-1">
                  GET IT NOW
                </Button>
              </div>
            </section>
          )}

          <InputGroup className={`mb-3 mt-3`}>
            <Form.Control
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon2"
              onChange={handleSearchInputChange}
              className="ms-1"
            />
            <Button
              variant={`outline-${notTheme}`}
              // variant={`outline-secondary`}
              size="sm"
              className="input-group-append ri-search-line"
              onClick={searchHandler}
            ></Button>
          </InputGroup>

          <div className="thumbnail_container">
            <section className="thumbnails_layout">
              <div className="container">
                <div className="row">
                  {props.props.videos !== null &&
                  props.props.videos.length > 0 ? (
                    filteredVideos.length > 0 ? (
                      filteredVideos.map((video_json, index) => (
                        <div className="col-md-4 my-3" key={index}>
                          <div className="thumbnail_image" key={video_json._id}>
                            <Link to={"/videos/" + video_json._id}>
                              <img
                                src={video_json.thumbnail_url}
                                alt="Video thumbnail"
                                className="img-fluid w-100 h-100"
                                onClick={() => {
                                  console.log(JSON.stringify(video_json));
                                  saveVideoJson(video_json);
                                }}
                              />
                            </Link>
                          </div>
                          <div className="home_thumbnail_title">
                            <h6 className="my-3" href={video_json.video_url}>
                              {video_json.title}
                            </h6>
                          </div>
                          {video_json.channel && (
                            <div className="home_channel_description d-flex">
                              <div className="channel_logo ">
                                <img
                                  src={video_json.channel.profile_image_url}
                                  alt="Channel Thumbnail"
                                />
                              </div>

                              <div className="channel_description ms-2 ">
                                <p>{video_json.channel.name}</p>
                                <p>
                                  {video_json.view_count +
                                    " views ⦁ " +
                                    video_json.published_at}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="d-flex flex-column align-items-center">
                        <img
                          src={searchEmpty}
                          alt="No Search Results"
                          style={{ width: "500px", height: "400px" }}
                        />
                        <h3> No Search results found</h3>
                        <p>Try different key words or remove search filter</p>
                        <Button>Retry</Button>
                      </div>
                    )
                  ) : (
                    <div className="d-flex flex-column align-items-center">
                      <img
                        src={failureImage}
                        alt={failure_alt}
                        style={{ width: "500px", height: "400px" }}
                      />
                      <h3>{failure_h3}</h3>
                      <p> {failure_p}</p>
                      {props.props.src !== "Saved" ? (
                        <div>
                          <p>Please try again.</p>
                          <Button>Retry</Button>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Mainpage;
