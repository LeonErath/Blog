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

exports.getNewest = function(req, res) {
  Article.find()
    .populate("author")
    .sort({ date: -1 })
    .limit(6)
    .exec(function(err, article) {
      if (err) {
        res.send(err);
        return;
      }
      res.json(article);
    });
};

exports.getTrending = function(req, res) {
  var query = {};
  if (req.query.date) {
    query.date = { $gte: req.query.date };
  }
  if (req.query.topic) {
    query.topic = req.query.topic;
  }

  Article.find(query)
    .populate("author")
    .sort({ likes: -1 })
    .limit(6)
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
    req.body.topic &&
    req.body.date
  ) {
    var article = {
      author: req.body.userID,
      content: req.body.content,
      headline: req.body.headline,
      abstract: req.body.abstract,
      topic: req.body.topic,
      date: req.body.date
    };

    Article.create(article, function(error) {
      if (error) {
        console.log(error);

        return next(error);
      } else {
        console.log("success", req.body.userID);

        return res.send("success");
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

exports.addView = function(req, res, next) {
  Article.findOneAndUpdate(
    { _id: req.params.id },
    { $inc: { views: 1 } },
    { new: true }
  )
    .populate("author")
    .exec(function(err, article) {
      if (err) {
        res.send(err);
        return;
      }
      res.json(article);
    });
};

exports.addLike = function(req, res, next) {
  Article.findOneAndUpdate(
    { _id: req.params.id },
    { $inc: { likes: 1 } },
    { new: true }
  )
    .populate("author")
    .exec(function(err, article) {
      if (err) {
        res.send(err);
        return;
      }
      res.json(article);
    });
};

exports.update = function(req, res, next) {};
exports.delete = function(req, res, next) {};
