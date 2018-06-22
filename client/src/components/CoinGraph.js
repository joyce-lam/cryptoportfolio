import React, { Component } from "react"

import { LineChart } from "react-easy-chart"
import API from "../utils/API"

class CoinGraph extends Component {
	constructor(props) {
		super(props);
		
	
	    this.state = {
	    	linechartData: [[{ x: "00:00", y: 400 }]],
	    	dateTimeRange: 23,
	    	active: true,
	    	coinName: props.coinName,
	    	coinSymbol: props.coinSymbol
	    };
		
		this.getHistoricalHour = this.getHistoricalHour.bind(this)
		this.getHistoricalDay = this.getHistoricalDay.bind(this)
		this.handleClick = this.handleClick.bind(this)
		
	}

	componentDidMount() {
		this.getHistoricalHour(this.state.coinSymbol, this.state.dateTimeRange)
	}


	handleClick = e => {
		const { name, value } = e.target;

	    this.setState({
	      [name]: value,
	      active: this.state.active ? false : true
	    });

	    // console.log(this.state.dateTimeRange)

	    this.getHistoricalHour(this.state.coinSymbol, this.state.dateTimeRange)
	}


	handleClick1 = e => {
		const { name, value } = e.target;

	    this.setState({
	      [name]: value
	    });
	    // console.log(this.state.dateTimeRange)
	    this.getHistoricalDay(this.state.coinSymbol, this.state.dateTimeRange)
	}

	getHistoricalHour = (symbol, time) => {
		API.getCoinPastHour(symbol, time)
			.then(res => {
				console.log(res)
				return res
			}).then(res => {
				this.setState({
					linechartData: res
				})
				return this.state.linechartData
			}).catch(err => { 
				console.log(err)
			})
	}

	getHistoricalDay = (symbol, time) => {
		API.getCoinPastDay(symbol, time)
			.then(res => {
				console.log(res)
				return res
			}).then(res => {
				this.setState({
					linechartData: res
				})
				return this.state.linechartData
			}).catch(err => {
				console.log(err)
			})
	}

	// getHistoricalHour() {
	// 	fetch(`https://min-api.cryptocompare.com/data/histohour?fsym=${this.state.coinSymbol}&tsym=USD&limit=${this.state.dateTimeRange}`, {
	// 	      method: 'GET',
	// 	      headers: {
	// 	        'Accept': 'application/json',
	// 	        'Content-Type': 'application/json'
	// 	      },
	// 	    }).then(response => {
	//       			response.json()
	//       		.then(text => {
	// 	      		console.log(text.Data)
		      		

	// 	      		let priceData = text.Data

	// 				let dataArray = []
	// 	      		priceData.map(singleData => {
	// 	      			let obj = {}
	// 	      			let date = new Date(singleData.time*1000)
	// 	      			let hours = date.getHours()
	// 	      			// console.log(hours)
	// 	      			obj["x"] = hours + ":00"
	// 	      			obj["y"] = singleData.high
	// 	      			dataArray.push(obj)
	// 	      			// console.log(dataArray)
	// 	      		})

	// 	  	 		this.setState({
	// 	      			linechartData: [dataArray]
	// 	      		})

	// 	      		console.log(this.state.linechartData)
	// 	      	})
	// 	      })
	// 	      .catch(error => {
	// 	      	console.log(error)
	// 	      })
	// 		}


	// getHistoricalDay() {
		
	// 	// console.log( this.state.coinSymbol, this.state.dateTimeRange)

	// 	fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=${this.state.coinSymbol}&tsym=USD&limit=${this.state.dateTimeRange}`, {
	// 	      method: 'GET',
	// 	      headers: {
	// 	        'Accept': 'application/json',
	// 	        'Content-Type': 'application/json'
	// 	      },
	// 	    }).then(response => {
	//       			response.json()
	// 		      	.then(text => {
	// 		      		// console.log(text)

	// 	      		let priceData = text.Data

	// 				let dataArray = []
	// 	      		priceData.map(singleData => {
	// 	      			let obj = {}
	// 	      			let date = new Date(singleData.time*1000)
	// 	      			let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	// 	      			let month = months[date.getMonth()]
	// 	      			let day = date.getDate()
	// 	      			// console.log(month, day)
	// 	      			obj["x"] = `${month} ${day}`
	// 	      			obj["y"] = singleData.high
	// 	      			dataArray.push(obj)
	// 	      			// console.log(dataArray)
	// 	      		})

	// 	  	 		this.setState({
	// 	      			linechartData: [dataArray]
	// 	      		})

	// 	      		// console.log(this.state.linechartData)
	// 	      	})
	// 	      })
	// 		   .catch(error => {
	// 	      	console.log(error)
	// 	      })
	// 		}

	render() {

		return (
				<div id="coin-graph">

					<div className="btn-group btn-group-sm" role="group"  style={{backgroundColor:this.state.bgColor}} >
					  <button type="button" className="btn btn-success active" name="dateTimeRange" value="23" onClick={(e) => this.handleClick(e)}>1 Day</button>
					  <button type="button" className="btn btn-success" name="dateTimeRange" value="3" onClick={(e) => this.handleClick1(e)}>3 Days</button>
					  <button type="button" className="btn btn-success" name="dateTimeRange" value="7" onClick={(e) => this.handleClick1(e)}>1 Week</button>
					  <button type="button" className="btn btn-success" name="dateTimeRange" value="30" onClick={(e) => this.handleClick1(e)}>1 Month</button>
					  <button type="button" className="btn btn-success" name="dateTimeRange" value="90" onClick={(e) => this.handleClick1(e)}>3 Months</button>
					  <button type="button" className="btn btn-success" name="dateTimeRange" value="180" onClick={(e) => this.handleClick1(e)}>6 Months</button>
					</div>
					<div id="linechart">
						<LineChart
							axes
						    axisLabels={{x: 'Time', y: 'Price'}}
						    xType={"text"} 
						    
						    grid
							width={680}
							height={330}
						    data={this.state.linechartData}
						  />
					</div>
				</div>
				
			)
	}
}

export default CoinGraph