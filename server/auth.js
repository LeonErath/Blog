exports.check = function(req, res, next) {
  console.log(req.session);
  console.log(req.sessionID);

  if (!req.session.userId) {
    var err = new Error("No Authentication");
    err.status = 400;
    next(err);
  } else {
    req.session.touch();
    next();
  }
};
