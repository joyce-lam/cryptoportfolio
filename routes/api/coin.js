const express = require("express");
const router = require("express").Router();


const coinController = require("../../controllers/coinController");

// Matches with "/api/coin/:symbol"
router.route("/:symbol")
	.get(coinController.findPrice)



module.exports = router;
