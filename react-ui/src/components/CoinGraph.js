import React, { Component } from "react";

import API from "../utils/API";

import { LineChart } from "react-easy-chart";
import MediaQuery from "react-responsive";
import ReactTable from "react-table";


class CoinGraph extends Component {
	constructor(props) {
		super(props);
	    this.state = {
	    	token: props.token,
	    	linechartData: [[{ x: "00:00", y: 400 }]],
	    	tableData: [],
	    	tableRow: 1,
	    	dateTimeRange: 11,
	    	active: true,
	    	coinName: props.coinName,
	    	coinSymbol: props.coinSymbol
	    };
		
		this.getHistoricalHour = this.getHistoricalHour.bind(this);
		this.getHistoricalDay = this.getHistoricalDay.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleClick1 = this.handleClick1.bind(this);
	}

	componentDidMount() {
		this.getHistoricalHour(this.state.coinSymbol, this.state.dateTimeRange, this.state.token);
	}


	handleClick = e => {
		const { name, value } = e.target;

	    this.setState({
	      [name]: value,
	      active: this.state.active ? false : true
	    });

	    this.getHistoricalHour(this.state.coinSymbol, this.state.dateTimeRange, this.state.token);
	}


	handleClick1 = e => {
		const { name, value } = e.target;

	    this.setState({
	      [name]: value,
	      active: this.state.active ? false : true
	    });

	    this.getHistoricalDay(this.state.coinSymbol, this.state.dateTimeRange, this.state.token)
	}

	getHistoricalHour = (symbol, time, token) => {
		API.getCoinPastHour(symbol, time, token)
			.then(res => {
				let noOfRow = res.data.length

				this.setState({
					linechartData: [res.data],
					tableData: res.data,
					tableRow: noOfRow
				});

				return res.data;
			}).catch(err => { 
				console.log(err)
			})
	}

	getHistoricalDay = (symbol, time, token) => {
		API.getCoinPastDay(symbol, time, token)
			.then(res => {
				let noOfRow = res.data.length

				this.setState({
					linechartData: [res.data],
					tableData: res.data,
					tableRow: noOfRow
				});

				return res.data;
			}).catch(err => {
				console.log(err);
			})
	}

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
				}];

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

export default CoinGraph;