const request = require("request");
const rq = require("request-promise")
const db = require("../models");
const Op = db.Sequelize.Op;

module.exports = {
	findAllCrypto: function(req, res) {
		req.params.userId = 1

		db.UserCryptocurrency.findAll({
			where: {
				UserId: req.params.userId
			},
			include: [{
				model: db.Cryptocurrency,
				attributes: ["symbol"]
			}]
		}).then(dbUserCrypto => {
			return res.json(dbUserCrypto)
		}).catch(function(err) {
			res.status(500).json(err)
		})
	}, 
	findAllCryptoData: function(req, res) {
		rq({
    		url: `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${req.params.coinArr}&tsyms=USD`,
			headers: {
				 "Accept": "application/json",
			     "Content-Type": "application/json"
			},
			method: "GET",
			json: true

			}).then(result => {
				console.log(result.DISPLAY)

				let cryptoArr = req.params.coinArr.split(",")
				//console.log("arr", cryptoArr)
				let shares = req.params.shareArr.split(",")
				//console.log("s", shares)
	      		let dataArray = []
	      		let valueArray = []	
	      		cryptoArr.forEach((one, ind) => {
	      			let dataObj = {}
	      			dataObj["key"] = one
	      			let valPerShare = result.DISPLAY[one].USD.PRICE
	      			valPerShare = valPerShare.split(" ")
	      			valPerShare = valPerShare[1]
	      			valPerShare = valPerShare.replace(",", "")
	      			valPerShare = parseFloat(valPerShare).toFixed(2)
	      			console.log(valPerShare)
	      			let val = valPerShare * parseInt(shares[ind])
	      			dataObj["value"] = val.toFixed(2)
	      			//console.log(dataObj["value"])
	      			dataArray.push(dataObj)
	      			valueArray.push(dataObj["value"])
	      		})

	      		console.log("dataarray", dataArray)
	      		console.log("valuearray", valueArray)
	      		
	      		return dataArray
			}).then(result => {
				return res.json(result)
			}).catch(err => {
				console.log(err)
			})
	}
	
}

