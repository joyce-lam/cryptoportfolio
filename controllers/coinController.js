const request = require("request");
const rq = require("request-promise");


module.exports = {
	findCurrentPrice: function(req, res) {
		
		rq({
			url: `https://min-api.cryptocompare.com/data/price?fsym=${req.params.symbol}&tsyms=USD`,
			headers: {
				 "Accept": "application/json",
			     "Content-Type": "application/json"
			},
			method: "GET",
			json: true

			}).then(result => {

				console.log("usd", result["USD"])
				result = result["USD"]

				return res.json(result)	
			})
			.catch(err => {
				console.log(err)
			})
	},
	findPastHour: function(req, res) {
		rq({
			url: `https://min-api.cryptocompare.com/data/histohour?fsym=${req.params.symbol}&tsym=USD&limit=${req.params.dateTimeRange}`,
			headers: {
				 "Accept": "application/json",
			     "Content-Type": "application/json"
			},
			method: "GET",
			json: true

			}).then(result => {
				console.log(result.Data)

	      		let priceData = result.Data
				let dataArray = []
	      		priceData.map(singleData => {
	      			let obj = {}
	      			let date = new Date(singleData.time*1000)
	      			let hours = date.getHours()
	      			// console.log(hours)
	      			obj["x"] = hours + ":00"
	      			obj["y"] = singleData.high
	      			dataArray.push(obj)
	      			// console.log(dataArray)
	      		})
	      		console.log(dataArray)
	  	 		return res.json(dataArray)
			}).catch(err => {
				console.log(err)
			})
	},
	findPastDay: function(req, res) {
		rq({
			url: `https://min-api.cryptocompare.com/data/histoday?fsym=${req.params.symbol}&tsym=USD&limit=${req.params.dateTimeRange}`,
			headers: {
				 "Accept": "application/json",
			     "Content-Type": "application/json"
			},
			method: "GET",
			json: true

			}).then(result => {

				let priceData = result.Data
				let dataArray = []
	      		priceData.map(singleData => {
	      			let obj = {}
	      			let date = new Date(singleData.time*1000)
	      			let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	      			let month = months[date.getMonth()]
	      			let day = date.getDate()
	      			// console.log(month, day)
	      			obj["x"] = `${month} ${day}`
	      			obj["y"] = singleData.high
	      			dataArray.push(obj)
	      			// console.log(dataArray)
	      		})	
	      		console.log(dataArray)
	      		return res.json(dataArray)

			}).catch(err => {
				console.log(err)
			})
	}
}