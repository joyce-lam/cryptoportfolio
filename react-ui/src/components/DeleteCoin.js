import React, { Component } from "react";

import Input from "./Input";

import API from "../utils/API";

import Select from "react-select";
import "react-select/dist/react-select.css";

class DeleteCoin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: props.userId,
			token: props.token,
			userCoinsAndShares: props.userCoinsAndShares,
			coinOptionsDelete: [],
			selectedCoinOptionDelete: "",
			noOfSharesDelete: "",
			updatedShares: ""
		};

		this.renderCoinOptionsDelete = this.renderCoinOptionsDelete.bind(this);
		this.handleCoinChangeDelete = this.handleCoinChangeDelete.bind(this);
		this.handleShareChangeDelete = this.handleShareChangeDelete.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount() {
		this.renderCoinOptionsDelete(this.state.userId, this.state.token)
	}

 	renderCoinOptionsDelete = (userId, token) => {
    	API.getUserCrypto(userId, token)
    		.then(res => {		
    			this.setState({
    				userCoinsAndShares: res.data
    			});

    			return res.data;
    		}).then(result => {
    			let coinOptionsArr = [];
    			result.forEach((one, ind) => {
                    let coinOptionsObj = {}
                    coinOptionsObj["value"] = result[ind].cryptoId
                    coinOptionsObj["label"] = result[ind].cryptoName
                    coinOptionsArr.push(coinOptionsObj)
    			});

		    	this.setState({
		    		coinOptionsDelete: coinOptionsArr
		    	});

    		}).catch(err => {
    			console.log(err);
    		})
    }

	handleCoinChangeDelete = (selectedCoinOptionDelete) => {
		this.setState({
			selectedCoinOptionDelete: selectedCoinOptionDelete.value
		});
	}

	handleShareChangeDelete = event => { 
	    const { name, value } = event.target;

	    try {
	    	if (!isNaN(parseFloat(event.target.value)) && isFinite(event.target.value)) {
	    		throw "is a number";
	    	}
	    	else {
	    		console.log("not number");
	    	}
	    }
	    catch(err) {
	    	console.log(err);
	    }

	    for (var i = 0; i < this.state.userCoinsAndShares.length; i++) {
	    	if (this.state.userCoinsAndShares[i].cryptoId === this.state.selectedCoinOptionDelete) {
	    		try {
	    			if (this.state.userCoinsAndShares[i].shares < event.target.value) {
	    				throw ("Quantity to be deleted is larger than quantity available in your wallet");
	    			}	
		    	}
	    		catch(err) {
	    			console.log(err);
	    		}
	    	}
	    }

	    this.setState({
	      [name]: value
	    });
	 }; 

	
	handleDelete = event => {
	 	event.preventDefault();

	 	API.updateCoinFromUser(this.state.userId, this.state.token, this.state.selectedCoinOptionDelete, this.state.noOfSharesDelete)
	 		.then(res => {
		 		console.log("done deleting");
		 		window.location.href = "/manage-account";
		 	}).catch(err => {
		 		console.log(err);
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

export default DeleteCoin;