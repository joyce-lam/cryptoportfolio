const express = require("express");
const router = require("express").Router();

const coinsController = require("../../controllers/coinsController");

// Matches with "/api/coins/xxxxx"
router.route("/recentTopN")
	.get(coinsController.getTopNBy24HVol)

router.route("/all")
	.get(coinsController.getAll)

module.exports = router;
