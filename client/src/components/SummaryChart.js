import React, { Component } from "react"

import { PieChart } from "react-easy-chart"
import { Legend } from "react-easy-chart" 


class AccountSummary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
			piechartData: [
						      { key: 'A', value: 100, color: '#aaac84' },
						      { key: 'B', value: 200, color: '#dce7c5' },
						      { key: 'C', value: 50, color: '#e3a51a' }
						    ],
			config: [
						{color: '#aaac84'},
					    {color: '#dce7c5'},
					    {color: '#e3a51a'}
					]
		}


		this.styles = {
	      '.chart_lines': {
	        stroke: 'rgba(0, 0, 0, 1)',
	        strokeWidth: 1
	      },
	      '.chart_text': {
	        fontSize: '10px',
	        fill: 'white'
	      }
    	}

	}

	// var config = [
	// 	    {color: '#aaac84'},
	// 	    {color: '#dce7c5'},
	// 	    {color: '#e3a51a'}
	// ]

	render() {

		return (
				<div>
					<PieChart
						size={400}
						innerHoleSize={200}
						labels
						data={this.state.piechartData}
						styles={this.styles}		
					/>
					<Legend 
						data={this.state.piechartData} 
						dataId={"key"} 
						horizontal
						config={this.state.config}
					/>
				</div>
				
					
				
			)
	}
}

export default AccountSummary