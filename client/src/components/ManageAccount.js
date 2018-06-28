import React, { Component } from "react"

import AddCoin from "./AddCoin"
import DeleteCoin from "./DeleteCoin"

// import Select from "react-select"
// import "react-select/dist/react-select.css"

// import API from "../utils/API"

// class ManageAccount extends Component {
// 	constructor(props) {
// 		super(props)
// 		this.state = {
// 			userId: 1,
// 			coinOptions: [],
// 			selectedCoinOption: ""
// 		}

// 		this.getCoinOptions = this.getCoinOptions.bind(this)

// 	}

// 	componentDidMount() {
// 		this.getCoinOptions()
// 	}

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




// 	render() {
// 		const { selectedOption } = this.state


// 		return (
// 			<div className="row">
// 				<div className="col-xs-12 col-sm-12 col-md-6">
// 					<h1>Manage Your Wallet</h1>
// 				</div>

// 				<div className="col-xs-12 col-sm-12 col-md-6">
// 					<AddCoin />
// 				</div>
// 			</div>
// 		)

// 	}
// }

// export default ManageAccount

const ManageAccount = props => (
	<div className="main">
		<div className="row">
			<div className="col-12 text-center">
				<h1>Manage Your Wallet</h1>
			</div>
		</div>
		<div className="row">
			<div className="col-xs-12 col-sm-12 col-md-2"></div>
			<div className="col-xs-12 col-sm-12 col-md-3">
				<AddCoin />
			</div>
			<div className="col-xs-12 col-sm-12 col-md-2"></div>
			
			<div className="col-xs-12 col-sm-12 col-md-3">
				<DeleteCoin />
			</div>
			<div className="col-xs-12 col-sm-12 col-md-2"></div>
		</div>
	</div>

)


export default ManageAccount



