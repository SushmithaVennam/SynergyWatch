import React, { useState } from "react";
import MyNavbar from "./Navbar";
import Sidebar from "./Sidebar";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import logo_dark from "../resources/PFXWatchBlack.png";
import "./VideoGrid.css";
import "./Mainpage.css";

const Mainpage = (props) => {
  const [showPay, setshowPay] = useState(true);
  const [searchString, setSearchString] = useState("");
  const notTheme = props.props.curTheme === "light" ? "dark" : "light";
  const [filteredVideos, setVideos] = useState(props.props.videos);
  const notconnected =
    props.props.curTheme === "light"
      ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
      : "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png";
  const searchEmpty =
    "https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png";
  const handleClosePay = () => {
    setshowPay(false);
  };
  localStorage.setItem("theme", props.props.curTheme);
  const video_id = "30b642bd-7591-49f4-ac30-5c538f975b15";

  const handleSearchInputChange = (e) => {
    setSearchString(e.target.value);
  };
  const searchHandler = () => {
    const data = props.props.videos;

    const filterdData = data.filter((video_json) =>
      video_json.title.toLowerCase().includes(searchString.toLowerCase())
    );
    setVideos(filterdData);
  };
  // console.log(props.props.videos);
  return (
    <div>
      <section className="nav_bar_component">
        <MyNavbar
          props={{
            toggleTheme: props.props.themesetter,
            Theme: props.props.curTheme,
          }}
        />
      </section>
      <section className={`container-fluid`}>
        <div className="row">
          <div className="col-md-3">
            <Sidebar props={{ srcpage: props.props.src }} />
          </div>
          <div className={`col-md-9 container`}>
            {showPay && (
              <section className="Banner d-flex justify-content-between">
                <div className="col text-right">
                  <div className="d-flex w-100 justify-content-between">
                    <img
                      alt="logo"
                      src={logo_dark}
                      width="100px"
                      height="25px"
                    ></img>
                    <Button
                      onClick={handleClosePay}
                      variant={`light`}
                      size="sm"
                    >
                      X
                    </Button>
                  </div>
                  <p className="normalText">
                    Buy PFX watch Premium prepaid plans with UPI
                  </p>

                  <Button variant={`outline-dark`} size="sm" className="light">
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
                    {props.props.videos.length > 0 ? (
                      filteredVideos.length > 0 ? (
                        filteredVideos.map((video_json, index) => (
                          <div className="col-md-4 my-3">
                            <div
                              className="thumbnail_image"
                              key={video_json.id}
                            >
                              <Link to={"/videos/" + video_id}>
                                <img
                                  src={video_json.thumbnail_url}
                                  alt="Video thumbnail"
                                  className="img-fluid w-100 h-100"
                                />
                              </Link>
                            </div>
                            <div className="home_thumbnail_title">
                              <h6 className="my-3" href={""}>
                                {video_json.title}
                              </h6>
                            </div>
                            {video_json.channel && (
                              <div className="home_channel_description d-flex">
                                <div className="channel_logo ">
                                  <img
                                    src={video_json.channel.profile_image_url}
                                    href={video_json.video_url}
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
                          src={notconnected}
                          alt="Not connected to network"
                          style={{ width: "500px", height: "400px" }}
                        />
                        <h3>Oops! Something Went Wrong</h3>
                        <p>
                          We are having some trouble to complete your request.
                        </p>
                        <p>Please try again.</p>
                        <Button>Retry</Button>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Mainpage;
