import React, { Component } from "react"

import { LineChart } from "react-easy-chart"
import MediaQuery from "react-responsive"
import ReactTable from "react-table"

import API from "../utils/API"

class CoinGraph extends Component {
	constructor(props) {
		super(props);
	    this.state = {
	    	linechartData: [[{ x: "00:00", y: 400 }]],
	    	tableData: [],
	    	tableRow: 1,
	    	dateTimeRange: 11,
	    	active: true,
	    	coinName: props.coinName,
	    	coinSymbol: props.coinSymbol
	    };
		
		this.getHistoricalHour = this.getHistoricalHour.bind(this)
		this.getHistoricalDay = this.getHistoricalDay.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.handleClick1 = this.handleClick1.bind(this)
		
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
	      [name]: value,
	      active: this.state.active ? false : true
	    });
	    // console.log(this.state.dateTimeRange)
	    this.getHistoricalDay(this.state.coinSymbol, this.state.dateTimeRange)
	}

	getHistoricalHour = (symbol, time) => {
		API.getCoinPastHour(symbol, time)
			.then(res => {
				console.log(res.data)

				let noOfRow = res.data.length

				this.setState({
					linechartData: [res.data],
					tableData: res.data,
					tableRow: noOfRow
				})

				return res.data
			}).catch(err => { 
				console.log(err)
			})
	}

	getHistoricalDay = (symbol, time) => {
		API.getCoinPastDay(symbol, time)
			.then(res => {
				console.log(res.data)

				let noOfRow = res.data.length

				this.setState({
					linechartData: [res.data],
					tableData: res.data,
					tableRow: noOfRow
				})

				return res.data
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

// <Media query="(max-width:768px)">
// 	{matches => 
// 		matches ? (
// 			<div>
// 			<LineChart
// 				axes
// 			    axisLabels={{x: 'Time', y: 'Price'}}
// 			    style={{ '.label': { fill: 'black' } }}
// 			    xType={"text"}  
// 			    grid
// 				width={300}
// 				height={250}
// 			    data={this.state.linechartData}
// 			  />
// 			  <p>smaller</p>
// 			 </div>
// 		) : (
// 			<div>
// 			<LineChart
// 				axes
// 			    axisLabels={{x: 'Time', y: 'Price'}}
// 			    style={{ '.label': { fill: 'black' } }}
// 			    xType={"text"}  
// 			    grid
// 				width={680}
// 				height={330}
// 			    data={this.state.linechartData}
// 			  />
// 			  <p>bigger</p>
// 			 </div>
// 		)
// 	}
// </Media>
	// 

	render() {
			const columns = [{
					Header: "Time",
					accessor: "x",
					headerClassName: "header-style",
					className: "table-body"
				},{
					Header: "Price",
					accessor: "y",
					headerClassName: "header-style",
					className: "table-body"
				}]


		return (
				<div id="coin-graph">
					<div className="row">
						<div className="col-12">
							<div className="btn-group btn-group-sm" role="group"  style={{backgroundColor:this.state.bgColor}} >
								 <button type="button" className="btn btn-success" name="dateTimeRange" value="12" onClick={(e) => this.handleClick(e)}>1 Day</button>
								 <button type="button" className="btn btn-success" name="dateTimeRange" value="3" onClick={(e) => this.handleClick1(e)}>3 Days</button>
								 <button type="button" className="btn btn-success" name="dateTimeRange" value="7" onClick={(e) => this.handleClick1(e)}>1 Week</button>
								 <button type="button" className="btn btn-success" name="dateTimeRange" value="30" onClick={(e) => this.handleClick1(e)}>1 Month</button>
								 <button type="button" className="btn btn-success" name="dateTimeRange" value="90" onClick={(e) => this.handleClick1(e)}>3 Months</button>
								 <button type="button" className="btn btn-success" name="dateTimeRange" value="180" onClick={(e) => this.handleClick1(e)}>6 Months</button>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<MediaQuery minWidth={100} maxWidth={749}>
								<ReactTable
									className="striped"
									data={this.state.tableData}
									columns={columns}
									showPagination={false}
									showPageSizeOptions={false}
									minRows={1}
									pageSize={this.state.tableRow}
									resizable={true}
								/>
							</MediaQuery>
							<MediaQuery minWidth={750} maxWidth={768}>
								<LineChart
									axes
								    axisLabels={{x: '', y: 'Price'}}
								    style={{ '.label': { fill: 'black' } }}
								    margin={{top: 20, right: 0, bottom: 15, left: 55}}
								    xType={"text"}  
								    grid
									width={450}
									height={280}
								    data={this.state.linechartData}
								  />
								  <p>Time</p>
							</MediaQuery>
							<MediaQuery minWidth={769}>
								<LineChart
									axes
								    axisLabels={{x: '', y: 'Price'}}
								    style={{ '.label': { fill: 'black' } }}
								    margin={{top: 20, right: 0, bottom: 15, left: 55}}
								    xType={"text"}  
								    grid
									width={520}
									height={380}
								    data={this.state.linechartData}
								  />
								  <p>Time</p>
							</MediaQuery>
						</div>
					</div>
				</div>
			)
	}
}

export default CoinGraph