module.exports = function(router) {
  const auth = require("../auth.js");
  var article = require("../controller/articleController.js");

  // Create a new Note
  router.post("/article/create", auth.check, article.create);

  // Retrieve all article
  router.get("/article", article.findAll);

  router.get("/article/newest", article.getNewest);

  router.get("/article/trending", article.getTrending);

  router.get("/article/featured", article.getRandom);

  router.get("/article/getAll/:id", article.getAll);

  router.get("/article/:id", article.findOne);

  // Update a Note with noteId
  router.put("/article/:id", auth.check, article.update);

  router.put("/article/addView/:id", auth.check, article.addView);

  router.put("/article/addLike/:id", auth.check, article.addLike);

  // Delete a Note with noteId
  router.delete("/article/:id", auth.check, article.delete);
};
