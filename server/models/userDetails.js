//Importing mongoose module.
const mongoose = require("mongoose");

// Defining a schema
const usersSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmpassword: { type: String, required: true },
});

// compile model from schema
// The first argument - Mongoose will create database collection for 'users' and
// Second Argument - is the schema you want to use in creating the model.
const userslistDB = mongoose.model("users", usersSchema);
module.exports = userslistDB;
