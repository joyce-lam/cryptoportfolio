import React, { Component } from "react"

import Input from "./Input"

import Select from "react-select"
import "react-select/dist/react-select.css"

import API from "../utils/API"

class AddCoin extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userId: props.userId,
			coinOptionsAdd: [],
			selectedCoinOptionAdd: "",
			noOfSharesAdd: ""
		}

		this.getCoinOptions = this.getCoinOptions.bind(this)
		this.handleCoinChangeAdd = this.handleCoinChangeAdd.bind(this)
		this.handleShareChangeAdd = this.handleShareChangeAdd.bind(this)
		this.handleAdd = this.handleAdd.bind(this)

	}

	componentDidMount() {
		this.getCoinOptions()
		console.log(this.state.userId)
	}

	getCoinOptions = () => {
		API.getCoinList()
			.then(res => {
				console.log(res.data)
				this.setState({
					coinOptionsAdd: res.data
				})
				return res.data
			}).catch(err => {
				console.log(err)
			})
	}

	handleCoinChangeAdd = (selectedCoinOptionAdd) => {
		this.setState({
			selectedCoinOptionAdd: selectedCoinOptionAdd.value
		})
		console.log("a", this.state.selectedCoinOptionAdd, "b", selectedCoinOptionAdd.label, "c", selectedCoinOptionAdd.value)
	}

	handleShareChangeAdd = event => { 
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

	    this.setState({
	      [name]: value
	    });
	    console.log("eventname", event.target.name, "eventvalue", event.target.value)
	 }; 

	handleAdd = event => {
		event.preventDefault()
		//console.log("abc", this.state.selectedCoinOptionAdd, "def", this.state.noOfSharesAdd)

		API.addCoinToUser(this.state.userId, this.state.selectedCoinOptionAdd, this.state.noOfSharesAdd)
			.then(res => {
				console.log("done adding", res.data)
				window.location.href = "/manage-account"
			}).catch(err => {
				console.log(err)
			})
	}


	render() {
		


		return (
			<div id="add-coin-card">
				<div className="row">
					<div className="col-xs-12 col-sm-12 col-md-12 text-center">
						<h3  id="add-coin-heading">Add Cryptocurrency</h3>
					</div>
				</div>

				<div className="row">
					<div className="col-xs-12 col-sm-12 col-md-12 select-dropdown" >
						<Select
							name="form-field-name"
							value={this.state.selectedCoinOptionAdd}
							onChange={this.handleCoinChangeAdd}
							options={this.state.coinOptionsAdd}
						/>
					</div>
				</div>
				<div className="row">
					<form  onSubmit={this.handleAdd}>
						<div className="col-xs-12 col-sm-12 col-md-12">
							<Input
		                      	value={this.state.noOfSharesAdd}
		                     	onChange={this.handleShareChangeAdd}
		                      	name="noOfSharesAdd"
		                      	placeholder="Quantity"
		                    />
		                    <input type="submit" value="Add"/>
						</div>
        			</form>
				</div>
			</div>
		)

	}
}

export default AddCoin