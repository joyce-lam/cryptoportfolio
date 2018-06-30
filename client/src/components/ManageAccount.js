import React, { Component } from "react"

import AddCoin from "./AddCoin"
import DeleteCoin from "./DeleteCoin"
import UserCoinTable from "./UserCoinTable"

// import Select from "react-select"
// import "react-select/dist/react-select.css"
import API from "../utils/API"

class ManageAccount extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userId: 1,
			userCoinsAndShares: []
		}

// 		this.getCoinOptions = this.getCoinOptions.bind(this)
		// this.getAccountInfo = this.getAccountInfo.bind(this)
 	}

	// componentDidMount() {
	// 	//this.getCoinOptions()
	// 	this.getAccountInfo(this.state.userId)
	// }

// 	getCoinOptions = () => {
// 		API.getCoinList()
// 			.then(res => {
// 				console.log(res.data)
// 				this.setState({
// 					coinOptions: res.data
// 				})
// 				return res.data
// 			}).catch(err => {
// 				console.log(err)
// 			})
// 	}



// 	handleChange = (selectedOption) => {
// 		this.setState({
// 			selectedCoinOption: selectedCoinOption.label
// 		})

// 		console.log("a", this.state.selectedCoinOption, "b", selectedCoinOption.label)
// 	}

	

 	render() {
 		return (
 			<div className="main">
				<div className="row">
					<div className="col-12 text-center">
						<h1>Manage Your Wallet</h1>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12 col-sm-12 col-md-2"></div>
					<div className="col-xs-12 col-sm-12 col-md-4">
						<AddCoin 
							userId={this.state.userId}
						/>
					</div>
					<div className="col-xs-12 col-sm-12 col-md-4">
						<DeleteCoin 
							userId={this.state.userId}
						/>
					</div>
					<div className="col-xs-12 col-sm-12 col-md-2"></div>
				</div>
				<div className="row">
					<div className="col-2"></div>
					<div className="col-9 text-center" id="asset-table">
						<h3> Your Current Asset</h3>
						<UserCoinTable />
					</div>	
					<div className="col-1"></div>
				</div>
			</div>
		)

 	}
}

export default ManageAccount



