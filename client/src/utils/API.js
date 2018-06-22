import axios from "axios"

export default {
	getTop10Data: function() {
		return axios.get("/api/coins/recentTopN");
	},
	getCoinPrice: function(symbol) {
		return axios.get(`/api/coin/` + symbol)
	},
	getUserCrypto: function(userId) {
		return axios.get(`/api/users/` + userId + `/cryptocurrencies`)
	},
	getUserCryptoData: function(userId, coinArr, shareArr) {
		return axios.get(`/api/users/${userId}/cryptocurrencies_data/${coinArr}/${shareArr}`)
	}
}