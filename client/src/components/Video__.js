import React from "react";

const Video = (props) => {
  const { videoDetails } = props;
  console.log(videoDetails);
  const {
    // __v,
    // _id,
    video_url,
    video_title,
    // video_views_count,
    video_thumbnail_url,
    // video_saved,
    video_published_date,
    // video_category,
    channel_name,
    channel_logo_url,
  } = videoDetails;
  // function Video(props) {
  // console.log("Props is " + props);
  // const { data } = props;
  // console.log("data is " + data);
  return (
    <div className="col-md-4 my-3">
      <div className="thumbnail_image">
        <img src={video_thumbnail_url} href={video_url} alt="Video Thumbnail" />
      </div>
      <div className="home_thumbnail_title">
        <h6 className="my-3">{video_title}</h6>
      </div>
      <div className="home_channel_description d-flex">
        <div className="channel_logo">
          <img src={channel_logo_url} alt="Channel thumbnail" />
        </div>
        <div className="channel_description ms-2 ">
          <p>{channel_name}</p>
          <p>9.24M subscribers</p>
          <p>{video_published_date}</p>
        </div>
      </div>
    </div>
  );
};

export default Video;
