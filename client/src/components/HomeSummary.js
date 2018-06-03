import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Icon } from 'react-icons-kit'
import {menu} from 'react-icons-kit/icomoon/menu'
import {user} from 'react-icons-kit/icomoon/user'
import {x} from 'react-icons-kit/feather/x'

// import IndividualCoin from "./IndividualCoin"

import AccountSummary from "./AccountSummary"

class HomeSummary extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selected: false,
			width: 0,
			marginLeft: 0,
			coinname: "coin",
			random: "random"
		}

		this.handleOpenClick = this.handleOpenClick.bind(this)
		this.handleCloseClick = this.handleCloseClick.bind(this)
	}


	componentDidMount() {
		console.log(this.props)
	}

	handleOpenClick() {
		this.setState ({
			selected: true,
			width: 200,
			marginLeft: 200
		})
	}

	handleCloseClick() {
		this.setState ({
			selected: true,
			width: 0,
			marginLeft: 0
		})
		
	}

				

	render() {

		return (
				<div>
					<div className="sidenav" style={{width:this.state.width}}>
						<div  id="x-icon" >
							<Icon size={28} icon={x} onClick={this.handleCloseClick} />
						</div>
						<div>
							<Icon size={28} icon={user} id="user-icon" />
						</div>
						
						<a href="/">Logout</a>
					        
					</div>
					<div className="main" style={{marginLeft: this.state.marginLeft}}>
						<Icon size={32} icon={menu} id="menu-icon" onClick={this.handleOpenClick}/>
						<AccountSummary />		
					</div>
				</div>
			)
	}
}

export default HomeSummary