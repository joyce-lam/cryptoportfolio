const router = require("express").Router();

const authRoutes = require("./auth-routes")

router.use("/", authRoutes);

module.exports = router;