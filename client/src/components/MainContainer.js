import React, { Component } from 'react'
import {
	BrowserRouter,
	Route,
	Link
} from "react-router-dom"


import Landing from "./Landing"
import HomeSummary from "./HomeSummary"


class MainContainer extends Component {


	render() {
		return (
			<BrowserRouter>
		      <div>
		      	<Route exact path="/" component={Landing} />
		        <Route exact path="/home" component={HomeSummary} />
		        <Route exact path="/coin" component={CoinSummary} />
		      </div>
		  	</BrowserRouter>
			
		)
	}
}

export default MainContainer