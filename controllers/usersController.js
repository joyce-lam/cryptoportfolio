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
			//res.json(dbUserCrypto)
			return res.json(dbUserCrypto)
		}).catch(function(err) {
			res.status(500).json(err)
		})
	}





	, 
	findAllCryptoData: function(req, res) {
		return rq({
    		url: `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${req.params.coinArr}&tsyms=USD`,
			headers: {
				 "Accept": "application/json",
			     "Content-Type": "application/json"
			},
			method: "GET",
			json: true

			}).then(response => {
				console.log("res", response)
				return response
			}).then(res => {
				console.log(res.DISPLAY)

				let cryptoArr = req.params.coinArr.split(",")
				console.log("arr", cryptoArr)

				let shares = req.params.shareArr.split(",")
				console.log("s", shares)

	      		let dataArray = []
	      		
	      		cryptoArr.forEach((one, ind) => {
	      			let dataObj = {}
	      			dataObj["key"] = one

	      			let valPerShare = res.DISPLAY[one].USD.PRICE
	      			valPerShare = valPerShare.split(" ")
	      			valPerShare = parseInt(valPerShare[1])
	      			dataObj["value"] = valPerShare * parseInt(shares[ind])

	      			dataArray.push(dataObj)
	      		})

	      		console.log(dataArray)
	      		
	      		return dataArray
			}).catch(err => {
				console.log(err)
			})
	}
}

// getCryptoData = (cryptoArr, cryptoArrWithShares) => {
// 	let coinArr = cryptoArr.join()

// 	let shareArr = []
//     	cryptoArrWithShares.forEach(coinShare => {
//     		shareArr.push(coinShare.shares)
//     	})

//     return rq({
//     		url: `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coinArr}&tsyms=USD`,
			
// 			method: "GET",
// 			json: true

// 			}).then(response => {
// 				//console.log("res", response)
// 				return response
// 			}).then(res => {
// 				console.log(res.DISPLAY)

// 	      		let dataArray = []
	      		
// 	      		cryptoArr.forEach((one, ind) => {
// 	      			let dataObj = {}
// 	      			dataObj["key"] = one

// 	      			let valPerShare = res.DISPLAY[one].USD.PRICE
// 	      			valPerShare = valPerShare.split(" ")
// 	      			valPerShare = parseInt(valPerShare[1])
// 	      			dataObj["value"] = valPerShare * parseInt(shareArr[ind])

// 	      			dataArray.push(dataObj)
// 	      		})

// 	      		console.log(dataArray)
	      		
// 	      		return dataArray
// 			}).catch(err => {
// 				console.log(err)
// 			})


// }