const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const userslistDB = require("./models/userDetails");

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
