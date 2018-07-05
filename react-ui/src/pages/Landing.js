import React, { Component } from "react";

import API from "../utils/API";

import ReactTable from "react-table";

class Landing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tableData: [],
			top10: [],
			top10FullName: []
		};

		this.getTableData = this.getTableData.bind(this);
	}

	componentDidMount() {
		this.getTableData();
	}

	getTableData = () => {
		API.getTop10Data()
			.then(res => {
				let result = res.data
				this.setState({
					tableData: result
				});
			}).catch(err => {
				console.log(err);
			})
	}

	render() {
		const columns = [{
			Header: "Full Name",
			accessor: "fullName",
			headerClassName: "header-style",
			className: "table-body"
		},{
			Header: "Symbol",
			accessor: "cryptoName",
			headerClassName: "header-style",
			className: "table-body"
		},{
			Header: "Price",
			accessor: "price",
			headerClassName: "header-style",
			className: "table-body"
		},{
			Header: "Volume (24H)",
			accessor: "vol24H",
			headerClassName: "header-style",
			className: "table-body"
		}, {
			Header: "Market Cap",
			accessor: "marketCap",
			headerClassName: "header-style",
			className: "table-body"
		}, {
			Header: "Change (24H)",
			accessor: "change24H",
			headerClassName: "header-style",
			className: "table-body"
		}, {
			Header: "%Change (24H)",
			accessor: "change24Hpct",
			headerClassName: "header-style",
			className: "table-body"
		}];

		return (
				<div>
					<div className="main">
						<div className="row">
							<div className="col-12 text-center">
								<h1 id="app-name">CryptoPortfolio</h1>
							</div>
						</div>
						<div id="table-section">
							<h1 id="table-head">Top 10 List</h1>
							<h3 id="table-head2">Top 10 cryptocurrencies by total volume across all markets in the last 24 hours</h3>
							<ReactTable
								className="striped"
								data={this.state.tableData}
								columns={columns}
								showPagination={false}
								showPageSizeOptions={false}
								defaultPageSize={10}
								resizable={true}
							/>
						</div>
					</div>
				</div>
				)
			}
}

export default Landing;