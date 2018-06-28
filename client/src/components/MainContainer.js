import React, { Component } from 'react'
import {
	BrowserRouter,
	Route,
	Link
} from "react-router-dom"

import SidebarContent from "./SidebarContent"
import Landing from "./Landing"
import AccountSummary from "./AccountSummary"
import CoinSummary from "./CoinSummary"
import ManageAccount from "./ManageAccount"

import Icon from 'react-icons-kit'
import {menu} from 'react-icons-kit/icomoon/menu'
import Sidebar from 'react-sidebar'

// class MainContainer extends Component {


// 	render() {
// 		return (
// 			<BrowserRouter>
// 		      <div>
// 		      	<Route exact path="/" component={Landing} />
// 		        <Route exact path="/home" component={HomeSummary} />
// 		        <Route exact path="/coin" component={CoinSummary} />
// 		      </div>
// 		  	</BrowserRouter>
			
// 		)
// 	}
// }

// export default MainContainer

class MainContainer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			docked: false,
			open: false,
			transitions: true,
			touch: true,
			shadow: true,
			pullRight: false,
			touchHandleWidth: 20,
			dragToggleDistance: 30,
		};

		this.menuButtonClick = this.menuButtonClick.bind(this);
		this.onSetOpen = this.onSetOpen.bind(this);
	}

	onSetOpen(open) {
		this.setState({open: open});
	}

	menuButtonClick(ev) {
		ev.preventDefault();
		this.onSetOpen(!this.state.open);
	}

	render() {
		let self = this;
		
		const sidebar = <SidebarContent />

		const sidebarProps = {
			sidebar: sidebar,
			docked: this.state.docked,
			sidebarClassName: 'custom-sidebar-class',
			open: this.state.open,
			touch: this.state.touch,
			shadow: this.state.shadow,
			pullRight: this.state.pullRight,
			touchHandleWidth: this.state.touchHandleWidth,
			dragToggleDistance: this.state.dragToggleDistance,
			transitions: this.state.transitions,
			onSetOpen: this.onSetOpen,
		};

		return (
			<BrowserRouter>
				<Sidebar {...sidebarProps}>
					<div>
						<a onClick={self.menuButtonClick}>
							<Icon size={32} icon={menu} id="menu-icon" />
						</a>
					</div>
					<div>
				      	<Route exact path="/" component={Landing} />
				        <Route exact path="/home" component={AccountSummary} />
				        <Route exact path="/coins" component={CoinSummary} />
				        <Route exact path="/manage-account" component={ManageAccount} />
				    </div>
		        </Sidebar>
		  	</BrowserRouter>
			
		)
	}
}

export default MainContainer