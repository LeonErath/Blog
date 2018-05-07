module.exports = function(router) {
  const auth = require("../auth.js");
  const user = require("../controller/userController.js");

  // Retrieve all user
  router.get("/user", user.findAll);

  router.get("/loggedin", auth.check, user.loggedin);

  router.get("/logout", user.logout);

  router.get("/user/getBookmarks", auth.check, user.getBookmarks);

  router.get("/user/getProfile", auth.check, user.getUser);

  router.post("/login", user.login);

  router.post("/register", user.create);

  // Update a Note with noteId

  router.put("/user/addBookmark", auth.check, user.addBookmark);

  router.put("/user/deleteBookmark", auth.check, user.deleteBookmark);

  // Delete a Note with noteId
  router.delete("/user/:id", user.delete);
};
