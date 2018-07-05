const db = require("../models");
const Op = db.Sequelize.Op;
const request = require("request");
const rq = require("request-promise");


module.exports = {
	findAllCrypto: function(req, res) {
		db.UserCryptocurrency.findAll({
			where: {
				UserId: req.query.userId
			},
			include: [{
				model: db.Cryptocurrency,
				attributes: ["id", "name", "symbol"]
			}]
		}).then(dbUserCrypto => {
			if (dbUserCrypto.length != 0) {
				let userCryptoArrayWithShares = [];
				dbUserCrypto.forEach((one, ind) => {
					let coinObj = {};
					coinObj["cryptoId"] = dbUserCrypto[ind].dataValues.Cryptocurrency.dataValues.id;
					coinObj["cryptoName"] = dbUserCrypto[ind].dataValues.Cryptocurrency.dataValues.name;
					coinObj["cryptoSymbol"] = dbUserCrypto[ind].dataValues.Cryptocurrency.dataValues.symbol;
	    			coinObj["shares"] = dbUserCrypto[ind].dataValues.share;
	    			userCryptoArrayWithShares.push(coinObj);
				})
				return res.json(userCryptoArrayWithShares);
			}

		}).catch(function(err) {
			res.status(500).json(err);
		})
	}, 
	findAllCryptoData: function(req, res) {
		rq({
    		url: `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${req.query.coinArr}&tsyms=USD`,
			headers: {
				 "Accept": "application/json",
			     "Content-Type": "application/json"
			},
			method: "GET",
			json: true
			}).then(result => {
				if (result  != 0 ) {
					let cryptoArr = req.query.coinArr.split(",");
					let shares = req.query.shareArr.split(",");
		      		let dataArray = [];
		      		cryptoArr.forEach((one, ind) => {
		      			let dataObj = {};
		      			dataObj["key"] = one;
		      			let valPerShare = result.DISPLAY[one].USD.PRICE;
		      			valPerShare = valPerShare.split(" ");
		      			valPerShare = valPerShare[1];
		      			valPerShare = valPerShare.replace(",", "");
		      			valPerShare = parseFloat(valPerShare).toFixed(2);
		      			dataObj["currentPrice"] = valPerShare;
		      			let val = valPerShare * parseInt(shares[ind]);
		      			dataObj["value"] = val.toFixed(2);
		      			dataArray.push(dataObj);
		      		})    		
		      		return dataArray;
		      	}
	      		
			}).then(result => {
				if (result != 0 ) {
					return res.json(result);
				}
			}).catch(err => {
				console.log(err);
			})
	},
	addCoin: function(req, res) {
		db.UserCryptocurrency.findAll({
			where: {
				UserId: req.body.data.userId,
				CryptocurrencyId: req.body.data.selectedCoinId
			}
		}).then(result => {
			if (result.length == 0) {
				db.UserCryptocurrency.create({
					UserId: req.body.data.userId,
					CryptocurrencyId: req.body.data.selectedCoinId,
					share: req.body.data.shares
				}).then(dbUserCrypto => {
					console.log("added coin");
					return res.json(dbUserCrypto);
				}).catch(err => {
					console.log(err);
					res.status(500).json(err);
				})

			} else {
				let currentShare = result[0].dataValues.share;
				let shareToUpdate = parseFloat(currentShare) + parseFloat(req.body.data.shares);
				db.UserCryptocurrency.update(
					{share: shareToUpdate}, {
						where: {
							CryptocurrencyId: req.body.data.selectedCoinId,
							UserId: req.body.data.userId
						}
					}).then(dbUserCrypto => {
						console.log("updated coin with added shares");
						return res.json(dbUserCrypto);
					}).catch(err => {
						console.log(err);
						res.status(500).json(err);
					})
			}
		}).catch(err => {
			console.log(err);
		})	
	},
	updateCoinShares: function(req, res) {
		db.UserCryptocurrency.findAll({
			where: {
				UserId: req.body.params.userId,
				CryptocurrencyId: req.body.params.selectedCoinId
			}
		}).then(result => {
			let currentShare = result[0].dataValues.share;
			let shareToUpdate = parseFloat(currentShare) - parseFloat(req.body.params.shares);

			if (shareToUpdate == 0) {
				db.UserCryptocurrency.destroy({
					where: {
						UserId: req.body.params.userId,
						CryptocurrencyId: req.body.params.selectedCoinId
					}
				}).then(result => {
					console.log("deleted coin");
				}).catch(err => {
					console.log(err);
				})
			} else if (shareToUpdate > 0) {
				db.UserCryptocurrency.update(
					{share: req.body.params.shares}, {
						where: {
							CryptocurrencyId: req.body.params.selectedCoinId,
							UserId: req.body.params.userId
						}
					}).then(dbUserCrypto => {
						return res.json(dbUserCrypto);
					}).catch(err => {
						console.log(err);
						res.status(500).json(err);
					})
			} 
		}).catch(err => {
			console.log(err);
		})
	}
};

