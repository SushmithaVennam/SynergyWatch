import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Saved from "./components/Saved";
import Liked from "./components/Liked";
import Gaming from "./components/Gaming";
import Trending from "./components/Trending";
import Login from "./components/Login";
import Register from "./components/Register";
import VideoPlayback from "./components/VideoPlayback";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <div className="">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/videos/:videoID" element={<VideoPlayback />} />

        <Route exact path="/trending" element={<Trending />} />
        <Route exact path="/gaming" element={<Gaming />} />
        <Route exact path="/saved" element={<Saved />} />
        <Route exact path="/liked" element={<Liked />} />
        <Route exact path="/notfound" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/notfound" replace />} />
      </Routes>
    </div>
  );
}

export default App;
