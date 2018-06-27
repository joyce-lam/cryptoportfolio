const express = require("express");
const router = require("express").Router();

const coinsController = require("../../controllers/coinsController");

// Matches with "/api/coins/recentTopN"
router.route("/recentTopN")
	.get(coinsController.getTopNBy24HVol)

	

module.exports = router;
