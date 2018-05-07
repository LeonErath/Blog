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
      console.log(err);
      return res.status(400).json({
        header: "Admin Error",
        message: "Could not find any User. Make sure some user exist."
      });
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
        console.log(err);
        return res.status(400).json({
          header: "Bookmark Error",
          message: "Could not delete your Bookmark. Please try again later."
        });
      }
      res.send(data);
    });
};

exports.getBookmarks = function(req, res) {
  User.findOne({ _id: req.session.userId })
    .populate({ path: "bookmarks", populate: { path: "author" } })
    .exec(function(err, data) {
      if (err) {
        console.log(err);
        return res.status(400).json({
          header: "Bookmark Error",
          message: "Could not get your Bookmarks. Please try again later."
        });
      }
      res.send(data);
    });
};

exports.addBookmark = function(req, res) {
  User.findOneAndUpdate(
    { _id: req.session.userId },
    { $addToSet: { bookmarks: req.body.articleId } }
  ).exec(function(err, data) {
    if (err) {
      console.log(err);
      return res.status(400).json({
        header: "Bookmark Error",
        message:
          "Could not add Article to your Bookmarks. Please try again later."
      });
    }
    res.send("Article successfully added to BookmarkList");
  });
};

exports.loggedin = function(req, res, next) {
  User.findOne({ _id: req.session.userId }).exec(function(err, user) {
    if (err) {
      console.log(err);
      return res.status(400).json({
        header: "Session Error",
        message: "User with Session was deleted. Please log in again."
      });
    }
    var userJSON = {
      username: user.username,
      userId: user._id,
      email: user.email,
      profile: user.profilePicture,
      bookmarks: user.bookmarks
    };
    res.json(userJSON);
  });
};

exports.login = function(req, res, next) {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function(error, user) {
      if (error || !user) {
        console.log(error);
        return res.status(400).json({
          header: "Authentication Error",
          message:
            " Wrong email or password. Please enter your correct credentials."
        });
      } else {
        req.session.cookie.maxAge = 36000000;
        req.session.userId = user._id;
        req.session.save(err => {
          if (!err) {
            res.send("success");
          } else {
            console.log(err);
            return res.status(400).json({
              header: "Session Error",
              message: "Session could not be created. Please try againg."
            });
          }
        });
      }
    });
  }
};

exports.getUser = function(req, res) {
  User.findById(req.session.userId).exec(function(err, user) {
    if (err) {
      console.log(err);
      return res.status(400).json({
        header: "User Error",
        message: "User could not be found."
      });
    }
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
        console.log(err);
        return res.status(400).json({
          header: "Session Error",
          message: "Session could not be deleted. Please try againg."
        });
      } else {
        return res.send("deleted");
      }
    });
  }
};

exports.create = function(req, res, next) {
  upload(req, res, function(err) {
    if (err) {
      console.log(err);
      return res.status(400).json({
        header: "Image Upload Error [1]",
        message:
          "Profile Picutre could not be uploaded. Maybe try a diffrent picture. The following formats are allowed: image/jpeg,image/jpg,image/tiff,image/gif,image/png"
      });
    }
    if (req.body.password !== req.body.passwordConf) {
      console.log("Passwords do not match");
      return res.status(400).json({
        header: "Credential Error",
        message: "Passwords do not match. Please enter again."
      });
    }
    if (req.file == undefined) {
      console.log("Path is undefined");
      return res.status(400).json({
        header: "Image Upload Error [2]",
        message:
          "Profile Picutre could not be uploaded. Maybe try a diffrent picture. The following formats are allowed: image/jpeg,image/jpg,image/tiff,image/gif,image/png"
      });
    }
    var path = "http://127.0.0.1:3030/" + req.file.path;
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
              console.log(err);
              return res.status(400).json({
                header: "Session Error",
                message: "Session could not be deleted. Please try againg."
              });
            }
          });
        }
      });
    } else {
      return res.status(400).json({
        header: "Credential Error",
        message: "All fields are required to create an account."
      });
    }
  });
};

exports.update = function(req, res, next) {};
exports.delete = function(req, res, next) {};
