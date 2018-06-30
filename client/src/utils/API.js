import axios from "axios"

export default {
	getTop10Data: function() {
		return axios.get("/api/coins/recentTopN")
	},
	getCoinCurrentPrice: function(symbol) {
		return axios.get(`/api/coin/price`, {
			params: {
				symbol: symbol
			}
		})
	},
	getCoinPastHour: function(symbol, dateTimeRange) {
		return axios.get(`/api/coin/historical_hour`, {
			params: {
				symbol: symbol,
				dateTimeRange: dateTimeRange
			}
		})
	},
	getCoinPastDay: function(symbol, dateTimeRange) {
		return axios.get(`/api/coin/historical_day`, {
			params: {
				symbol: symbol,
				dateTimeRange: dateTimeRange
			}
		})
	},
	getUserCrypto: function(userId) {
		return axios.get(`/api/users/cryptocurrencies_list`, {
			params: {
				userId: userId
			}
		})
	},
	getUserCryptoData: function(userId, coinArr, shareArr) {
		return axios.get(`/api/users/cryptocurrencies_data`, {
			params: {
				userId: userId,
				coinArr: coinArr,
				shareArr: shareArr
			}
		})
	},
	getCoinList: function() {
		return axios.get("/api/coins/all")
	},
	addCoinToUser: function(userId, selectedCoinId, shares) {
		return axios.post('/api/users/add_coin', {
			userId: userId,
			selectedCoinId: selectedCoinId,
			shares: shares
		})
	},
	updateCoinFromUser: function(userId, selectedCoinId, shares) {
		return axios.put("/api/users/update_coin", {
			params: {
				userId: userId,
				selectedCoinId: selectedCoinId,
				shares: shares
			}
		})
	}
}


// return axios.post(`api/users/${userId}/add/${selectedCoinId}/${shares}`)