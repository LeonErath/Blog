module.exports = function(router) {
  var user = require("../controller/userController.js");

  // Create a new Note
  router.post("/user", user.create);

  // Retrieve all user
  router.get("/user", user.findAll);

  // Update a Note with noteId
  router.put("/user/:id", user.update);

  // Delete a Note with noteId
  router.delete("/user/:id", user.delete);
};
