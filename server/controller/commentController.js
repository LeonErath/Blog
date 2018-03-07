var Comment = require("../model/commentSchema.js");

//adding the /comments route to our /api router
exports.findAll = function(req, res) {
  Comment.find(function(err, comments) {
    if (err) res.send(err);
    res.json(comments);
  });
};

exports.create = function(req, res) {
  console.log(res);

  var comment = new Comment({
    author: req.body.author,
    text: req.body.text,
    date: req.body.date
  });

  comment.save(function(err) {
    if (err) res.send(err);
    res.json({ message: "Comment successfully added!" });
  });
};

exports.update = function(req, res, next) {};
exports.delete = function(req, res, next) {};
