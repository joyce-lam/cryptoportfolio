import React, { Component } from "react"

// import Sidenav2 from "./Sidenav2"
import SummaryChart from "./SummaryChart"
import CoinCard from "./CoinCard"

class AccountSummary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			UserId: 1,
			totalAmount: 1000000000000,
			userCoins: []
		
		}

		this.getUserInfo = this.getUserInfo.bind(this)
		
	}


	componentDidMount() {
		this.getUserInfo()
		// this.getAccountInfo()
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

    getUserInfo = () => {
        fetch(`/api/users/${this.state.UserId}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(response => {
            console.log(response)
            return response
        })
    }

    
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
	




	render() {

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
							<SummaryChart />
						</div>
					</div>
				</div>
				
					
				
			)
	}
}

export default AccountSummary