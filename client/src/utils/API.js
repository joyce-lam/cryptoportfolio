import axios from "axios"

export default {
	getTop10Data: function() {
		return axios.get("/api/coins/recentTopN")
	},
	getCoinCurrentPrice: function(symbol) {
		return axios.get(`/api/coin/` + symbol)
	},
	getCoinPastHour: function(symbol, dateTimeRange) {
		return axios.get(`/api/coin/` + symbol + `/hour/` + dateTimeRange)
	},
	getCoinPastDay: function(symbol, dateTimeRange) {
		return axios.get(`/api/coin/` + symbol + `/day/` + dateTimeRange)
	},
	getUserCrypto: function(userId) {
		return axios.get(`/api/users/${userId}/cryptocurrencies`)
	},
	getUserCryptoData: function(userId, coinArr, shareArr, coinArrFullName) {
		return axios.get(`/api/users/${userId}/cryptocurrencies_data/${coinArr}/${shareArr}`)
	},
	getCoinList: function() {
		return axios.get("/api/coins/all")
	}
}