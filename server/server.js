"use strict";

var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var cors = require("cors");

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

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

//use sessions for tracking logins
app.use(
  session({
    cookieName: "session",
    secret: "this is the default passphrase",
    store: new MongoStore({ mongooseConnection: db }),
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: false,
      httpOnly: true
    }
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
