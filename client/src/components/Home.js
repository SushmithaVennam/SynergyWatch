import React, { useState, useEffect } from "react";
import MyNavbar from "./Navbar";
import SideBar from "./SideBar";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import logo_dark from "../resources/PFXWatchBlack.png";
import "remixicon/fonts/remixicon.css";
import Cookies from "js-cookie";

const Home = () => {
  const port = 4444;
  const thisPage = "Home";
  const [videosArray, setVideosArray] = useState([]);
  const [filteredVideos, setVideos] = useState([]);
  const [loading, setLoading] = useState("Loading");

  const [showPay, setshowPay] = useState(true);
  const [showFailure, setshowFailure] = useState(false);
  const [showSearchEmpty, setSearchEmpty] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const notTheme = theme === "light" ? "dark" : "light";
  const notconnected =
    theme === "light"
      ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
      : "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png";
  const searchEmpty =
    "https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png";
  const SavedEmpty =
    "https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png";

  useEffect(() => {
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken === undefined) {
      Cookies.remove("jwt_token");
      window.location.href = "/login";
    }
    if (loading === "Loading") {
      console.log(`${thisPage} : Page is ${loading}`);
      const resp = fetchVideos();
      if (resp !== 200) {
        console.log(`${thisPage} : Page is already ${loading}`);
        return;
      }
      setVideos(videosArray);
      console.log(`${thisPage} : Fetched ${videosArray.length} videos`);
      setLoading("Displayed");
    } else if (loading === "Fetched" && videosArray.length === 0) {
      setVideos(videosArray);
      setLoading("Displayed");
    } else if (loading === "Failed") {
      setVideos(videosArray);
    } else {
      console.log(`${thisPage} : Page is already ${loading}`);
    }
  }, [filteredVideos, videosArray, loading]);

  localStorage.setItem("theme", theme);
  const ToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleClosePay = () => {
    setshowPay(false);
  };

  const handleSearchInputChange = (e) => {
    searchHandler(e.target.value);
  };

  const searchHandler = (string) => {
    const data = videosArray;

    const filterdData = data.filter((video_json) =>
      video_json.title.toLowerCase().includes(string.toLowerCase())
    );
    setVideos(filterdData);
    filterdData.length === 0 ? setSearchEmpty(true) : setSearchEmpty(false);
  };
  console.log("MainPage : " + videosArray.length);

  const saveVideoJson = (video_json) => {
    localStorage.setItem("video_json", JSON.stringify(video_json));
  };

  const fetchVideos = async () => {
    if (loading === "Fetching" || loading === "Failed") {
      return 201;
    }

    setLoading("Fetching");
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken === undefined) {
      setLoading("Failed");
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
        const filterdData = await response.json();
        setVideosArray(filterdData);
        setVideos(filterdData);
        console.log(filterdData);
        setLoading("Fetched");
        return response.status;
      } else {
        setLoading(response.message);
        setshowFailure(true);
        console.log(
          `${thisPage} : Error while fetching videos. ${response.error}`
        );
        if (response.status === 403 || response.status === 401) {
          Cookies.remove("jwt_token");
          window.location.href = "/login";
        }
        return response.status;
      }
    } catch (error) {
      setLoading("Failed");
      console.log(
        `${thisPage} : Error while fetching videos. ${error.message}`
      );
    }
    return 400;
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
          <SideBar props={{ srcpage: "Home" }} />
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
              size="sm"
              className="input-group-append ri-search-line"
            ></Button>
          </InputGroup>
          <div className="thumbnail_container">
            <section className="thumbnails_layout">
              <div className="container">
                <div className="row">
                  {showFailure && (
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
                  {showSearchEmpty && (
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
                  )}
                  {!showFailure &&
                    !showSearchEmpty &&
                    filteredVideos.map((video_json, index) => (
                      <div className="col-md-4 my-3" key={index}>
                        <div key={video_json._id}>
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
                    ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
