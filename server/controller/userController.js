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

    res.json(data);
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

// exports.login = function(req, res, next) {
//   console.log(req.session);

//   User.findById(req.session.userId).exec(function(error, user) {
//     if (error) {
//       return next(error);
//     } else {
//       if (user === null) {
//         var err = new Error("Not authorized! Go back!");
//         err.status = 400;
//         return next(err);
//       } else {
//         return res.send(
//           "<h1>Name: </h1>" +
//             user.username +
//             "<h2>Mail: </h2>" +
//             user.email +
//             '<br><a type="button" href="/logout">Logout</a>'
//         );
//       }
//     }
//   });
// };

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
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error("Passwords do not match.");
    err.status = 400;
    return res.next(err);
  }
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
      passwordConf: req.body.passwordConf
    };

    User.create(userData, function(error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        req.session.cookie.maxAge = 300000;
        req.session.save(err => {
          if (!err) {
            res.send("success");
          } else {
            return res.send(err);
          }
        });
      }
    });
  } else {
    console.log(req.bod);

    var err = new Error("All fields required.");
    err.status = 400;
    return next(err);
  }
};

exports.update = function(req, res, next) {};
exports.delete = function(req, res, next) {};
