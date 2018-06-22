var path = require("path");
var express = require("express");
var db = require("../models");
const Op = db.Sequelize.Op;

const router = express.Router();

router.get("/asdf", function(req, res) {
	res.send("hello world");
});

router.get("/users/:Userid", function(req, res) {
	req.params.Userid = 1
	db.User.findOne({
		where: {
			id: req.params.Userid
		}
	}).then(function(dbUser) {
		res.json(dbUser)
	})
})

router.get("/users/:Userid/cryptocurrencies", function(req, res) {
	req.params.Userid = 1

	db.UserCryptocurrency.findAll({
		where: {
			UserId: req.params.Userid
		},
		include: [{
			model: db.Cryptocurrency,
			attributes: ["symbol"]
		}]
	}).then(function(dbUserCrypto) {
		res.json(dbUserCrypto)
	}).catch(function(err) {
		res.status(500).json(err)
	})
})



module.exports = router;