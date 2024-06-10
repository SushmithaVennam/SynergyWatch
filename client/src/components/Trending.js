import React, { useEffect } from "react";
import Mainpage from "./Mainpage";
import "remixicon/fonts/remixicon.css";
import Cookies from "js-cookie";
import data from "../resources/trending.json";
const Trending = () => {
  const videosArray = data.videos;

  useEffect(() => {
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken === undefined) {
      Cookies.remove("jwt_token");
      window.location.href = "/login";
    }
  });

  const props = {
    videos: videosArray,
    src: "Trending",
  };

  return (
    <div>
      <Mainpage props={props} />
    </div>
  );
};

export default Trending;
