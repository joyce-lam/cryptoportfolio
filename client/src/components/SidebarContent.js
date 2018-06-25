import React, { Component } from 'react'
import {
	BrowserRouter,
	Route,
	Link
} from "react-router-dom"

import Icon from 'react-icons-kit'
import {user} from 'react-icons-kit/icomoon/user'

class SidebarContent extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div>
					<Icon size={28} icon={user} id="user-icon" />
				</div>
				<a href="/home">Home</a>
				<a href="/coin">Coins</a>
			</div>
		)
	}
}

export default SidebarContent