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

			}).then(response => {
				//console.log("res", response)
				return response
			}).then(res => {
				let top10 = []
	      		let top10FullName = []
	      		res.Data.forEach(topCoinData => {
	      			top10.push(topCoinData.CoinInfo.Name)
	      			top10FullName.push(topCoinData.CoinInfo.FullName)
	      		})

	      		return getTop10AllData(top10, top10FullName)
			})
			.catch(err => {
				console.log(err)
			})
	}
}


// getTop10By24HVol = () => {
// 	rq({
// 			url: `https://min-api.cryptocompare.com/data/top/totalvol?limit=10&tsym=USD`,
// 			headers: {
// 				 "Accept": "application/json",
// 			     "Content-Type": "application/json"
// 			},
// 			method: "GET",
// 			json: true

// 			}).then(response => {
// 				console.log("res", response)
// 				return response
// 			}).then(res => {
// 				let top10 = []
// 	      		let top10FullName = []
// 	      		res.Data.forEach(topCoinData => {
// 	      			top10.push(topCoinData.CoinInfo.Name)
// 	      			top10FullName.push(topCoinData.CoinInfo.FullName)
// 	      		})

// 	      		return getTop10AllData(top10, top10FullName)
// 			})
// 			.catch(err => {
// 				console.log(err)
// 			})

// }

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

			}).then(response => {
				//console.log("res", response)
				return response
			}).then(res => {
				//console.log(res.DISPLAY)

	      		let dataArray = []
	      		
	      		top10.forEach((one, ind) => {
	      			let dataObj = {}
	      			dataObj["fullName"] = fullNames[ind]
	      			dataObj["cryptoName"] = one
	      			dataObj["price"] = res.DISPLAY[one].USD.PRICE
	      			dataObj["change24H"] = res.DISPLAY[one].USD.CHANGE24HOUR
	      			dataObj["change24Hpct"] = res.DISPLAY[one].USD.CHANGEPCT24HOUR
	      			dataObj["vol24H"] = res.DISPLAY[one].USD.VOLUME24HOUR
	      			dataObj["marketCap"] = res.DISPLAY[one].USD.MKTCAP
	      			dataArray.push(dataObj)
	      		})

	      		console.log(dataArray)
	      		
	      		return dataArray

			}).catch(err => {
				console.log(err)
			})

}