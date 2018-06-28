import React, { Component } from "react"

import Input from "./Input"

import Select from "react-select"
import "react-select/dist/react-select.css"

import API from "../utils/API"

class AddCoin extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userId: 1,
			coinOptions: [],
			selectedCoinOption: "",
			noOfShares: ""
		}

		this.getCoinOptions = this.getCoinOptions.bind(this)

	}

	componentDidMount() {
		this.getCoinOptions()
	}

	getCoinOptions = () => {
		API.getCoinList()
			.then(res => {
				console.log(res.data)
				this.setState({
					coinOptions: res.data
				})
				return res.data
			}).catch(err => {
				console.log(err)
			})
	}



	handleCoinChange = (selectedCoinOption) => {
		this.setState({
			selectedCoinOption: selectedCoinOption.label
		})

		console.log("a", this.state.selectedCoinOption, "b", selectedCoinOption.label)
	}

	handleShareChange = event => { 
	    const { name, value } = event.target;

	    this.setState({
	      [name]: value
	    });
	 }; 



	render() {
		


		return (
			<div id="add-coin-card">

				<div className="row">
					<div className="col-xs-12 col-sm-12 col-md-12 text-center">
						<h3>Add Cryptocurrency</h3>
					</div>
				</div>

				<div className="row">
					<div className="col-xs-12 col-sm-12 col-md-12">
						<Select
							name="form-field-name"
							value={this.state.selectedCoinOption}
							onChange={this.handleCoinChange}
							options={this.state.coinOptions}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12 col-sm-12 col-md-12">
						<Input
	                      	value={this.state.noOfShares}
	                     	onChange={this.handleShareChange}
	                      	name="noOfShares"
	                      	placeholder="Quantity"
	                    />
					</div>
				</div>
			</div>
		)

	}
}

export default AddCoin