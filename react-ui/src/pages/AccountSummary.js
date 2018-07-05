import React, { Component } from "react";
import {
    BrowserRouter,
    Link
} from "react-router-dom";

import SummaryChart from "../components/SummaryChart";
import CoinCard from "../components/CoinCard";
import UserCoinTable from "../components/UserCoinTable";

import API from "../utils/API";
import Auth from '../utils/Auth';

import Icon from "react-icons-kit";
import {play3} from "react-icons-kit/icomoon/play3";
import decode from "jwt-decode";


class AccountSummary extends Component {
	constructor(props) {
		super(props);

        const token = Auth.getToken();
        const profile = decode(token);

		this.state = {
			userId: profile.sub,
            token: token,
			userCoinsAndShares: [],
			totalAmount: 0,
			piechartData: [{}],
			config: [{color: '#aaac84'}],
            authenticated: props.authenticated
		};

		this.styles = {
	      '.chart_lines': {
	        stroke: 'rgba(0, 0, 0, 1)',
	        strokeWidth: 1
	      },
	      '.chart_text': {
	        fontSize: '10px',
	        fill: 'white'
	      }
    	};

		this.getAccountInfo = this.getAccountInfo.bind(this);
    	this.getUserCoinData = this.getUserCoinData.bind(this);
		this.getUserCoinVal = this.getUserCoinVal.bind(this);
	}

	componentDidMount() {   
        this.getAccountInfo(this.state.userId, this.state.token)
	}

    getAccountInfo = (userId, token) => {
    	API.getUserCrypto(userId, token)
    		.then(res => {
    			return res.data;
    		}).then(result => {
    			let coinArr = [];
    			let coinArrFullName = [];
                let shareArr = [];
    			result.forEach((one, ind) => {
                    coinArrFullName.push(result[ind].cryptoName);
    				coinArr.push(result[ind].cryptoSymbol);
    				shareArr.push(result[ind].shares);
    			});

    			let noOfRow = coinArr.length;
		    	this.setState({
                    userCoinsAndShares: result,
		    		tableRow: noOfRow,
		    	});

    			coinArr = coinArr.join();
    			shareArr = shareArr.join();
    			this.getUserCoinData(userId, coinArr, shareArr, coinArrFullName, token);
			   	this.getUserCoinVal(userId, coinArr, shareArr);

    		}).catch(err => {
    			console.log(err)
    		})
    }


    getUserCoinData = (userId, coinArr, shareArr, coinArrFullName, token) => {
    	API.getUserCryptoData(userId, coinArr, shareArr, token)
    		.then(res => {
    			return res.data;
    		}).then(result => {
                let processedResult = [];
                result.forEach((one, ind) => {
                    let processedObj = {};
                    processedObj["key"] = coinArrFullName[ind];
                    processedObj["value"] = result[ind].value;
                    processedResult.push(processedObj);
                })

                this.setState({
    				piechartData: processedResult
    			});

    			this.getUserCoinVal();
    		}).catch(err => {
    			console.log(err);
    		})
    }

    getUserCoinVal = () => {
    	let totalVal = 0;
    	this.state.piechartData.forEach(one => {
    		let val = parseFloat(one["value"]).toFixed(2);
    		val = parseFloat(val);
    		totalVal += val;
    	});
    	
    	totalVal = parseFloat(totalVal).toFixed(2);
    	this.setState({
    		totalAmount: totalVal
    	});
    }

	render() {
		return (
                <BrowserRouter>
    				<div className="main">
    					<div className="row">
    						<div className="col-12 text-center" >
    							<h1 id="summary-head">Your Portfolio Summary</h1>
    						</div>
    					</div>
    					<div className="row" id="summary-card">
    						<div className="col-md-2"></div>
    						<div className="col-xs-12 col-sm-12 col-md-3">
    							<CoinCard heading="Total Amount" text={this.state.totalAmount} />
    						</div>
    						<div className="col-md-1"></div>
    						<div className="col-xs-12 col-sm-12 col-md-6">
    							<SummaryChart 
    								data={this.state.piechartData}
    								styles={this.styles}	
    							/>
    						</div>
    					</div>
    					<div className="row">
    						<div className="col-1"></div>
    						<div className="col-10">
    							<UserCoinTable 
                                    userId={this.state.userId}
                                    token={this.state.token}
                                />
    						</div>
    						<div className="col-1"></div>
    					</div>
    					<div className="row">
    						<div className="col-xs-1 col-sm-1 col-md-2"></div>
    						<div className="col-xs-3 col-sm-3 col-md-1 text-center">
    							<Icon size={32} icon={play3} id="arrow-icon" />
    						</div>
    						<div className="col-xs-7 col-sm-7 col-md-7">
    							<Link to="/coins"><h3>View Individual Cryptocurreny</h3></Link>
    						</div>
    						<div className="col-xs-1 col-sm-1 col-md-2"></div>
    					</div>
    				</div>
                </BrowserRouter>
			)
	}
}

export default AccountSummary;