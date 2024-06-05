import React, { useState, useEffect } from "react";
import Mainpage from "./Mainpage";
import "remixicon/fonts/remixicon.css";
import Cookies from "js-cookie";
import "./VideoGrid.css";

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
    <div className={theme}>
      <Mainpage
        props={{
          themesetter: ToggleTheme,
          curTheme: theme,
          searchHandler: fetchVideos,
          videos: videosArray,
          src: "Home",
        }}
      />
    </div>
  );
};

export default Home;
