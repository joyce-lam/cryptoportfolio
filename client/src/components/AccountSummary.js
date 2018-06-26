import React, { Component } from "react"

// import Sidenav2 from "./Sidenav2"
import SummaryChart from "./SummaryChart"
import CoinCard from "./CoinCard"

import ReactTable from "react-table"

import API from "../utils/API"

class AccountSummary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: 1,
			userCoins: [],
			totalAmount: 0,
			piechartData: [{ key: 'A', value: 100, color: '#aaac84'}],
			config: [{color: '#aaac84'}],
			coinData: [],
			tableData: [],
			tableRow: 1
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


		//this.getUserInfo = this.getUserInfo.bind(this)
		this.getAccountInfo = this.getAccountInfo.bind(this)
    	this.getUserCoinData = this.getUserCoinData.bind(this)
		this.getUserCoinVal = this.getUserCoinVal.bind(this)
		this.processTableData = this.processTableData.bind(this)
		
	}


	componentDidMount() {
		//this.getUserInfo()
		this.getAccountInfo("1")
		// this.getUserCoinVal("1")
	}

	// getUserId = () => {
    //     const cookie = document.cookie.split(";");
    //     console.log("cookie", cookie)
    //     let userID = cookie[0];
    //     userID = userID.split("=");
    //     userID = userID[1];
    //     console.log("userID:", userID);
    //     this.setState({ UserId: userID });
    // }

    // getUserInfo = () => {
    //     fetch(`/api/users/${this.state.UserId}`, {
    //         method: "GET",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //     }).then(response => {
    //         console.log(response)
    //         return response
    //     })
    // }

    
    // getAccountInfo = () => {
    // 	fetch(`/api/users/${this.state.UserId}/cryptocurrencies`, {
    // 		method: "GET",
    // 		headers: {
    // 			'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    // 		},
    // 	}).then(response => {
    // 		console.log(response)
    // 		return response.json()
	   //  }).then(res => {

    // 		var userCryptoArray = []
    // 		res.map(coin => {
    // 			let coinObj = {}
    // 			coinObj[coin.CryptocurrencyId] = coin.share
    // 			userCryptoArray.push(coinObj)
    // 		})

    // 		console.log(userCryptoArray)
    // 		return userCryptoArray
	    	
	   //  }).then(data => {
	   //  	this.setState({
	   //  		userCoins: data
	   //  	})
	   //  	console.log(this.state.userCoins)
	   //  	return this.state.userCoins
	   //  })
    // }
	
    getAccountInfo = (userId) => {
    	API.getUserCrypto(userId)
    		.then(res => {
    			//console.log(res.data)
    			return res.data
    		}).then(result => {

    			let userCryptoArrayWithShares = []
		    	let userCryptoArray = []
	    		result.forEach(coin => {
	    			let coinObj = {}
	    			coinObj["cryptoSymbol"] = coin.Cryptocurrency.symbol
	    			coinObj["shares"] = coin.share
	    			userCryptoArrayWithShares.push(coinObj)
	    			userCryptoArray.push(coin.Cryptocurrency.symbol)
	    		})

		    	//console.log(userCryptoArrayWithShares, userCryptoArray)
		    	
		    	let noOfRow = userCryptoArray.length
    			//console.log(noOfRow)
		    	this.setState({
		    		tableRow: noOfRow
		    	})

		    	let coinArr = userCryptoArray.join()
				let shareArr = []
			    	userCryptoArrayWithShares.forEach(coinShare => {
			    		shareArr.push(coinShare.shares)
			    	})
			    //console.log("share", shareArr)
			    shareArr = shareArr.join()
			    this.getUserCoinData(userId, coinArr, shareArr)
			    this.getUserCoinVal(userId, coinArr, shareArr)
			   
			    return userCryptoArrayWithShares
			   

		    }).then(result => {
		    	this.setState({
    				userCoins: result
    			})
    			//console.log("res", result)

    			return result
		    }).catch(err => {
    			console.log(err)
    		})
    }


    getUserCoinData = (userId, coinArr, shareArr) => {

    	API.getUserCryptoData(userId, coinArr, shareArr)
    		.then(res => {
    			//console.log(res.data)
    			return res.data
    		}).then(result => {
    			this.setState({
    				piechartData: result,
    				coinData: result
    			})
    			//console.log(result)
    			this.getUserCoinVal()
    			//console.log(this.state.piechartData)
    			this.processTableData(coinArr, shareArr)
    		}).catch(err => {
    			console.log(err)
    		})
    }



    // getUserCoinVal = (userId, coinArr, shareArr) => {
    // 	API.getUserCryptoTotalVal(userId, coinArr, shareArr)
    // 		.then(res => {
    // 			console.log(res.data)
    // 			return res.data
    // 		}).then(result => {
    // 			this.setState({
    // 				totalAmount: result
    // 			})
    // 		}).catch(err => {
    // 			console.log(err)
    // 		})
    // }

    getUserCoinVal = () => {
    	let totalVal = 0
    	this.state.coinData.forEach(one => {
    		let val = parseFloat(one["value"]).toFixed(2)
    		val = parseFloat(val)
    		//console.log("val", val)
    		totalVal += val
    		//console.log(totalVal)
    	})
    	
    	totalVal = parseFloat(totalVal).toFixed(2)
    	this.setState({
    		totalAmount: totalVal
    	})
    }

    processTableData = (coinArr, shareArr) => {
    	let symbolArr = coinArr.split(",")
    	//console.log("sym", symbolArr)
    	
    	let amountArr = shareArr.split(",")

    	let tableArr = []
    	this.state.coinData.forEach((one, ind) => {
    		let tableObj = {}
    		tableObj["symbol"] = symbolArr[ind]
    		tableObj["amount"] = amountArr[ind]
    		tableObj["value"] = `$ ` + one["value"]
    		tableArr.push(tableObj)
    	})
    	//console.log("table", tableArr, this.state.tableRow)

    	this.setState({
    		tableData: tableArr
    	})
    }


	render() {

		const columns = [{
				Header: "Symbol",
				accessor: "symbol",
				headerClassName: "header-style",
				className: "table-body"
			},{
				Header: "Amount",
				accessor: "amount",
				headerClassName: "header-style",
				className: "table-body"
			},{
				Header: "Value",
				accessor: "value",
				headerClassName: "header-style",
				className: "table-body"
			}]

		return (
				<div>
					<div className="row">
						<div className="col-12 text-center" >
							<h1>Summary</h1>
						</div>
					</div>
					<div className="row" id="summary-card">
						<div className="col-md-2"></div>
						<div className="col-xs-12 col-sm-12 col-md-3" id="summary-total">
							<CoinCard heading="Total Amount" text={this.state.totalAmount} />
						</div>
						<div className="col-md-1"></div>
						<div className="col-xs-12 col-sm-12 col-md-6">
							<SummaryChart 
								data={this.state.piechartData}
								styles={this.styles}
								config={this.state.config}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-1 col-sm-1 col-md-2"></div>
						<div className="col-xs-10 col-sm-10 col-md-8" id="portfolio-table">
							<h1 id="table-head">Your Portfolio</h1>
							<ReactTable
								className="striped"
								data={this.state.tableData}
								columns={columns}
								showPagination={false}
								showPageSizeOptions={false}
								minRows={1}
								pageSize={this.state.tableRow}
								resizable={true}
							/>
						</div>
						<div className="col-xs-1 col-sm-1 col-md-2"></div>
					</div>
				</div>

			)
	}
}

export default AccountSummary