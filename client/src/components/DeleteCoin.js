import React, { Component } from "react"

import Input from "./Input"

import Select from "react-select"
import "react-select/dist/react-select.css"

import API from "../utils/API"

class DeleteCoin extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userId: props.userId,
			userCoinsAndShares: props.userCoinsAndShares,
			coinOptionsDelete: [],
			selectedCoinOptionDelete: "",
			noOfSharesDelete: "",
			updatedShares: ""
		}

		this.renderCoinOptionsDelete = this.renderCoinOptionsDelete.bind(this)
		this.handleCoinChangeDelete = this.handleCoinChangeDelete.bind(this)
		this.handleShareChangeDelete = this.handleShareChangeDelete.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}

	componentDidMount() {
		//this.getAccountInfo("1")
		this.renderCoinOptionsDelete(this.state.userId)
	}

	// getAccountInfo = (userId) => {
 //    	API.getUserCrypto(userId)
 //    		.then(res => {
 //    			console.log(res.data)
 //    			this.setState({
 //    				userCoinsAndShares: res.data
 //    			})
 //    			return res.data
 //    		}).then(result => {
    			
 //    			let coinOptionsArr = []
 //    			result.forEach((one, ind) => {
 //                    let coinOptionsObj = {}
 //                    coinOptionsObj["value"] = result[ind].cryptoId
 //                    coinOptionsObj["label"] = result[ind].cryptoName
 //                    coinOptionsArr.push(coinOptionsObj)
 //    			})

	// 	    	this.setState({
	// 	    		coinOptionsDelete: coinOptionsArr
	// 	    	})
	// 	    	console.log(this.state.coinOptionsDelete)
    	
 //    		}).catch(err => {
 //    			console.log(err)
 //    		})
 //    }

 	renderCoinOptionsDelete = (userId) => {
    	API.getUserCrypto(userId)
    		.then(res => {
    			console.log(res.data)
    			
    			this.setState({
    				userCoinsAndShares: res.data
    			})

    			return res.data
    		}).then(result => {
    			let coinOptionsArr = []
    			result.forEach((one, ind) => {
                    let coinOptionsObj = {}
                    coinOptionsObj["value"] = result[ind].cryptoId
                    coinOptionsObj["label"] = result[ind].cryptoName
                    coinOptionsArr.push(coinOptionsObj)
    			})

		    	this.setState({
		    		coinOptionsDelete: coinOptionsArr
		    	})
		    	console.log(this.state.coinOptionsDelete)
    		}).catch(err => {
    			console.log(err)
    		})
    }

	handleCoinChangeDelete = (selectedCoinOptionDelete) => {
		
		this.setState({
			selectedCoinOptionDelete: selectedCoinOptionDelete.value
		})

		console.log("a", this.state.selectedCoinOptionDelete, "b", selectedCoinOptionDelete.label)
	}

	handleShareChangeDelete = event => { 
	    const { name, value } = event.target;

	    try {
	    	if (!isNaN(parseFloat(event.target.value)) && isFinite(event.target.value)) {
	    		throw "is a number"
	    	}
	    	else {
	    		console.log("not number")
	    	}
	    }
	    catch(err) {
	    	console.log(err)
	    }

	    for (var i = 0; i < this.state.userCoinsAndShares.length; i++) {
	    	if (this.state.userCoinsAndShares[i].cryptoId == this.state.selectedCoinOptionDelete) {
	    		try {
	    			if (this.state.userCoinsAndShares[i].shares < event.target.value) {
	    				throw ("Quantity to be deleted is larger than quantity available in your wallet")
	    			}	
		    	}
	    		catch(err) {
	    			console.log(err)
	    		}
	    	}
	    }

	    this.setState({
	      [name]: value
	    });
	    console.log(this.state.noOfSharesDelete)
	 }; 

	
	handleDelete = event => {
	 	event.preventDefault()

		// let updatedShares;
	 // 	for (var i = 0; i < this.state.userCoinsAndShares.length; i++) {
	 // 		if (this.state.userCoinsAndShares[i].cryptoId == this.state.selectedCoinOptionDelete) {
		// 	 	updatedShares = parseFloat(this.state.userCoinsAndShares[i].shares) - parseFloat(this.state.noOfSharesDelete)
		// 		console.log(updatedShares)
		// 	}
		// }

	 	console.log(this.state.userId, this.state.selectedCoinOptionDelete, this.state.noOfSharesDelete)
	 	API.updateCoinFromUser(this.state.userId, this.state.selectedCoinOptionDelete, this.state.noOfSharesDelete)
	 		.then(res => {
		 		console.log("done deleting", res)
		 		window.location.href = "/manage-account"
		 	}).catch(err => {
		 		console.log(err)
		 	})
	}




	render() {
		


		return (
			<div id="delete-coin-card">

				<div className="row">
					<div className="col-xs-12 col-sm-12 col-md-12 text-center">
						<h3 id="delete-coin-heading">Delete Cryptocurrency</h3>
					</div>
				</div>

				<div className="row">
					<div className="col-xs-12 col-sm-12 col-md-12 select-dropdown">
						<Select
							name="form-field-name"
							value={this.state.selectedCoinOptionDelete}
							onChange={this.handleCoinChangeDelete}
							options={this.state.coinOptionsDelete}
						/>
					</div>
				</div>
				<div className="row">
					<form  onSubmit={this.handleDelete}>
						<div className="col-xs-12 col-sm-12 col-md-12">
							<Input
		                      	value={this.state.noOfSharesDelete}
		                     	onChange={this.handleShareChangeDelete}
		                      	name="noOfSharesDelete"
		                      	placeholder="Quantity"
		                    />
		                    <input type="submit" value="Delete"/>
						</div>
					</form>
				</div>
			</div>
		)

	}
}

export default DeleteCoin