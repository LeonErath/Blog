var Article = require("../model/articleSchema.js");
var User = require("../model/userSchema.js");
var multer = require("multer");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/images/article");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  }
});

var upload = multer({ storage: storage }).single("thumbnail");

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

exports.getAll = function(req, res) {
  Article.find({ author: req.params.id })
    .populate("author")
    .sort({ date: -1 })
    .exec(function(err, list) {
      if (err) {
        res.send(err);
        return;
      }
      res.json(list);
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

exports.getRandom = function(req, res, next) {
  Article.count().exec(function(err, count) {
    var random = Math.floor(Math.random() * count);
    Article.findOne()
      .skip(random)
      .populate("author")
      .exec(function(err, result) {
        if (err) {
          res.send(err);
          return;
        } else {
          res.send(result);
        }
      });
  });
};

exports.create = function(req, res, next) {
  upload(req, res, function(err) {
    if (err) {
      console.log(err);

      var err = new Error("No thumbnail upload possible.");
      err.status = 400;
      return next(err);
    }
    if (
      req.body.content &&
      req.body.headline &&
      req.body.abstract &&
      req.body.topic &&
      req.body.date
    ) {
      //var path = req.file.path.substring(6, req.file.path.length);
      var path = "http://127.0.0.1:3030/" + req.file.path;
      console.log(path);

      var article = {
        author: req.session.userId,
        content: req.body.content,
        headline: req.body.headline,
        abstract: req.body.abstract,
        topic: req.body.topic,
        date: req.body.date,
        thumbnail: path
      };

      Article.create(article, { upsert: true }, function(error) {
        if (error) {
          console.log(error);

          return next(error);
        } else {
          console.log("success", req.body.userID);
          return res.send(article);
        }
      });
    } else {
      var err = new Error("All fields required.");
      err.status = 400;
      return next(err);
    }
  });
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

exports.update = function(req, res, next) {
  Article.update(
    { _id: req.params.id },
    {
      headline: req.body.headline,
      abstract: req.body.abstract,
      content: req.body.content,
      date: req.body.date,
      topic: req.body.topic
    }
  ).exec(function(err) {
    if (err) {
      res.send(err);
      return;
    }
    res.send("Successfully updated Article");
  });
};
exports.delete = function(req, res, next) {
  Article.remove({ _id: req.params.id, author: req.session.userId }).exec(
    function(err) {
      if (err) {
        res.send(err);
        return;
      }
      res.send("Successfully delete Article");
    }
  );
};
