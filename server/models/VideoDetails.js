//Importing mongoose module.
const mongoose = require("mongoose");

// Defining a schema

// Video_url
// Video_title: Hi Nanna: Adigaa | Nani, Mrunal Thakur, Baby Kiara | Hesham Abdul Wahab | Krishna Kanth | Shouryuv
// Description: Movie: Hi Nanna, Artist Name: Nani,Mrunal Thakur,Jaya Ram,Priyadarsh
// Views_count: 6284378
// Published_date:Dec 13, 2023
// Channel_logo: https://yt3.ggpht.com/ytc/AIdro_lS5X9km3AcAwGqnmAK9O5KwIY8uIe6flMlrzj8MA=s48-c-k-c0x00ffffff-no-rj
// Channel_name: T-Series Telugu
// Subscribers: 9.24M
// Category: Trending
// Saved: False
// Thubnail_url:https://i.ytimg.com/vi/3pGAEyVtlwM/mqdefault.jpg
const videoSchema = new mongoose.Schema({
  video_url: { type: String },
  video_title: { type: String },
  video_desc: { type: String },
  video_views_count: { type: String },
  video_published_date: { type: String },
  video_category: { type: String },
  video_thumbnail_url: { type: String },
  channel_logo_url: { type: String },
  channel_name: { type: String },
  channel_subs: { type: String },
  video_saved: { type: String },
  video_liked: { type: String },
  video_disliked: { type: String },
});

// compile model from schema
// The first argument - Mongoose will create database collection for 'users' and
// Second Argument - is the schema you want to use in creating the model.
const videolistDB = mongoose.model("videos", videoSchema);
module.exports = videolistDB;
