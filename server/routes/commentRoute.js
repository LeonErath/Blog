module.exports = function(router) {
  var comment = require("../controller/commentController.js");

  // Create a new Note
  router.post("/comment", comment.create);

  // Retrieve all comment
  router.get("/comment", comment.findAll);

  // Update a Note with noteId
  router.put("/comment/:id", comment.update);

  // Delete a Note with noteId
  router.delete("/comment/:id", comment.delete);
};
