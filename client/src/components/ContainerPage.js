import React, { useState, useEffect } from "react";
import MyNavbar from "./Navbar";
import SideBar from "./SideBar";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { FaFire } from "react-icons/fa";
import { SiYoutubegaming } from "react-icons/si";
import { FaSave } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import "./VideoGrid.css";
import "./Mainpage.css";

const ContainerPage = (props) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [videosArray, setVideosArray] = useState([]);
  const [loading, setLoading] = useState("Loading");
  const [showFailure, setshowFailure] = useState(false);
  const [showSavedEmpty, setshowSavedEmpty] = useState(false);
  const thisPage = props.props;
  const thisIcon =
    thisPage === "Trending" ? (
      <FaFire />
    ) : thisPage === "Gaming" ? (
      <SiYoutubegaming />
    ) : thisPage === "Saved Videos" ? (
      <FaSave />
    ) : (
      <FaHeart />
    );
  const port = 4444;
  const notconnected =
    theme === "light"
      ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
      : "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png";
  const SavedEmpty =
    "https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png";

  var failureImage = notconnected;
  var failure_alt = "Not connected to network";
  var failure_h3 = "Oops! Something Went Wrong";
  var failure_p = "We are having some trouble to complete your request.";

  if (thisPage === "Saved") {
    failureImage = SavedEmpty;
    failure_alt = "no saved videos";
    failure_h3 = "No saved videos found";
    failure_p = "You can save your videos while watching them";
  }
  localStorage.setItem("theme", theme);

  const ToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

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
      console.log(`${thisPage} : Fetched ${videosArray.length} videos`);
    } else if (loading === "Fetched" && videosArray.length === 0) {
      setLoading("Displayed");
    } else if (loading === "Failed") {
    } else {
      console.log(`${thisPage} : Page is already ${loading}`);
    }
  }, [videosArray]);

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
        const data = await response.json();
        const filterdData = data.filter(
          thisPage === "Trending"
            ? (video_json) => video_json.video_category === thisPage
            : thisPage === "Saved Videos"
            ? (video_json) => video_json.saved === "True"
            : (video_json) => video_json.liked === "True"
        );
        setVideosArray(filterdData);
        console.log(filterdData);
        setLoading("Fetched");
        if (filterdData.length === 0) {
          if (thisPage === "Saved Videos") setshowSavedEmpty(true);
        }
        return response.status;
      } else {
        setLoading(response.message);
        console.log(
          `${thisPage} : Error while fetching videos. ${response.error}`
        );
        setLoading("Failed");
        if (response.status === 403 || response.status === 401) {
          Cookies.remove("jwt_token");
          window.location.href = "/login";
        }
        setshowFailure(true);
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
      <div
        className={`${
          videosArray.length === 0 ? "vh-100" : ""
        } d-flex flex-row container-fluid`}
      >
        <div className="col-md-3 ">
          <SideBar props={{ srcpage: thisPage }} />
        </div>
        <div className={`col-md-9 container width-100 min-vh-100`}>
          <Container fluid style={{ height: "100px" }}>
            <Row display="flex" alignItems="center" className="h-100">
              <Col
                xs={1}
                className="d-flex align-items-center justify-content-end border-radius-50 active_icon "
              >
                <h1>{thisIcon}</h1>
              </Col>
              <Col className="d-flex align-items-center justify-content-start">
                <h1>{props.props}</h1>
              </Col>
            </Row>
          </Container>
          <Container fluid>
            {showFailure && (
              <div className="d-flex flex-column align-items-center">
                <img
                  src={notconnected}
                  alt="Not connected to network"
                  style={{ width: "500px", height: "400px" }}
                />
                <h3>Oops! Something Went Wrong</h3>
                <p>We are having some trouble to complete your request.</p>
                <p>Please try again.</p>
                <Button>Retry</Button>
              </div>
            )}
            {showSavedEmpty && (
              <div className="d-flex flex-column align-items-center">
                <img
                  src={SavedEmpty}
                  alt="no saved videos"
                  style={{ width: "500px", height: "400px" }}
                />
                <h3>No saved videos found</h3>
                <p>You can save your videos while watching them</p>
              </div>
            )}
            {!showFailure &&
              !showSavedEmpty &&
              videosArray.map((video_json) => (
                <Row key={video_json._id} className="p-4">
                  <Col
                    className="thumbnail_image"
                    style={{
                      width: "200px",
                    }}
                  >
                    <Link to={"/videos/" + video_json._id}>
                      <img
                        src={video_json.thumbnail_url}
                        alt="Video thumbnail"
                        className="img-fluid w-100 h-100"
                      />
                    </Link>
                  </Col>
                  <Col>
                    <h6>{video_json.title}</h6>
                    {video_json.channel && (
                      <div className="home_channel_description d-flex">
                        <div className="channel_description ">
                          <p>{video_json.channel.name}</p>
                          <p>
                            {video_json.view_count +
                              " views ⦁ " +
                              video_json.published_at}
                          </p>
                        </div>
                      </div>
                    )}
                  </Col>
                </Row>
              ))}
          </Container>
        </div>
      </div>
    </div>
  );
};
export default ContainerPage;
