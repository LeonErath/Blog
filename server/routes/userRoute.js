module.exports = function(router) {
  const auth = require("../auth.js");
  const user = require("../controller/userController.js");

  // Retrieve all user
  router.get("/user", user.findAll);

  router.get("/logout", user.logout);

  router.post("/login", user.login);

  router.post("/register", user.create);

  // Update a Note with noteId
  router.put("/user/:id", user.update);

  // Delete a Note with noteId
  router.delete("/user/:id", user.delete);
};
