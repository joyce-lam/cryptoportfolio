const request = require("request");







request("url", function(error, response, body) {
	if (!error && response.statusCode ==200) {
		console.log(body)
	}
})