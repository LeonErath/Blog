var Comment = require("../model/commentSchema.js");

// adding the /comments route to our /api router
exports.findAll = function(req, res) {
  Comment.find({ article: req.query.articleID })
    .populate("author")
    .exec(function(err, comments) {
      if (err) {
        res.send(err);
        return;
      }
      res.json(comments);
    });
};

exports.create = function(req, res) {
  if (req.body.date && req.body.text && req.body.articleID) {
    var comment = new Comment({
      article: req.body.articleID,
      author: req.session.userId,
      text: req.body.text,
      date: req.body.date
    });

    comment.save(function(err, comment) {
      if (err) res.send(err);

      Comment.populate(comment, "author", function(err) {
        if (!err) {
          res.json(comment);
        } else {
          res.send(err);
        }
      });
    });
  } else {
    res.send("Not all fields filled.");
  }
};

exports.update = function(req, res, next) {};
exports.delete = function(req, res, next) {
  Comment.remove({ _id: req.params.id }).exec(function(err) {
    if (err) {
      res.send(err);
      return;
    }
    res.send("Comment deleted");
  });
};
