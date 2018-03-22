module.exports = function(router) {
  var user = require("../controller/userController.js");

  // Retrieve all user
  router.get("/user", user.findAll);

  router.get("/logout", user.logout);

  router.get("/login", user.login);

  router.post("/register", user.create);

  // Update a Note with noteId
  router.put("/user/:id", user.update);

  // Delete a Note with noteId
  router.delete("/user/:id", user.delete);
};
