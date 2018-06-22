const router = require("express").Router();
var path = require("path");
var express = require("express");
// var db = require("../models");
// const Op = db.Sequelize.Op;
const coinController = require("../../controllers/coinController");

// Matches with "/api/coin/:symbol"
router.route("/:symbol")
	.get(coinController.findPrice)



module.exports = router;
