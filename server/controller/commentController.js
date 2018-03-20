var Comment = require("../model/commentSchema.js");

// adding the /comments route to our /api router
exports.findAll = function(req, res) {
  Comment.find({ article: req.query.articleID }).exec(function(err, comments) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(comments);
  });
};

exports.create = function(req, res) {
  console.log(res);
  if (req.body.author && req.body.date && req.body.text && req.body.articleID) {
    var comment = new Comment({
      article: req.body.articleID,
      author: req.body.author,
      text: req.body.text,
      date: req.body.date
    });

    comment.save(function(err) {
      if (err) res.send(err);
      res.json({ message: "Comment successfully added!" });
    });
  } else {
    res.send("Not all fields filled.");
  }
};

exports.update = function(req, res, next) {};
exports.delete = function(req, res, next) {};
