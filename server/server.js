"use strict";

var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var cookieParser = require("cookie-parser");

var app = express();
var router = express.Router();

//set our port to either a predetermined port number if you have set it up, or 3001
var port = process.env.API_PORT || 3030;

mongoose.connect("mongodb://127.0.0.1:27017");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//now we should configure the APi to use bodyParser and look for JSON data in the body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/bower_components`));

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000 ");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );

  //and remove cacheing so we get the most recent comments
  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.use(cookieParser("keyboard cat"));
//use sessions for tracking logins
app.use(
  session({
    cookieName: "session",
    secret: "this is the default passphrase",
    store: new MongoStore({ mongooseConnection: db }),
    resave: true,
    saveUninitialized: true,
    httpOnly: true,
    secure: true,
    duration: 30 * 60 * 10000,
    activeDuration: 5 * 60 * 10000
  })
);

//now  we can set the route path & initialize the API
router.get("/", function(req, res) {
  res.json({ message: "API Initialized!" });
});

require("./routes/userRoute.js")(router);
require("./routes/commentRoute.js")(router);
require("./routes/articleRoute.js")(router);

//Use our router configuration when we call /api
app.use("/api", router);

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});

// var Article = require("./model/articleSchema.js");

// Article.remove({}, function(err, doc) {
//   if (err) {
//     // handle error
//   }
// });

// var User = require("./model/userSchema.js");

// User.remove({}, function(err, doc) {
//   if (err) {
//     // handle error
//   }
// });
