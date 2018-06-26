// const utils = require("../utils");
const request = require("request");
const rq = require("request-promise")

module.exports = {
	getTopNBy24HVol: function(req, res) {
		rq({
			url: `https://min-api.cryptocompare.com/data/top/totalvol?limit=10&tsym=USD`,
			headers: {
				 "Accept": "application/json",
			     "Content-Type": "application/json"
			},
			method: "GET",
			json: true

		}).then(result => {
			let top10 = []
      		let top10FullName = []
      		result.Data.forEach(topCoinData => {
      			top10.push(topCoinData.CoinInfo.Name)
      			top10FullName.push(topCoinData.CoinInfo.FullName)
      		})

      		return getTop10AllData(top10, top10FullName)
      		
		}).then(result => {
			console.log("res", result)
			return res.json(result)
		})
		.catch(err => {
			console.log(err)
		})
	}
}


getTop10AllData = (top10, fullNames) => {
	let top10str = top10.join()

	return rq({
			url: `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${top10str}&tsyms=USD`,
			headers: {
				 "Accept": "application/json",
			     "Content-Type": "application/json"
			},
			method: "GET",
			json: true

			}).then(result => {
				//console.log(res.DISPLAY)

	      		let dataArray = []
	      		top10.forEach((one, ind) => {
	      			let dataObj = {}
	      			dataObj["fullName"] = fullNames[ind]
	      			dataObj["cryptoName"] = one
	      			dataObj["price"] = result.DISPLAY[one].USD.PRICE
	      			dataObj["change24H"] = result.DISPLAY[one].USD.CHANGE24HOUR
	      			dataObj["change24Hpct"] = result.DISPLAY[one].USD.CHANGEPCT24HOUR
	      			dataObj["vol24H"] = result.DISPLAY[one].USD.VOLUME24HOUR
	      			dataObj["marketCap"] = result.DISPLAY[one].USD.MKTCAP
	      			dataArray.push(dataObj)
	      		})

	      		console.log("data", dataArray)	
	      		return dataArray

			}).catch(err => {
				console.log(err)
			})

}