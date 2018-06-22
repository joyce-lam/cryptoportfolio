const express = require("express");
const router = require("express").Router();



const usersController = require("../../controllers/usersController");

router.route("/:userId/cryptocurrencies")
	.get(usersController.findAllCrypto)

router.route("/:userId/cryptocurrencies_data/:coinArr/:shareArr")
	.get(usersController.findAllCryptoData)



module.exports = router;