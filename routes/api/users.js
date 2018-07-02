const express = require("express");
const router = require("express").Router();

const usersController = require("../../controllers/usersController");


// matches with "/api/users/xxxx"
router.route("/cryptocurrencies_list")
	.get(usersController.findAllCrypto)

router.route("/cryptocurrencies_data")
	.get(usersController.findAllCryptoData)

router.route("/add_coin")
	.post(usersController.addCoin)

router.route("/update_coin")
	.put(usersController.updateCoinShares)


module.exports = router;