import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import MyNavbar from "./Navbar";
import Sidebar from "./SideBar";
import Cookies from "js-cookie";
import "./Video_playback.css";

function Video_playback() {
  const { videoID } = useParams();
  const port = 4444;
  const [video_json, setVideoJson] = useState([]);
  const [loading, setLoading] = useState(true);
  const [curStatus, setStatus] = useState("Fetching data");
  const [savebutton, setSaveButton] = useState("ri-save-line");
  const [dislikebutton, setDisLikeButton] = useState("ri-thumb-down-line");
  const [likebutton, setLikeButton] = useState("ri-thumb-up-line");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [playvideo, setPlay] = useState(false);

  const ToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    console.log("theme toggled");
  };

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    Cookies.remove("jwt_token");
    window.location.href = "/login";
  }

  useEffect(() => {
    if (loading) {
      fetchVideo(videoID);
    }
  });

  const saveVideo = async (id) => {
    const uri = `http://localhost:${port}/save-video`;
    var jsonbody = {
      id: id,
      saved: "True",
    };
    if (video_json.saved === "True") {
      jsonbody = {
        id: id,
        saved: "False",
      };
      setSaveButton("ri-save-line");
      video_json.saved = "False";
    } else {
      video_json.saved = "True";
      setSaveButton("ri-save-fill");
    }

    try {
      const response = await fetch(uri, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: jwtToken,
        },
        body: JSON.stringify({ jsonbody }),
      });

      if (response.ok && response.status === 200) {
        console.log("Ok, received response is " + response.status);
        const data = await response.json();
        // setVideoJson(data);
        console.log(
          "saveVideo : Successfully sent " + JSON.stringify(jsonbody)
        );
        console.log("saveVideo : received " + JSON.stringify(data));
      }
    } catch (error) {}
  };

  const likeVideo = async (id) => {
    const uri = `http://localhost:${port}/like-video`;
    var jsonbody = {
      id: id,
      liked: "True",
    };
    if (video_json.liked === "True") {
      jsonbody = {
        id: id,
        liked: "False",
      };
      setLikeButton("ri-thumb-up-line");
      video_json.liked = "False";
    } else {
      setLikeButton("ri-thumb-up-fill");
      setDisLikeButton("ri-thumb-down-line");
      video_json.liked = "True";
    }

    try {
      const response = await fetch(uri, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: jwtToken,
        },
        body: JSON.stringify({ jsonbody }),
      });

      if (response.ok && response.status === 200) {
        console.log("Ok, received response is " + response.status);
        const data = await response.json();
        // setVideoJson(data);
        console.log(
          "likeVideo : Successfully sent " + JSON.stringify(jsonbody)
        );
        console.log("likeVideo : received " + JSON.stringify(data));
      }
    } catch (error) {}
  };

  const dislikeVideo = async (id) => {
    if (dislikebutton === "ri-thumb-down-line") {
      setDisLikeButton("ri-thumb-down-fill");
      if (video_json.liked === "True") setLikeButton("ri-thumb-up-line");
    } else {
      setDisLikeButton("ri-thumb-down-line");
    }
    if (video_json.liked === "True") {
      const uri = `http://localhost:${port}/like-video`;
      var jsonbody = {
        id: id,
        liked: "False",
      };
      try {
        const response = await fetch(uri, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: jwtToken,
          },
          body: JSON.stringify({ jsonbody }),
        });

        if (response.ok && response.status === 200) {
          console.log("Ok, received response is " + response.status);
          const data = await response.json();
          // setVideoJson(data);
          console.log(
            "dislikeVideo : Successfully sent " + JSON.stringify(jsonbody)
          );
          console.log("dislikeVideo : received " + JSON.stringify(data));
          video_json.liked = "False";
        }
      } catch (error) {}
    }
  };

  const fetchVideo = async (videoID) => {
    console.log("Fetching details of video with ID " + videoID);
    const uri = `http://localhost:${port}/get-one-video`;
    try {
      const jsonbody = {
        id: videoID,
      };
      const response = await fetch(uri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: jwtToken,
        },
        body: JSON.stringify({ jsonbody }),
      });

      if (response.ok && response.status === 200) {
        console.log("Ok, received response is " + response.status);
        const data = await response.json();
        setVideoJson(data);
        console.log("fetchVideo : " + JSON.stringify(data));
        setLoading(false);
        setStatus("Loaded");
        if (data.saved === "True") {
          setSaveButton("ri-save-fill");
        } else {
          setSaveButton("ri-save-line");
        }
        if (data.liked === "True") {
          setLikeButton("ri-thumb-up-fill");
        } else {
          setLikeButton("ri-thumb-up-line");
        }
      } else {
        console.log("Not ok, received response is " + response.status);
        setLoading(false);
        setVideoJson("");
        setStatus("Failed to fetch video " + response.message);
        return (
          <div>
            <h1>Video not found</h1>
          </div>
        );
      }
      setLoading(false);
    } catch (error) {
      console.log(
        "Error while fetching videos from " + uri + ". " + error.message
      );
    }
  };

  if (loading) {
    return <p>{curStatus}</p>;
  }

  localStorage.setItem("theme", theme);
  localStorage.setItem("video_json", JSON.stringify(video_json));

  if (curStatus === "Loaded") {
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
                    className={`${likebutton} ${theme}`}
                    onClick={() => likeVideo(video_json._id)}
                  >
                    Like
                  </Button>
                  <Button
                    variant={`btn-outline`}
                    size="sm"
                    className={`${dislikebutton} ${theme}`}
                    onClick={() => dislikeVideo(video_json._id)}
                  >
                    Dislike
                  </Button>
                  <Button
                    variant={`btn-outline`}
                    size="sm"
                    className={`${savebutton} ${theme}`}
                    onClick={() => saveVideo(video_json._id)}
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
}

export default Video_playback;
