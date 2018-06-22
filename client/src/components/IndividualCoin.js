import React, { Component } from "react"

import CoinName from "./CoinName"
import CoinCard from "./CoinCard"
import CoinGraph from "./CoinGraph"

import API from "../utils/API"


class IndividualCoin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
			coinName: "Bitcoin",
			coinSymbol: "BTC",
			coinValue: 0,
			coinAmount: 0,
			random: props.random
		}
		this.getPrice = this.getPrice.bind(this)
	}


	componentDidMount() {

		this.getPrice("BTC")
	}


	// getPrice() {
	// 	fetch(`https://min-api.cryptocompare.com/data/price?fsym=${this.state.coinSymbol}&tsyms=USD,JPY,EUR`, {
	// 	      method: 'GET',
	// 	      headers: {
	// 	        'Accept': 'application/json',
	// 	        'Content-Type': 'application/json'
	// 	      },
	// 	    })
	//     .then(response => {
	//       	response.text()
	//       	.then(text => {
	//       		// console.log(text)
	//       		console.log(JSON.parse(text).Data)
	//       		// let priceData = JSON.parse(text).Data
	//       		// // priceData = priceData[USD]
	//       		// console.log(priceData)

	//       		// this.setState = {
	//       		// 	coinValue: priceData
	//       		// }
   
 //      	})
 //      })
	//    .catch(error => {
 //      	console.log(error)
 //      })
	// }


	// getPrice = () => {
	// 	fetch(`https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD`, {
	// 	      method: 'GET',
	// 	      headers: {
	// 	        'Accept': 'application/json',
	// 	        'Content-Type': 'application/json'
	// 	      },
	// 	    })
	//     .then(response => {
	//     	console.log(response)
	//       	response.json()
	//       	.then(text => {
	//       		console.log(text)

	//       		let priceData = text["USD"]
	//       		this.setState({
	//       			coinValue: priceData
	//       		})
   
 //      	})
 //      })
	//    .catch(error => {
 //      	console.log(error)
 //      })
	// }

	getPrice = (symbol) => {
		API.getCoinPrice(symbol)
			.then(res => {
				console.log(res)
				return res
			}).then(res => {
				this.setState({
					coinValue: res
				})
			}).catch(err => {
				console.log(err)
			})
	}

	render() {

		return (
				
				<div className="row" id="individual-coin">
					<CoinName name={this.state.coinName} />
					<div className="row">
						<div className="col-xs-12 col-sm-12 col-md-3">
							<CoinCard heading="Current Price" text={this.state.coinValue} />
							<CoinCard heading="Total Amount" text={this.state.coinAmount} /> 
						</div>
						<div className="col-xs-12 col-sm-12 col-md-9">
							<CoinGraph coinName={this.state.coinName} coinSymbol={this.state.coinSymbol} />
						</div>
					</div>
					
				</div>
			
			)
	}
}

export default IndividualCoin