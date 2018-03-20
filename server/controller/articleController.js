var Article = require("../model/articleSchema.js");
var User = require("../model/userSchema.js");

exports.findAll = function(req, res) {
  Article.find()
    .populate("author")
    .exec(function(err, article) {
      if (err) {
        res.send(err);
        return;
      }
      res.json(article);
    });
};

exports.create = function(req, res, next) {
  if (
    req.body.content &&
    req.body.userID &&
    req.body.headline &&
    req.body.abstract &&
    req.body.date
  ) {
    var article = {
      author: req.body.userID,
      content: req.body.content,
      headline: req.body.headline,
      abstract: req.body.abstract,
      date: req.body.date
    };

    Article.create(article, function(error) {
      if (error) {
        console.log(error);

        return next(error);
      } else {
        console.log("success");

        next(res.json({ message: "Article successfully added!" }));
      }
    });
  } else {
    var err = new Error("All fields required.");
    err.status = 400;
    return next(err);
  }
};

exports.findOne = function(req, res) {
  Article.findById(req.params.id)
    .populate("author")
    .exec(function(err, article) {
      if (err) res.send(err);
      res.json(article);
    });
};

exports.update = function(req, res, next) {};
exports.delete = function(req, res, next) {};
