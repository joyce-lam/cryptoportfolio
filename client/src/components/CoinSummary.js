import React, { Component } from "react"

import IndividualCoin from "./IndividualCoin"

class CoinSummary extends Component {
	constructor(props) {
		super(props)
		this.state = {
			coinname: "coin",
			random: "random"
		}
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
	// 	console.log(this.props)
	// }

					// <div className="sidenav" style={{width:this.state.width}}>
					// 	<div  id="x-icon" >
					// 		<Icon size={28} icon={x} onClick={this.handleCloseClick} />
					// 	</div>
					// 	<div>
					// 		<Icon size={28} icon={user} id="user-icon" />
					// 	</div>
					// 	<a href="/home">Home</a>
					// 	<a href="/coin">Coin</a>
						
					// </div>
					// <Icon size={32} icon={menu} id="menu-icon" onClick={this.handleOpenClick}/>


	render() {

		return (
				<div>				
					<div className="main">
						<IndividualCoin 
							random={this.state.random} 
						/>
					</div>
				</div>
			)
	}
}

export default CoinSummary