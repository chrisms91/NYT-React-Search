const router = require("express").Router();
const savedRoutes = require("./apiRoutes");

// Book routes
router.use("/saved", savedRoutes);

module.exports = router;