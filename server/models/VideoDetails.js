//Importing mongoose module.
const mongoose = require("mongoose");

// Defining a schema

// {
//   "video_details": {
//       "id": "30b642bd-7591-49f4-ac30-5c538f975b15",
//       "title": "Sehwag shares his batting experience in iB Cricket | iB Cricket Super Over League",
//       "video_url": "https://www.youtube.com/embed/wB6IFCeTssk",
//       "thumbnail_url": "https://assets.ccbp.in/frontend/react-js/nxt-watch/ibc-sol-1-img.png",
//       "channel": {
//           "name": "iB Cricket",
//           "profile_image_url": "https://assets.ccbp.in/frontend/react-js/nxt-watch/ib-cricket-img.png",
//           "subscriber_count": "4.13K"
//       },
//       "view_count": "1.4K",
//       "published_at": "Apr 19, 2019",
//       "description": "Destructive opening batsman, Virender Sehwag was impressed by iB Cricket, as he prepared himself up for the world’s first VR Cricket League, iB Cricket Super Over League."
//   }
// }

const videoSchema = new mongoose.Schema({
  _id: { type: String },
  title: { type: String },
  video_url: { type: String },
  thumbnail_url: { type: String },
  channel: {
    name: { type: String },
    profile_image_url: { type: String },
    subscriber_count: { type: String },
  },
  view_count: { type: String },
  published_at: { type: String },
  description: { type: String },

  video_category: { type: String },
  saved: { type: String },
  liked: { type: String },
  disliked: { type: String },
});

// compile model from schema
// The first argument - Mongoose will create database collection for 'users' and
// Second Argument - is the schema you want to use in creating the model.
const videolistDB = mongoose.model("videos", videoSchema);
module.exports = videolistDB;
