module.exports = function(router) {
  var article = require("../controller/articleController.js");

  // Create a new Note
  router.post("/article", article.create);

  // Retrieve all article
  router.get("/article", article.findAll);

  router.get("/article/newest", article.getNewest);

  router.get("/article/trending", article.getTrending);

  router.get("/article/:id", article.findOne);

  // Update a Note with noteId
  router.put("/article/:id", article.update);

  router.put("/article/addView/:id", article.addView);

  router.put("/article/addLike/:id", article.addLike);

  // Delete a Note with noteId
  router.delete("/article/:id", article.delete);
};