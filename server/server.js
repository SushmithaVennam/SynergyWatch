const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const videolistDB = require("./models/VideoDetails");
const userslistDB = require("./models/userDetails");
const middleware = require("./middleware/jwtAuth");

const app = express();
app.use(express.json());
app.use(cors());

const port = 4444;

mongoose
  .connect(
    `mongodb+srv://vsushmitha10:sushmitha123@cluster0.k0zsrdo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("DB Connected from index.js");
  })
  .catch((err) => {
    console.log(err.message);
    return res.status(401).json({ message: err.message });
  });

app.post("/add-video", middleware, async (req, res) => {
  try {
    let oldvideo = await videolistDB.findOne({ video_url: req.body.video_url });
    if (oldvideo) {
      return res
        .status(200)
        .json({ message: "Video already exists", oldvideo });
    }

    const sendVideoDetails = await videolistDB.create(req.body);
    return res
      .status(201)
      .json({ message: "Video details saved succesfully", sendVideoDetails });
  } catch (error) {
    console.log("add-video: " + error.message);
    return res.status(500).json({ message: "failed. " + error.message });
  }
});

app.put("/save-video", middleware, async (req, res) => {
  try {
    let id = "";
    let saved = "False";
    if (req.body.hasOwnProperty("id")) {
      id = req.body.id;
      saved = req.body.video_saved;
    } else if (req.body.jsonbody.hasOwnProperty("id")) {
      id = req.body.jsonbody.id;
      saved = req.body.jsonbody.video_saved;
    }

    console.log("Video id " + id + " saved is " + saved);
    if (id.length > 0) {
      let oldvideo = await videolistDB.findOne({ _id: id });
      if (!oldvideo) {
        console.log("Video " + id + " not found");
        return res.status(400).send({ message: "Video not found" });
      }
      oldvideo.video_saved = saved;
      const updatedUser = oldvideo.save();
      console.log("Video_saved is set to " + saved);
      return res
        .status(200)
        .json({ message: "Video_saved is set to " + saved });
    }
    return res.status(400).send({ message: "ID not provided" });
  } catch (error) {
    console.log("save-video: " + error.message);
    res.status(400).json({ message: error.message });
  }
});

app.get("/get-video-details", middleware, async (req, res) => {
  try {
    const Videos = await videolistDB.find();
    return res.status(200).json(Videos);
  } catch (error) {
    console.log("get-video-details: " + error.message);
    return res.status(400).json({ message: error.message });
  }
});

app.post("/get-one-video", middleware, async (req, res) => {
  try {
    // console.log("keys array = ", Object.keys(req.body));
    // console.log("values array = ", Object.values(req.body));
    // console.log("req.body.jsonbody ", req.body.jsonbody);
    // console.log("req.body.jsonbody.id ", req.body.jsonbody.id);
    let id = "";
    if (req.body.hasOwnProperty("id")) {
      id = req.body.id;
    } else if (req.body.jsonbody.hasOwnProperty("id")) {
      id = req.body.jsonbody.id;
    }
    if (id.length > 0) {
      let oldvideo = await videolistDB.findOne({ _id: id });
      if (!oldvideo) {
        console.log("Video " + id + " not found");
        return res.status(400).send("Video not found");
      }
      console.log("Returning " + oldvideo);
      return res.status(200).json(oldvideo);
    } else {
      console.log("id is not present in req.body");
    }
    return res.status(400).send('Video "' + id + '" not found');
  } catch (error) {
    let msg = "get-one-video: " + error.message;
    console.log(msg);
    return res.status(400).json({ message: msg });
  }
});

app.post("/signup", async (req, res) => {
  try {
    // const { name, email, phno, address, password } = req.body;
    const { email, password } = req.body;
    const checkUser = await userslistDB.findOne({ email: email });
    if (checkUser) {
      console.log("User already exists");
      return res
        .status(400)
        .json({ message: "user already exists. Please login." });
    }
    if (req.body.password !== req.body.confirmpassword) {
      return res.status(400).json({ message: "passwords doesnot match" });
    }
    // const hashedPassword = await bcrypt.hash(password, 10);
    // req.body.password = hashedPassword;

    const newUser = await userslistDB.create(req.body);
    console.log("New user signedup");
    return res.status(201).json({ message: "User added succesfully" });
  } catch (error) {
    console.log("Failed to add User details, " + error.message);
    return res
      .status(500)
      .json({ message: "failed to add User details." + error.message });
  }
});

// login api
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await userslistDB.findOne({ email: email });
    if (!userExist) {
      console.log("User " + email + " doesn't exist");
      return res
        .status(406)
        .json({ message: "User doesnot exist. Please register as new user" });
    }
    // const passwordMatched = await bcrypt.compare(password, userExist.password);
    if (userExist.password != password) {
      console.log("Invalid password " + password);
      return res
        .status(401)
        .json({ message: "Username or Password is Invalid." });
    }
    const token = jwt.sign({ email: userExist.email }, "secretToken", {
      expiresIn: "1hr",
    });
    //create json webtoken
    console.log("User " + email + " logged in succesfully");
    return res.status(200).json({ message: "loggedin successfully", token });
  } catch (error) {
    console.log("Login failed : " + error.message);
    return res.status(401).send("Login failed : " + error.message);
  }
});

app.listen(port, () => {
  console.log("server is running on port " + port);
});
