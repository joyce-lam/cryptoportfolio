const router = require("express").Router();
var path = require("path");
var express = require("express");
var db = require("../../models");
const Op = db.Sequelize.Op;

const coinsController = require("../../controllers/coinsController");

// Matches with "/api/coins/recentTopN"
router.route("/recentTopN")
	.get(coinsController.getTopNBy24HVol)



module.exports = router;
