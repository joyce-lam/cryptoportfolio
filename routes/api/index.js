const router = require("express").Router();
const usersRoutes = require("./users");
const coinsRoutes = require("./coins");
const coinRoutes = require("./coin");

router.use("/users", usersRoutes);
router.use("/coins", coinsRoutes);
router.use("/coin", coinRoutes);

module.exports = router;