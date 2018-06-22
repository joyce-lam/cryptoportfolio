import axios from "axios"

export default {
	getTop10Data: function() {
		return axios.get("/api/coins/recentTopN");
	},
	getCoinPrice: function(symbol) {
		return axios.get(`/api/coin/` + symbol)
	}
}