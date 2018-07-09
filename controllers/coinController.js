const request = require("request");
const rq = require("request-promise");
const cryptoFuncObj = require("../cache/utils")

module.exports = {
	findCurrentPrice: function(req, res) {
		cryptoFuncObj.currentPrice(req.query.symbol)
			.then(result => {
				result = result["USD"]
				return res.json(result);
			})
			.catch(err => {
				console.log(err);
			})
	},
	findPastHours: function(req, res) {
		cryptoFuncObj.histoHour(req.query.symbol, req.query.dateTimeRange)
			.then(result => {
	      		let priceData = result.Data;
				let dataArray = [];
	      		priceData.map(singleData => {
	      			let obj = {};
	      			let date = new Date(singleData.time*1000);
	      			let hours = date.getHours();
	      			obj["x"] = hours + ":00";
	      			obj["y"] = singleData.high;
	      			dataArray.push(obj);
	      		})
	  	 		return res.json(dataArray);
			}).catch(err => {
				console.log(err);
			})
	},
	findPastDays: function(req, res) {
		cryptoFuncObj.histoDay(req.query.symbol, req.query.dateTimeRange)	
			.then(result => {
				let priceData = result.Data;
				let dataArray = [];
	      		priceData.map(singleData => {
	      			let obj = {};
	      			let date = new Date(singleData.time*1000);
	      			let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	      			let month = months[date.getMonth()];
	      			let day = date.getDate();
	      			obj["x"] = `${month} ${day}`;
	      			obj["y"] = singleData.high;
	      			dataArray.push(obj);
	      		})	
	      		return res.json(dataArray);
			}).catch(err => {
				console.log(err);
			})
	}
};