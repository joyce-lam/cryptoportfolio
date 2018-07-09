const request = require("request");
const rq = require("request-promise");

const caching = require("./redis");

const currentPrice = function(symbol) {
	return rq({
		url: `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD`,
		headers: {
			 "Accept": "application/json",
		     "Content-Type": "application/json"
		},
		method: "GET",
		json: true
	});
};

const histoHour = function(symbol, dateTimeRange) {
	return rq({
		url: `https://min-api.cryptocompare.com/data/histohour?fsym=${symbol}&tsym=USD&limit=${dateTimeRange}&aggregate=2`,
		headers: {
			 "Accept": "application/json",
		     "Content-Type": "application/json"
		},
		method: "GET",
		json: true
	});
}

const histoDay = function(symbol, dateTimeRange) {
	return rq({
		url: `https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=USD&limit=${dateTimeRange}&aggregate=2`,
		headers: {
			 "Accept": "application/json",
		     "Content-Type": "application/json"
		},
		method: "GET",
		json: true
	});
};

const topTotalVol = function(limit) {
	return rq({
		url: `https://min-api.cryptocompare.com/data/top/totalvol?limit=${limit}&tsym=USD`,
		headers: {
			 "Accept": "application/json",
		     "Content-Type": "application/json"
		},
		method: "GET",
		json: true
	});
};

const priceMultiFull = function(symbols) {
	let symbolsStr = symbols.join();
	return rq({
		url: `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbolsStr}&tsyms=USD`,
		headers: {
			 "Accept": "application/json",
		     "Content-Type": "application/json"
		},
		method: "GET",
		json: true
	});
};

const cryptoFuncObj = {
	currentPrice: currentPrice,
	histoHour: histoHour,
	histoDay: histoDay,
	topTotalVol: topTotalVol,
	priceMultiFull: priceMultiFull
};

module.exports = caching(cryptoFuncObj, 60);