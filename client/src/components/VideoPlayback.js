import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import MyNavbar from "./Navbar";
import Sidebar from "./SideBar";
import Cookies from "js-cookie";
import "./Video_playback.css";
import data from "../resources/30b642bd-7591-49f4-ac30-5c538f975b15.json";

function Video_playback() {
  // const port = 4444;
  const [video_json, setVideo] = useState(
    JSON.parse(localStorage.getItem("video_json")) || data.video_details
  );
  const savebutton = video_json.saved ? "ri-save-fill" : "ri-save-line";
  const dislikebutton = video_json.disliked
    ? "ri-thumb-down-fill"
    : "ri-thumb-down-line";
  const likebutton = video_json.liked ? "ri-thumb-up-fill" : "ri-thumb-up-line";
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const ToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    console.log("theme toggled");
  };

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    Cookies.remove("jwt_token");
    window.location.href = "/login";
  }

  const saveVideo = () => {
    const flag = video_json.saved ? false : true;
    setVideo({ ...video_json, saved: flag });
  };
  const likeVideo = () => {
    const flag = video_json.liked ? false : true;
    setVideo({ ...video_json, liked: flag });
  };
  const dislikeVideo = () => {
    const flag = video_json.disliked ? false : true;
    setVideo({ ...video_json, disliked: flag });
  };

  const [playvideo, setPlay] = useState(false);

  localStorage.setItem("theme", theme);
  localStorage.setItem("video_json", JSON.stringify(video_json));

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

      <section className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <Sidebar props={{ srcpage: "Playback" }} />
          </div>

          <div className="col-md-9 container">
            <Container>
              <div className="ratio ratio-16x9">
                {playvideo ? (
                  <iframe
                    src="https://www.youtube.com/embed/wB6IFCeTssk?autoplay=1"
                    title="YouTube video player"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="vidcontainer">
                    <img
                      className="thumbnail"
                      src={video_json.thumbnail_url}
                      onClick={() => {
                        setPlay(true);
                      }}
                      alt="Video Thumbnail"
                    />
                    <button
                      class="ytp-large-play-button ytp-button ytp-large-play-button-red-bg"
                      aria-label="Play"
                      title="Play"
                      onClick={() => {
                        setPlay(true);
                      }}
                    >
                      <svg
                        height="100px"
                        version="1.1"
                        viewBox="0 0 68 48"
                        width="100px"
                      >
                        <path
                          class="ytp-large-play-button-bg"
                          d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                          fill="#f00"
                        ></path>
                        <path d="M 45,24 27,14 27,34" fill="#fff"></path>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </Container>
            <div className="my-3">
              <p className="my-3 ps-2">{video_json.title}</p>
            </div>
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-row">
                <p className="p-2">{video_json.view_count + " views"}</p>
                <p className="p-2">{video_json.published_at}</p>
              </div>
              <div className="d-flex flex-row h-80">
                <Button
                  style={{ paddingRight: "2px" }}
                  variant={`btn-outline`}
                  size="sm"
                  className={`${likebutton}  ${theme}`}
                  onClick={likeVideo}
                >
                  Like
                </Button>
                <Button
                  variant={`btn-outline`}
                  size="sm"
                  className={`${dislikebutton}  ${theme}`}
                  onClick={dislikeVideo}
                >
                  Dislike
                </Button>
                <Button
                  variant={`btn-outline`}
                  size="sm"
                  className={`${savebutton}  ${theme}`}
                  onClick={saveVideo}
                >
                  Save
                </Button>
              </div>
            </div>
            <hr></hr>
            <div className="logo d-flex">
              <img
                src={video_json.channel.profile_image_url}
                width="50"
                height="50"
                alt="Channel logo"
              />
              <div className="description p-2">
                <p>{video_json.channel.name}</p>
                <p>{video_json.channel.subscriber_count} subscribers</p>
              </div>
            </div>
            <div>
              <p className="p-2">
                {video_json.description
                  ? video_json.description
                  : video_json.title}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Video_playback;
