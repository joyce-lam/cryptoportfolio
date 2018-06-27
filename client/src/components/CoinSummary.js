import React, { Component } from "react"

import IndividualCoin from "./IndividualCoin"
import CoinList	from "./CoinList"




import API from "../utils/API"

class CoinSummary extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userId: 1,
			userCoins: [],
			userCoinsShare: [],
			coinName: "",
			random: "random"
		}

		this.getAccountInfo = this.getAccountInfo.bind(this)
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
    			let shareArr = []
    			result.forEach((one, ind) => {
    				coinArr.push(result[ind].cryptoSymbol)
    				shareArr.push(result[ind].shares)
    			})

		    	this.setState({
		    		userCoinsShare: result,
		    		userCoins: coinArr
		    	})
    		}).catch(err => {
    			console.log(err)
    		})
    }



	render() {

		return (
				<div>				
					<div className="main">

						<div className="row">
							<div className="col-xs-1 col-sm-1 col-md-2"></div>
							<div className="col-xs-10 col-sm-10 col-md-8 text-center">
									{this.state.coinName.length ? (
										<IndividualCoin 
											random={this.state.random} 
										/>
									) : (
										<h3>Your Wallet (Choose one cryptocurrency to view)</h3>
										)}
							</div>
							<div className="col-xs-1 col-sm-1 col-md-2"></div>
						</div>
						<div className="row">
							<div className="col-xs-1 col-sm-1 col-md-2"></div>
						 	<div className="col-xs-10 col-sm-10 col-md-8 text-center">
							 	<ul>
									{this.state.userCoins.map(coin => {
										return <CoinList key={coin} id={coin}>{coin}</CoinList>
									})}
								</ul>
							</div>
							<div className="col-xs-1 col-sm-1 col-md-2"></div>
						</div>

					</div>
				</div>
			)
	}
}

export default CoinSummary