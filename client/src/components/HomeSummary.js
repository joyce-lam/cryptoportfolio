import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AccountSummary from "./AccountSummary"

class HomeSummary extends Component {
	constructor(props) {
		super(props)
		this.state = {
			coinname: "coin",
			random: "random"
		}

	}


	componentDidMount() {
		console.log(this.props)
	}

	// handleOpenClick() {
	// 	this.setState ({
	// 		selected: true,
	// 		width: 200,
	// 		marginLeft: 200
	// 	})
	// }

	// handleCloseClick() {
	// 	this.setState ({
	// 		selected: true,
	// 		width: 0,
	// 		marginLeft: 0
	// 	})
		
	// }

	// <div className="sidenav" style={{width:this.state.width}}>
	// 	<div  id="x-icon" >
	// 		<Icon size={28} icon={x} onClick={this.handleCloseClick} />
	// 	</div>
	// 	<div>
	// 		<Icon size={28} icon={user} id="user-icon" />
	// 	</div>
		
	// 	<a href="/">Logout</a>
	        
	// </div>
	// <Icon size={32} icon={menu} id="menu-icon" onClick={this.handleOpenClick}/>


	render() {

		return (
				<div>	
					<div className="main">
						<AccountSummary />		
					</div>
				</div>
			)
	}
}

export default HomeSummary