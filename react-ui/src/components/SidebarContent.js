import React, { Component } from "react";
import { Link } from "react-router-dom";

import Auth from "../utils/Auth";

import Icon from "react-icons-kit";
import {user} from "react-icons-kit/icomoon/user";

class SidebarContent extends Component {
	constructor(props) {
		super(props);
		this.state = ({
			authenticated: ""
		});

		this.toggleAuthenticateStatus = this.toggleAuthenticateStatus.bind(this)
	}

	componentDidMount() {
        this.toggleAuthenticateStatus();
    }

    toggleAuthenticateStatus() {
        this.setState({ 
        	authenticated: Auth.isUserAuthenticated() 
        });
    }

	render() {
		return (
			<div>
				<div>
					<Icon size={28} icon={user} id="user-icon" />
				</div>
				{this.state.authenticated ? (
	                <div>
	                  <Link to="/home">Your Portfolio</Link>
	                  <Link to="/coins">Your Wallet</Link>
	                  <Link to="/manage-account">Manage Your Account</Link>
	                  <Link to="/logout">Log out</Link>
	                </div>
	            ) : (
	                <div>
	                  <Link to="/login">Log in</Link>
	                  <Link to="/signup">Sign up</Link>
	                </div>
	            )}
				</div>
		)
	}
}

export default SidebarContent








			