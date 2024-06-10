import React, { useState, useEffect } from "react";
import Mainpage from "./Mainpage";
import "remixicon/fonts/remixicon.css";
import Cookies from "js-cookie";

const Liked = () => {
  const [videosArray, setVideos] = useState(
    JSON.parse("[" + localStorage.getItem("video_json") + "]") || []
  );
  const [loading, setLoading] = useState("Loading");
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

  const fetchVideos = () => {
    console.log(videosArray);
    const filterdData = videosArray.filter((video_json) => video_json.liked);
    setVideos(filterdData);

    setLoading(false);
  };

  const props = {
    videos: videosArray,
    src: "Liked",
  };

  return (
    <div>
      <Mainpage props={props} />
    </div>
  );
};

export default Liked;
