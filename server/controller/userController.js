var User = require("../model/userSchema.js");
var multer = require("multer");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/images/profile");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  }
});

var upload = multer({ storage: storage }).single("profile");

exports.findAll = function(req, res) {
  User.find(function(err, data) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(data);
  });
};

exports.deleteBookmark = function(req, res) {
  User.findOneAndUpdate(
    { _id: req.session.userId },
    { $pullAll: { bookmarks: [req.body.articleId] } },
    { new: true }
  )
    .populate({ path: "bookmarks", populate: { path: "author" } })
    .exec(function(err, data) {
      if (err) {
        res.send(err);
        return;
      }
      res.send(data);
    });
};

exports.getBookmarks = function(req, res) {
  User.findOne({ _id: req.session.userId })
    .populate({ path: "bookmarks", populate: { path: "author" } })
    .exec(function(err, data) {
      if (err) {
        res.send(err);
        return;
      }
      res.send(data);
    });
};

exports.addBookmark = function(req, res) {
  User.findOneAndUpdate(
    { _id: req.session.userId },
    { $push: { bookmarks: req.body.articleId } }
  ).exec(function(err, data) {
    if (err) {
      res.send(err);
      return;
    }
    res.send("Article successfully added to BookmarkList");
  });
};

exports.loggedin = function(req, res, next) {
  User.findOne({ _id: req.session.userId }).exec(function(err, data) {
    if (err) {
      res.send(err);
      return;
    }
    res.send("Success");
  });
};

exports.login = function(req, res, next) {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function(error, user) {
      if (error || !user) {
        var err = new Error("Wrong email or password.");
        err.status = 401;
        return next(err);
      } else {
        req.session.cookie.maxAge = 36000000;
        req.session.userId = user._id;
        req.session.save(err => {
          if (!err) {
            res.send("success");
          } else {
            return res.send(err);
          }
        });
      }
    });
  }
};

exports.getUser = function(req, res) {
  User.findById(req.session.userId).exec(function(err, user) {
    if (err) {
      return res.send(err);
    }
    console.log(user);

    res.send({
      username: user.username,
      email: user.email,
      permission: user.permission,
      profilePicture: user.profilePicture
    });
  });
};

exports.logout = function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.send("deleted");
      }
    });
  }
};

exports.create = function(req, res, next) {
  upload(req, res, function(err) {
    if (err) {
      var err = new Error("No profile upload possible.");
      err.status = 400;
      return next(err);
    }
    if (req.body.password !== req.body.passwordConf) {
      var err = new Error("Passwords do not match.");
      err.status = 400;
      return next(err);
    }
    if (req.file == undefined) {
      var err = new Error("No profile upload possible.");
      err.status = 400;
      return next(err);
    }
    var path = req.file.path.substring(6, req.file.path.length);
    if (
      req.body.email &&
      req.body.username &&
      req.body.password &&
      req.body.passwordConf
    ) {
      var userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        passwordConf: req.body.passwordConf,
        profilePicture: path
      };
      console.log(userData);

      User.create(userData, function(error, user) {
        console.log(user);
        if (error) {
          return next(error);
        } else {
          req.session.userId = user._id;
          req.session.cookie.maxAge = 300000;
          req.session.save(err => {
            if (!err) {
              res.send("success");
            } else {
              return next(err);
            }
          });
        }
      });
    } else {
      var err = new Error("All fields required.");
      err.status = 400;
      return next(err);
    }
  });
};

exports.update = function(req, res, next) {};
exports.delete = function(req, res, next) {};
