const request = require("request");
const rq = require("request-promise");


module.exports = {
	findPrice: function(req, res) {
		//let req.params.symbol = "BTC"
		rq({
			url: `https://min-api.cryptocompare.com/data/price?fsym=${req.params.symbol}&tsyms=USD`,
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
				return res["USD"]		
			})
			.catch(err => {
				console.log(err)
			})
	}
}