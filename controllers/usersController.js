const request = require("request");
const rq = require("request-promise")
const db = require("../models");
const Op = db.Sequelize.Op;

module.exports = {
	findAllCrypto: function(req, res) {
		//console.log(req.query)

		db.UserCryptocurrency.findAll({
			where: {
				UserId: req.query.userId
			},
			include: [{
				model: db.Cryptocurrency,
				attributes: ["id", "name", "symbol"]
			}]
		}).then(dbUserCrypto => {
			//console.log(dbUserCrypto[0].dataValues)

			let userCryptoArrayWithShares = []
			dbUserCrypto.forEach((one, ind) => {
				let coinObj = {}
				coinObj["cryptoId"] = dbUserCrypto[ind].dataValues.Cryptocurrency.dataValues.id
				coinObj["cryptoName"] = dbUserCrypto[ind].dataValues.Cryptocurrency.dataValues.name
				coinObj["cryptoSymbol"] = dbUserCrypto[ind].dataValues.Cryptocurrency.dataValues.symbol
    			coinObj["shares"] = dbUserCrypto[ind].dataValues.share
    			userCryptoArrayWithShares.push(coinObj)
			})
			return res.json(userCryptoArrayWithShares)
		}).catch(function(err) {
			res.status(500).json(err)
		})
	}, 
	findAllCryptoData: function(req, res) {
		//console.log(req.query)
		
		rq({
    		url: `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${req.query.coinArr}&tsyms=USD`,
			headers: {
				 "Accept": "application/json",
			     "Content-Type": "application/json"
			},
			method: "GET",
			json: true

			}).then(result => {
				//console.log(result.DISPLAY)

				let cryptoArr = req.query.coinArr.split(",")
				//console.log("arr", cryptoArr)
				let shares = req.query.shareArr.split(",")
				//console.log("s", shares)
	      		let dataArray = []
	      		cryptoArr.forEach((one, ind) => {
	      			let dataObj = {}
	      			dataObj["key"] = one
	      			let valPerShare = result.DISPLAY[one].USD.PRICE
	      			valPerShare = valPerShare.split(" ")
	      			valPerShare = valPerShare[1]
	      			valPerShare = valPerShare.replace(",", "")
	      			valPerShare = parseFloat(valPerShare).toFixed(2)
	      			//console.log(valPerShare)
	      			dataObj["currentPrice"] = valPerShare
	      			let val = valPerShare * parseInt(shares[ind])
	      			dataObj["value"] = val.toFixed(2)
	      			dataArray.push(dataObj)	
	      		})

	      		//console.log("dataarray", dataArray)      		
	      		return dataArray
			}).then(result => {
				return res.json(result)
			}).catch(err => {
				console.log(err)
			})
	},
	addCoin: function(req, res) {
		//console.log(req.body) 
		//{ userId: 1, selectedCoinId: 28, shares: '1' }
		db.UserCryptocurrency.findAll({
			where: {
				UserId: req.body.userId,
				CryptocurrencyId: req.body.selectedCoinId
			}
		}).then(result => {
			if (result.length == 0) {
				db.UserCryptocurrency.create({
					UserId: req.body.userId,
					CryptocurrencyId: req.body.selectedCoinId,
					share: req.body.shares
				}).then(dbUserCrypto => {
					console.log("added coin")
					return res.json(dbUserCrypto)
				}).catch(err => {
					console.log(err)
					res.status(500).json(err)
				})

			} else {
				let currentShare = result[0].dataValues.share
				let shareToUpdate = parseFloat(currentShare) + parseFloat(req.body.shares)
		
				db.UserCryptocurrency.update(
					{share: shareToUpdate}, {
						where: {
							CryptocurrencyId: req.body.selectedCoinId,
							UserId: req.body.userId
						}
					}).then(dbUserCrypto => {
						console.log("updated coin with added shares")
						return res.json(dbUserCrypto)
					}).catch(err => {
						console.log(err)
						res.status(500).json(err)
					})
			}
		}).catch(err => {
			console.log("add coin err",err)
		})	
	},
	updateCoinShares: function(req, res) {
		console.log(req.body.params)
		// { userId: 1, selectedCoinId: 1, shares: 4.9 }

		db.UserCryptocurrency.findAll({
			where: {
				UserId: req.body.params.userId,
				CryptocurrencyId: req.body.params.selectedCoinId
			}
		}).then(result => {
			let currentShare = result[0].dataValues.share
			let shareToUpdate = parseFloat(currentShare) - parseFloat(req.body.params.shares)
			console.log("current", currentShare, "shareToUpdate", shareToUpdate)

			if (shareToUpdate == 0) {
				db.UserCryptocurrency.destroy({
					where: {
						UserId: req.body.params.userId,
						CryptocurrencyId: req.body.params.selectedCoinId
					}
				}).then(result => {
					console.log("deleted coin")
				}).catch(err => {
					console.log(err)
				})

			} else if (shareToUpdate > 0) {
				db.UserCryptocurrency.update(
					{share: req.body.params.shares}, {
						where: {
							CryptocurrencyId: req.body.params.selectedCoinId,
							UserId: req.body.params.userId
						}
					}).then(dbUserCrypto => {
						return res.json(dbUserCrypto)
					}).catch(err => {
						console.log(err)
						res.status(500).json(err)
					})
			} 
		}).catch(err => {
			console.log(err)
		})
	
	}
	
}

