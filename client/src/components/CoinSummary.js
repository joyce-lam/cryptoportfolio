import React, { Component } from "react"

import IndividualCoin from "./IndividualCoin"
import CoinList	from "./CoinList"

import Icon from 'react-icons-kit'
import {play3} from 'react-icons-kit/icomoon/play3'

import API from "../utils/API"

class CoinSummary extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userId: 1,
			userCoinsSymbol: [],
            userCoinsFullName: [],
			userCoinsShare: [],
			coinName: "",
			coinSymbol: "",
			coinValue: 0,
			coinAmount: 0,
			random: "random"
		}

		this.getAccountInfo = this.getAccountInfo.bind(this)
		this.getPrice = this.getPrice.bind(this)
	}

	// handleOpenClick() {
	// 	this.setState ({
	// 		selected: true,
	// 		width: 200,
	// 		marginLeft: 200
	// 	})
	// }

	// handleCloseClick() {
	// 	this.setState ({
	// 		selected: true,
	// 		width: 0,
	// 		marginLeft: 0
	// 	})
	// 	console.log(this.props)
	// }

	// <div className="sidenav" style={{width:this.state.width}}>
	// 	<div  id="x-icon" >
	// 		<Icon size={28} icon={x} onClick={this.handleCloseClick} />
	// 	</div>
	// 	<div>
	// 		<Icon size={28} icon={user} id="user-icon" />
	// 	</div>
	// 	<a href="/home">Home</a>
	// 	<a href="/coin">Coin</a>
		
	// </div>
	// <Icon size={32} icon={menu} id="menu-icon" onClick={this.handleOpenClick}/>
	componentDidMount() {
		this.getAccountInfo("1")
	}

	getAccountInfo = (userId) => {
    	API.getUserCrypto(userId)
    		.then(res => {
    			console.log(res.data)
    			return res.data
    		}).then(result => {
    			this.setState({
    				userCoinsShare: result
    			})

    			let coinArr = []
    			let coinArrFullName = []
                let shareArr = []

    			result.forEach((one, ind) => {
                    coinArrFullName.push(result[ind].cryptoName)
    				coinArr.push(result[ind].cryptoSymbol)
    				shareArr.push(result[ind].shares)
    			})

		    	this.setState({
		    		userCoinsSymbol: coinArr,
                    userCoinsFullName: coinArrFullName,
                    userCoinsShare: shareArr
		    	})
    		}).catch(err => {
    			console.log(err)
    		})
    }

    handleCoinClick = (id, symbol) => {
    	this.setState({
    		coinName: id,
    		coinSymbol: id
    	})
    	console.log("clicked", this.state.coinName, this.state.coinSymbol)

    	this.getPrice(this.state.coinSymbol)
    }

    getPrice = symbol => {
		API.getCoinCurrentPrice(symbol)
			.then(res => {
				console.log(res.data)
				this.setState({
					coinValue: res.data
				})
				return res.data
			}).catch(err => {
				console.log(err)
			})
	}


	render() {

		return (
				<div>				
					<div className="main">
						<div className="row">					
							<div className="col-xs-12 col-sm-12 col-md-12 text-center">
								<h1>Your Wallet</h1>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-1 col-sm-1 col-md-2"></div>
						 	<div className="col-xs-10 col-sm-10 col-md-8 text-center">
							 	<ul>
									{this.state.userCoins.map(coin => {
										return <CoinList 
													key={coin}
													id={coin}
													handleCoinClick={this.handleCoinClick}>{coin}
												</CoinList>
									})}
								</ul>
							</div>
							<div className="col-xs-1 col-sm-1 col-md-2"></div>
						</div>		
						<div className="row">
							<div className="col-xs-12 col-sm-12 col-md-12 text-center">
								{this.state.coinName.length ? (
									<IndividualCoin 
										random={this.state.random}
										coinName={this.state.coinName}
										coinSymbol={this.state.coinSymbol}
										coinValue={this.state.coinValue}
									/>
								) : (
										<h3>(Double-click the cryptocurrency you would like to view)</h3>
									)}
							</div>
						</div>
						<div className="row">
							<div className="col-xs-1 col-sm-1 col-md-2"></div>
							<div className="col-xs-3 col-sm-3 col-md-1 text-center">
								<Icon size={32} icon={play3} id="arrow-icon" />
							</div>
							<div className="col-xs-7 col-sm-7 col-md-7">
								<a href="/home"><h3>Back to Your Portfolio</h3></a>
							</div>
							<div className="col-xs-1 col-sm-1 col-md-2"></div>
						</div>
					</div>
				</div>
			)
	}
}

export default CoinSummary