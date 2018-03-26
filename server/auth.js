exports.check = function(req, res, next) {
  // console.log(req);
  console.log(req.url);
  console.log(req.session.userId);
  console.log(req.sessionID);

  if (!req.session.userId) {
    res.send("No authentication");
  } else {
    console.log("Successful authentication");

    next();
  }
};
