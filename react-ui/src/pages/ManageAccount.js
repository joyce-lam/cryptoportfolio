import React, { Component } from "react";

import AddCoin from "../components/AddCoin";
import DeleteCoin from "../components/DeleteCoin";
import UserCoinTable from "../components/UserCoinTable";

import Auth from "../utils/Auth";

import decode from "jwt-decode";

class ManageAccount extends Component {
	constructor(props) {
		super(props);

		const token = Auth.getToken();
		const profile = decode(token);

		this.state = {
			userId: profile.sub,
			token: token,
		};
 	}

 	render() {
 		return (
 			<div className="main">
				<div className="row">
					<div className="col-12 text-center">
						<h1 id="summary-head">Manage Your Wallet</h1>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12 col-sm-12 col-md-2"></div>
					<div className="col-xs-12 col-sm-12 col-md-4">
						<AddCoin 
							userId={this.state.userId}
							token={this.state.token}
						/>
					</div>
					<div className="col-xs-12 col-sm-12 col-md-4">
						<DeleteCoin 
							userId={this.state.userId}
							token={this.state.token}
						/>
					</div>
					<div className="col-xs-12 col-sm-12 col-md-2"></div>
				</div>
				<div className="row">
					<div className="col-2"></div>
					<div className="col-9 text-center" id="asset-table">
						<h3> Your Current Asset</h3>
						<UserCoinTable 
							userId={this.state.userId}
							token={this.state.token}
						/>
					</div>	
					<div className="col-1"></div>
				</div>
			</div>
		)

 	}
}

export default ManageAccount



