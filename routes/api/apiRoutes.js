const router = require("express").Router();
const articleController = require("../../controllers/articleController");

// Matches with "/api/saved"
router.route("/")
  .get(articleController.findAll)
  .post(articleController.create)

router.route("/:id")
    .delete(articleController.remove)
module.exports = router;