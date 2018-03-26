exports.check = function(req, res, next) {
  if (!req.session.userId) {
    res.send("No authentication");
  } else {
    next();
  }
};
