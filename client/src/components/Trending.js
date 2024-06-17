import React, { useState, useEffect } from "react";
import Mainpage from "./Mainpage";
import "remixicon/fonts/remixicon.css";
import Cookies from "js-cookie";

const Trending = () => {
  const port = 4444;
  const thisPage = "Trending";
  const [videosArray, setVideosArray] = useState([]);
  const [loading, setLoading] = useState("Loading");
  const [myProps, setProps] = useState({ videos: [], src: thisPage });

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
      setProps({ videos: videosArray, src: thisPage });
      console.log(`${thisPage} : Fetched ${videosArray.length} videos`);
    } else if (loading === "Fetched" && myProps.videos.length === 0) {
      setProps({ videos: videosArray, src: thisPage });
      setLoading("Displayed");
    } else if (loading === "Failed") {
      setProps({ videos: videosArray, src: thisPage });
    } else {
      console.log(`${thisPage} : Page is already ${loading}`);
    }
  }, []);

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
          (video_json) => video_json.video_category === thisPage
        );
        setVideosArray(filterdData);
        console.log(filterdData);
        setLoading("Fetched");
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
    <div>
      {loading === "Failed" ||
      loading === "Displayed" ||
      myProps.videos.length > 0 ? (
        <Mainpage props={myProps} />
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default Trending;
