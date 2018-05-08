"use strict";
//import dependency
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.
var ArticleSchema = new Schema({
  author: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  headline: {
    type: String,
    required: true
  },
  abstract: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: Date,
  likes: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  tag: [String]
});
//export our module to use in server.js
module.exports = mongoose.model("Article", ArticleSchema);
