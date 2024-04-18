import React, { useState, useEffect } from "react";
// import Video from "./Video";
import "./VideoGrid.css";
import { Link } from "react-router-dom";
import Video_playback from "./Video_playback";
import Cookies from "js-cookie";

function VideoGrid() {
  const port = 4444;
  const [videosArray, setVideosArray] = useState([]);
  const [loading, setLoading] = useState("Loading");
  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    Cookies.remove("jwt_token");
    window.location.href = "/login";
  }

  useEffect(() => {
    if (loading) {
      fetchVideos();
    }
  });

  const fetchVideos = async () => {
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
        setVideosArray(data);
        console.log(data);
        setLoading("");
      } else {
        setLoading(response.message);
      }
    } catch (error) {
      console.log("Error while fetching videos. " + error.message);
    }
  };

  if (loading) {
    return <p>{loading}</p>;
  }

  videosArray.map((video_json) => {
    console.log(video_json._id);
  });

  return (
    <div className="thumbnail_container border">
      <section className="thumbnails_layout">
        <div className="container">
          <div className="row">
            {videosArray.map((video_json, index) => (
              <div className="col-md-4 my-3">
                <div className="thumbnail_image" key={index}>
                  <Link to={"/videos/" + video_json._id} target="_blank">
                    <img
                      src={video_json.video_thumbnail_url}
                      alt="Video thumbnail"
                    />
                  </Link>
                </div>
                <div className="home_thumbnail_title">
                  <h6 className="my-3" href={video_json.video_url}>
                    {video_json.video_title}
                  </h6>
                </div>
                <div className="home_channel_description d-flex">
                  <div className="channel_logo border">
                    <img
                      src={video_json.channel_logo_url}
                      href={video_json.video_url}
                      alt="Video Thumbnail"
                    />
                  </div>
                  <div className="channel_description ms-2 ">
                    <p>{video_json.channel_name}</p>
                    <p>9.24M subscribers</p>
                    <p>{video_json.video_published_date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Video_playback />
          {/* row */}
        </div>
      </section>
    </div>
  );
}

export default VideoGrid;
