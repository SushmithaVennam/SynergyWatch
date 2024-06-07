import React, { useState, useEffect } from "react";
import Mainpage from "./Mainpage";
import "remixicon/fonts/remixicon.css";
import Cookies from "js-cookie";

const Trending = () => {
  const port = 4444;
  const [videosArray, setVideosArray] = useState([]);
  const [loading, setLoading] = useState("Loading");

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const ToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
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
          (video_json) => video_json.video_category === "Trending"
        );
        setVideosArray(filterdData);
        console.log(filterdData);
        setLoading(false);
      } else {
        setLoading(response.message);
        console.log("Error while fetching videos. " + response.error);
        if (response.status === 401) {
          Cookies.remove("jwt_token");
          window.location.href = "/login";
        }
      }
    } catch (error) {
      console.log("Error while fetching videos. " + error.message);
    }
  };

  const props = {
    themesetter: ToggleTheme,
    curTheme: theme,
    searchHandler: fetchVideos,
    videos: videosArray,
    src: "Trending",
  };

  return (
    <div className={theme}>
      <Mainpage props={props} />
    </div>
  );
};

export default Trending;
