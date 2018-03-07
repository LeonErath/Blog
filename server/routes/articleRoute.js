module.exports = function(router) {
  var article = require("../controller/articleController.js");

  // Create a new Note
  router.post("/article", article.create);

  // Retrieve all article
  router.get("/article", article.findAll);

  // Update a Note with noteId
  router.put("/article/:id", article.update);

  // Delete a Note with noteId
  router.delete("/article/:id", article.delete);
};
