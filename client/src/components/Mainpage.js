import React, { useState } from "react";
import MyNavbar from "./Navbar";
import Sidebar from "./Sidebar";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import logo_light from "../resources/PFXWatchWhite.png";
import logo_dark from "../resources/PFXWatchBlack.png";
import "./VideoGrid.css";

const Mainpage = (props) => {
  const [showPay, setshowPay] = useState(true);
  const handleClosePay = () => {
    setshowPay(false);
  };
  localStorage.setItem("theme", props.props.curTheme);
  const video_id = "30b642bd-7591-49f4-ac30-5c538f975b15";
  // console.log(props.props.videos);
  return (
    <div>
      <section className="nav_bar_component">
        <MyNavbar
          props={{
            toggleTheme: props.props.themesetter,
            Theme: props.props.curTheme,
          }}
        />
      </section>
      <section className={`container-fluid`}>
        <div className="row">
          <div className="col-md-3">
            <Sidebar props={{ srcpage: props.props.src }} />
          </div>
          <div className={`col-md-9 container`}>
            {showPay && (
              <section>
                <div
                  style={{ backgroundImage: "url(" }}
                  className="col text-right"
                >
                  <Button
                    onClick={handleClosePay}
                    variant={`outline-${
                      props.props.curTheme === "light" ? "dark" : "light"
                    }`}
                    size="sm"
                    className={`${props.props.curTheme} btn btn-primary`}
                  >
                    Close
                  </Button>
                </div>
                <img
                  alt="logo"
                  src={props.props.curTheme !== "dark" ? logo_light : logo_dark}
                  width={"100px"}
                ></img>
                <p>Buy PFX watch Premium prepaid plans with UPI</p>

                <Button
                  variant={`outline-${
                    props.props.curTheme === "light" ? "dark" : "light"
                  }`}
                  size="sm"
                  className={props.props.curTheme}
                >
                  GET IT NOW
                </Button>
                <Button
                  onClick={handleClosePay}
                  variant={`outline-${
                    props.props.curTheme === "light" ? "dark" : "light"
                  }`}
                  size="sm"
                  className={props.props.curTheme}
                >
                  Close
                </Button>
              </section>
            )}

            <InputGroup className={`mb-3 mt-3`}>
              <Form.Control
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <Button
                variant={`outline-${
                  props.props.curTheme === "light" ? "dark" : "light"
                }`}
                // variant={`outline-secondary`}
                size="sm"
                className="input-group-append ri-search-line"
                onClick={props.props.searchHandler}
              ></Button>
            </InputGroup>

            <div className="thumbnail_container border">
              <section className="thumbnails_layout">
                <div className="container">
                  <div className="row">
                    {props.props.videos.map((video_json, index) => (
                      <div className="col-md-4 my-3">
                        <div className="thumbnail_image" key={video_json.id}>
                          <Link to={"/videos/" + video_id}>
                            <img
                              src={video_json.thumbnail_url}
                              alt="Video thumbnail"
                              className="img-fluid w-100 h-100"
                            />
                          </Link>
                        </div>
                        <div className="home_thumbnail_title">
                          <h6 className="my-3" href={""}>
                            {video_json.title}
                          </h6>
                        </div>
                        {video_json.channel && (
                          <div className="home_channel_description d-flex">
                            <div className="channel_logo ">
                              <img
                                src={video_json.channel.profile_image_url}
                                href={video_json.video_url}
                                alt="Channel Thumbnail"
                              />
                            </div>

                            <div className="channel_description ms-2 ">
                              <p>{video_json.channel.name}</p>
                              <p>
                                {video_json.view_count +
                                  " views ⦁ " +
                                  video_json.published_at}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* row */}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Mainpage;
