const express = require("express");
const router = require("express").Router();

const coinController = require("../../controllers/coinController");

// Matches with "/api/coin/:symbol"
router.route("/price")
	.get(coinController.findCurrentPrice);

router.route("/historical_hour")
	.get(coinController.findPastHours);

router.route("/historical_day")
	.get(coinController.findPastDays);

module.exports = router;
