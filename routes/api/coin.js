const express = require("express");
const router = require("express").Router();


const coinController = require("../../controllers/coinController");

// Matches with "/api/coin/:symbol"
router.route("/:symbol")
	.get(coinController.findCurrentPrice)

router.route("/:symbol/hour/:dateTimeRange")
	.get(coinController.findPastHour)

router.route("/:symbol/day/:dateTimeRange")
	.get(coinController.findPastDay)

module.exports = router;
