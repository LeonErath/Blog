"use strict";
//import dependency
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.
var ArticleSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  headline: String,
  abstract: String,
  topic: String,
  content: String,
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
