import React, { Component } from "react"

import { Icon } from 'react-icons-kit'
import {menu} from 'react-icons-kit/icomoon/menu'
import {user} from 'react-icons-kit/icomoon/user'
import {x} from 'react-icons-kit/feather/x'

import ReactTable from "react-table"

import API from "../utils/API"


// import IndividualCoin from "./IndividualCoin"

class Landing extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selected: false,
			width: 0,
			marginLeft: 0,
			tableData: [],
			top10: [],
			top10FullName: []
		}

		this.handleOpenClick = this.handleOpenClick.bind(this)
		this.handleCloseClick = this.handleCloseClick.bind(this)
		this.getTableData = this.getTableData.bind(this)
	}

	componentDidMount() {
		this.getTableData()
	}


	handleOpenClick() {
		this.setState ({
			selected: true,
			width: 200,
			marginLeft: 200
		})
	}

	handleCloseClick() {
		this.setState ({
			selected: true,
			width: 0,
			marginLeft: 0
		})
		console.log(this.props)
	}


	// getTop10By24HVol = () => {
	// 	fetch(`https://min-api.cryptocompare.com/data/top/totalvol?limit=10&tsym=USD`, {
	// 	      method: 'GET',
	// 	      headers: {
	// 	        'Accept': 'application/json',
	// 	        'Content-Type': 'application/json'
	// 	      },
	// 	}).then(response => {
	//     	console.log(response)
	//       	return response.json()
	//     }).then(res => {
 //      		console.log(res.Data)
      		
      		
 //      		let top10 = []
 //      		let top10FullName = []
 //      		res.Data.forEach(topCoinData => {
 //      			top10.push(topCoinData.CoinInfo.Name)
 //      			top10FullName.push(topCoinData.CoinInfo.FullName)
 //      		})

 //      		return this.getTop10AllData(top10, top10FullName)
 //      	}).then(data => {
 //      		console.log(data)
 //      		this.setState({
 //      			tableData: data
 //      		})
      		
	//    	}).catch(error => {
 //      		console.log(error)
 //      	})
	// }


	getTableData = () => {
		API.getTop10Data()
			.then(res => {
				console.log(res)
				return res
			}).then(res => {
				this.setState({
					tableData: res
				})
				return this.state.tableData
			}).catch(err => {
				console.log(err)
			})
	}

	// getTop10AllData = (top10, fullNames) => {
	// 	let top10str = top10.join()

	// 	return fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${top10str}&tsyms=USD`, {
	// 	      method: 'GET',
	// 	      headers: {
	// 	        'Accept': 'application/json',
	// 	        'Content-Type': 'application/json'
	// 	      },
	// 	}).then(response => {
	//     	console.log(response)
	//       	return response.json()
	//     }).then(res => {
 //      		console.log(res.DISPLAY)

 //      		let dataArray = []
      		
 //      		top10.forEach((one, ind) => {
 //      			let dataObj = {}
 //      			dataObj["fullName"] = fullNames[ind]
 //      			dataObj["cryptoName"] = one
 //      			dataObj["price"] = res.DISPLAY[one].USD.PRICE
 //      			dataObj["change24H"] = res.DISPLAY[one].USD.CHANGE24HOUR
 //      			dataObj["change24Hpct"] = res.DISPLAY[one].USD.CHANGEPCT24HOUR
 //      			dataObj["vol24H"] = res.DISPLAY[one].USD.VOLUME24HOUR
 //      			dataObj["marketCap"] = res.DISPLAY[one].USD.MKTCAP
 //      			dataArray.push(dataObj)
 //      		})

 //      		console.log(dataArray)
      		
 //      		return dataArray
 //      	}).catch(error => {
 //      		console.log(error)
 //      	})

	// }

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
		}]


		return (
				<div>
					<div className="sidenav" style={{width:this.state.width}}>
						<div  id="x-icon" >
							<Icon size={28} icon={x} onClick={this.handleCloseClick} />
						</div>
						<div>
							<Icon size={28} icon={user} id="user-icon" />
						</div>
						<a href="/home">Home</a>
						
					</div>
					<div className="main" style={{marginLeft: this.state.marginLeft}}>
						<Icon size={32} icon={menu} id="menu-icon" onClick={this.handleOpenClick}/>
						
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

export default Landing