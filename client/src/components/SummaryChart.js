import React, { Component } from "react"

import { PieChart } from "react-easy-chart"
import { Legend } from "react-easy-chart" 

import API from "../utils/API"

class SummaryChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: 1,
			userCoins: [],
			piechartData: [
						      { key: 'A', value: 100, color: '#aaac84' },
						      { key: 'B', value: 200, color: '#dce7c5' },
						      { key: 'C', value: 50, color: '#e3a51a' }
						    ],
			config: [
						{color: '#aaac84'},
					    {color: '#dce7c5'},
					    {color: '#e3a51a'}
					]
		}


		this.styles = {
	      '.chart_lines': {
	        stroke: 'rgba(0, 0, 0, 1)',
	        strokeWidth: 1
	      },
	      '.chart_text': {
	        fontSize: '10px',
	        fill: 'white'
	      }
    	}

    	this.getAccountInfo = this.getAccountInfo.bind(this)
    	this.getUserCoinData = this.getUserCoinData.bind(this)

	}

	componentDidMount() {
		this.getAccountInfo("1")
		// this.getUserCoinData("1")
	}
	

	// getAccountInfo = () => {
 //    	fetch(`/api/users/${this.state.UserId}/cryptocurrencies`, {
 //    		method: "GET",
 //    		headers: {
 //    			'Accept': 'application/json',
 //                'Content-Type': 'application/json'
 //    		},
 //    	}).then(response => {
 //    		console.log(response)
 //    		return response.json()
	//     }).then(res => {

 //    		let userCryptoArrayWithShares = []
 //    		let userCryptoArray = []
 //    		res.forEach(coin => {
 //    			let coinObj = {}
 //    			coinObj["cryptoSymbol"] = coin.Cryptocurrency.symbol
 //    			coinObj["shares"] = coin.share
 //    			userCryptoArrayWithShares.push(coinObj)
 //    			userCryptoArray.push(coin.Cryptocurrency.symbol)
 //    		})

 //    		console.log(userCryptoArrayWithShares, userCryptoArray)

 //    		this.setState({
 //    			userCoins: userCryptoArrayWithShares
 //    		})

 //    		return this.getUserCoinData(userCryptoArray, userCryptoArrayWithShares)

	//     }).catch(error => {
	//     	console.log(error)
	//     })
 //    }

    getAccountInfo = (userId) => {
    	API.getUserCrypto(userId)
    		.then(res => {
    			console.log(res)
    			return res.data
    		}).then(res => {

    			let userCryptoArrayWithShares = []
		    	let userCryptoArray = []
	    		res.forEach(coin => {
	    			let coinObj = {}
	    			coinObj["cryptoSymbol"] = coin.Cryptocurrency.symbol
	    			coinObj["shares"] = coin.share
	    			userCryptoArrayWithShares.push(coinObj)
	    			userCryptoArray.push(coin.Cryptocurrency.symbol)
	    		})

		    	console.log(userCryptoArrayWithShares, userCryptoArray)
		    	
		    	let coinArr = userCryptoArray.join()

				let shareArr = []
			    	userCryptoArrayWithShares.forEach(coinShare => {
			    		shareArr.push(coinShare.shares)
			    	})
			    console.log("share", shareArr)
			    shareArr = shareArr.join()
			    this.getUserCoinData(userId, coinArr, shareArr)
			    return userCryptoArrayWithShares
			   

		    }).then(res => {
		    	this.setState({
    				userCoins: res
    			})
    			console.log("res", res)

    			
		    }).catch(err => {
    			console.log(err)
    		})
    }


    getUserCoinData = (userId, coinArr, shareArr) => {

    	API.getUserCryptoData(userId, coinArr, shareArr)
    		.then(res => {
    			console.log(res)
    			return res
    		}).then(res => {
    			this.setState({
    				piechartData: res
    			})
    			console.log(res)
    			console.log(this.state.piechartData)
    		}).catch(err => {
    			console.log(err)
    		})
    }


    // getUserCoinData = (cryptoArr, cryptoArrWithShares) => {
    	
    // 	let coinArr = cryptoArr.join()

    // 	let shareArr = []
    // 	cryptoArrWithShares.forEach(coinShare => {
    // 		shareArr.push(coinShare.shares)
    // 	})

    // 	fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coinArr}&tsyms=USD`, {
    // 		method: "GET",
    // 		headers: {
    // 			'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    // 		},
    // 	}).then(response => {
    // 		console.log(response)
    // 		return response.json()
	   //  }).then(res => {
	   //  	console.log(res.DISPLAY)

    //   		let dataArray = []
      		
    //   		cryptoArr.forEach((one, ind) => {
    //   			let dataObj = {}
    //   			dataObj["key"] = one

    //   			let valPerShare = res.DISPLAY[one].USD.PRICE
    //   			valPerShare = valPerShare.split(" ")
    //   			valPerShare = parseInt(valPerShare[1])
    //   			dataObj["value"] = valPerShare * parseInt(shareArr[ind])

    //   			dataArray.push(dataObj)
    //   		})

    //   		console.log(dataArray)
      		
    //   		return dataArray
	
	   //  }).then(data => {
	   //  	this.setState({
	   //  		piechartData: data
	   //  	})
	   //  	console.log(this.state.piechartData)
	   //  	return this.state.piechartData
	   //  }).catch(error => {
	   //  	console.log(error)
	   //  })
    // }


	render() {

		return (
				<div>
					<PieChart
						size={400}
						innerHoleSize={200}
						labels
						data={this.state.piechartData}
						styles={this.styles}		
					/>
					<Legend 
						data={this.state.piechartData} 
						dataId={"key"} 
						horizontal
						config={this.state.config}
					/>
				</div>
				
					
				
			)
	}
}

export default SummaryChart