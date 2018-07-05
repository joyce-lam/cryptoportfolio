import React, { Component } from "react";
import { Link } from "react-router-dom";

import IndividualCoin from "../components/IndividualCoin";
import CoinList	from "../components/CoinList";

import API from "../utils/API";
import Auth from '../utils/Auth';

import Icon from "react-icons-kit";
import {play3} from "react-icons-kit/icomoon/play3";
import decode from "jwt-decode";


class CoinSummary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: "",
			token: "",
			userCoinsSymbol: [],
            userCoinsFullName: [],
			userCoinsAndShares: [],
			coinName: "",
			coinSymbol: "",
			coinValue: 0,
			coinAmount: 0,
			random: "random"
		};

		this.getProfile = this.getProfile.bind(this);
		this.getAccountInfo = this.getAccountInfo.bind(this);
		this.getPrice = this.getPrice.bind(this);
	}

	componentDidMount() {
		this.getProfile();
	}

	getProfile() {
        var token = Auth.getToken();
        var profile = decode(token);

        this.setState({
          userId: profile.sub,
          token: token
        });

        this.getAccountInfo(profile.sub, token);
    }

	getAccountInfo = (userId, token) => {
    	API.getUserCrypto(userId, token)
    		.then(res => {
    			return res.data;
    		}).then(result => {
    			this.setState({
    				userCoinsAndShares: result
    			});

    			let coinArr = [];
    			let coinArrFullName = [];
                let shareArr = [];
    			result.forEach((one, ind) => {
                    coinArrFullName.push(result[ind].cryptoName);
    				coinArr.push(result[ind].cryptoSymbol);
    				shareArr.push(result[ind].shares);
    			});

		    	this.setState({
		    		userCoinsSymbol: coinArr,
                    userCoinsFullName: coinArrFullName
		    	});
    		}).catch(err => {
    			console.log(err);
    		})
    }

    handleCoinClick = (name, id) => {
    	this.setState({
    		coinName: name,
    		coinSymbol: id
    	});

    	this.getPrice(this.state.coinSymbol, this.state.token);
    }

    getPrice = (symbol, token) => {
		API.getCoinCurrentPrice(symbol,token)
			.then(res => {
				this.setState({
					coinValue: res.data
				});
				return res.data;
			}).catch(err => {
				console.log(err);
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
									{this.state.userCoinsAndShares.map(coin => {
										return <CoinList 
													key={coin.cryptoSymbol}
													id={coin.cryptoSymbol}
													data={coin.cryptoName}
													handleCoinClick={this.handleCoinClick}>{coin.cryptoName}
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
										token={this.state.token}
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
								<Link to="/home"><h3>Back to Your Portfolio</h3></Link>
							</div>
							<div className="col-xs-1 col-sm-1 col-md-2"></div>
						</div>
					</div>
				</div>
			)
	}
}

export default CoinSummary;