import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import MyNavbar from "./Navbar";
import Sidebar from "./Sidebar";
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
  const [theme, setTheme] = useState("light");

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
      video_saved: "True",
    };
    if (video_json.video_saved === "True") {
      jsonbody = {
        id: id,
        video_saved: "False",
      };
      setSaveButton("ri-save-line");
      video_json.video_saved = "False";
    } else {
      video_json.video_saved = "True";
      setSaveButton("ri-save-fill");
    }

    console.log(jsonbody);
    try {
      const response = await fetch(uri, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: jwtToken,
        },
        body: JSON.stringify({ jsonbody }),
      });
    } catch (error) {}
  };

  const likeVideo = async (id) => {
    // const uri = `http://localhost:${port}/like-video`;
    var jsonbody = {
      id: id,
      video_liked: "True",
    };
    // if (video_json.video_liked === "True") {
    if (likebutton === "ri-thumb-up-line") {
      //   jsonbody = {
      //     id: id,
      //     video_saved: "False",
      //   };
      setLikeButton("ri-thumb-up-fill");
      setDisLikeButton("ri-thumb-down-line");
      //   video_json.video_saved = "False";
    } else {
      //   video_json.video_saved = "True";
      setLikeButton("ri-thumb-up-line");
    }

    // console.log(jsonbody);
    // try {
    //   const response = await fetch(uri, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: jwtToken,
    //     },
    //     body: JSON.stringify({ jsonbody }),
    //   });
    // } catch (error) {}
  };

  const dislikeVideo = async (id) => {
    if (dislikebutton === "ri-thumb-down-line") {
      setDisLikeButton("ri-thumb-down-fill");
      setLikeButton("ri-thumb-up-line");
    } else {
      setDisLikeButton("ri-thumb-down-line");
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
        console.log("fetchVideo : " + data);
        setLoading(false);
        setStatus("Loaded");
        if (data.video_saved === "False") {
          setSaveButton("ri-save-line");
        } else {
          setSaveButton("ri-save-fill");
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
                  <iframe
                    src={
                      "https://www.youtube.com/embed/" + video_json.video_url
                    }
                    title="YouTube video player"
                    allowFullScreen
                  ></iframe>
                </div>
              </Container>
              <div className="my-3">
                <p className="my-3">{video_json.video_title}</p>
              </div>
              <div className="d-flex  justify-content-between">
                <div className="d-flex flex-row">
                  <p className="p-2">{video_json.video_views_count}</p>
                  <p className="p-2">{video_json.video_published_date}</p>
                </div>
                <div className="d-flex flex-row">
                  <Button
                    variant="light"
                    size="sm"
                    className={likebutton}
                    onClick={() => likeVideo(video_json._id)}
                  >
                    Like
                  </Button>
                  <Button
                    variant="light"
                    size="sm"
                    className={dislikebutton}
                    onClick={() => dislikeVideo(video_json._id)}
                  >
                    Dislike
                  </Button>
                  <Button
                    variant="light"
                    size="sm"
                    className={savebutton}
                    onClick={() => saveVideo(video_json._id)}
                  >
                    Save
                  </Button>
                </div>
              </div>
              <hr></hr>
              <div className="logo d-flex">
                <img
                  src={video_json.channel_logo_url}
                  width="50"
                  height="50"
                  alt="Channel logo thumbnail url"
                />
                <div className="description p-2">
                  <p>{video_json.channel_name}</p>
                  <p>256M subscribers</p>
                </div>
              </div>
              <div>
                <p className="p-2">{video_json.video_title}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Video_playback;
