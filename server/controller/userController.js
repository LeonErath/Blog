var User = require("../model/userSchema.js");

exports.findAll = function(req, res) {
  User.find(function(err, data) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(data);
  });
};

exports.findOne = function(req, res) {
  User.findById(req.params.id, function(err, data) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(data);
  });
};

exports.create = function(req, res, next) {
  if (
    req.body.username &&
    req.body.password &&
    req.body.email &&
    req.body.name
  ) {
    var userData = {
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      email: req.body.email
    };

    User.create(userData, function(error, user) {
      if (error) {
        console.log(error);

        return next(error);
      } else {
        res.json({ message: "User successfully added!" });
      }
    });
  } else {
    var err = new Error("All fields required.");
    err.status = 400;
    return next(err);
  }
};

exports.update = function(req, res, next) {};
exports.delete = function(req, res, next) {};
