import axios from "axios";

export default {
	getTop10Data: function() {
		return axios.get("/api/coins/recentTopN");
	},
	getCoinCurrentPrice: function(symbol, token) {
		return axios.get(`/api/coin/price`, {
			params: {
				symbol: symbol
			},
			headers: {
				"Authorization": `Bearer ${token}`
			}
		});
	},
	getCoinPastHour: function(symbol, dateTimeRange, token) {
		return axios.get(`/api/coin/historical_hour`, {
			params: {
				symbol: symbol,
				dateTimeRange: dateTimeRange
			},
			headers: {
				"Authorization": `Bearer ${token}`
			}
		});
	},
	getCoinPastDay: function(symbol, dateTimeRange, token) {
		return axios.get(`/api/coin/historical_day`, {
			params: {
				symbol: symbol,
				dateTimeRange: dateTimeRange
			},
			headers: {
				"Authorization": `Bearer ${token}`
			}
		});
	},
	getUserCrypto: function(userId, token) {
		return axios.get(`/api/users/cryptocurrencies_list`, {
			params: {
				userId: userId
			},
			headers: {
				"Authorization": `Bearer ${token}`
			}
		});
	},
	getUserCryptoData: function(userId, coinArr, shareArr, token) {
		return axios.get(`/api/users/cryptocurrencies_data`, {
			params: {
				userId: userId,
				coinArr: coinArr,
				shareArr: shareArr
			},
			headers: {
				"Authorization": `Bearer ${token}`
			}
		});
	},
	getCoinList: function(token) {
		return axios.get("/api/coins/all", {
			headers: {
				"Authorization": `Bearer ${token}`
			}
		});
	},
	addCoinToUser: function(userId, token, selectedCoinId, shares) {
		const headers = {"Authorization": `Bearer ${token}`}
		return axios.post('/api/users/add_coin', {
			data: {
				userId: userId,
				selectedCoinId: selectedCoinId,
				shares: shares
			}, headers
		});
	},
	updateCoinFromUser: function(userId, token, selectedCoinId, shares) {
		const headers = {"Authorization": `Bearer ${token}`}
		return axios.put("/api/users/update_coin", {
			params: {
				userId: userId,
				selectedCoinId: selectedCoinId,
				shares: shares
			}, headers

		});
	}
};