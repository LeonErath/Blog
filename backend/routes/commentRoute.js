module.exports = function(router) {
  const auth = require("../auth.js");
  var comment = require("../controller/commentController.js");

  // Create a new Note
  router.post("/comment", auth.check, comment.create);

  // Retrieve all comment
  router.get("/comment", comment.findAll);

  // Update a Note with noteId
  router.put("/comment/:id", auth.check, comment.update);

  // Delete a Note with noteId
  router.delete("/deleteComment/:id", auth.check, comment.delete);
};
