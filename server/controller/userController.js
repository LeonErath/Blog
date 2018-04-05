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

exports.loggedin = function(req, res, next) {
  return res.send("success");
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
            console.log("Session", req.session);
            console.log(req.sessionID);
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
