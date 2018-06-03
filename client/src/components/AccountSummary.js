import React, { Component } from "react"

// import Sidenav2 from "./Sidenav2"
import SummaryChart from "./SummaryChart"
import CoinCard from "./CoinCard"

class AccountSummary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			UserId: "",
			totalAmount: 1000000000000
		
		}
		this.getAccountInfo = this.getAccountInfo.bind(this)
	}


	componentDidMount() {
		this.getAccountInfo()
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

    // getAccountInfo = () => {
    //     fetch(`/api/accountsummary/${this.state.UserId}`, {
    //         method: "GET",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //     }).then(response => {
    //         console.log(response)
    //     })
    // }

    getAccountInfo = () => {
        fetch(`/api/accountsummary/1`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(response => {
            console.log(response)
        })
    }

	


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