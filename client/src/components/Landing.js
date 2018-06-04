import React, { Component } from "react"

import { Icon } from 'react-icons-kit'
import {menu} from 'react-icons-kit/icomoon/menu'
import {user} from 'react-icons-kit/icomoon/user'
import {x} from 'react-icons-kit/feather/x'

import ReactTable from "react-table"


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
		this.getTop10By24HVol = this.getTop10By24HVol.bind(this)
		this.getTop10AllData = this.getTop10AllData.bind(this)
	}

	componentDidMount() {
		this.getTop10By24HVol()


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


	getTop10By24HVol = () => {
		fetch(`https://min-api.cryptocompare.com/data/top/totalvol?limit=10&tsym=USD`, {
		      method: 'GET',
		      headers: {
		        'Accept': 'application/json',
		        'Content-Type': 'application/json'
		      },
		    })
	    .then(response => {
	    	console.log(response)
	      	response.json()
	    .then(text => {
      		console.log(text.Data)
      		
      		
      		let top10 = []
      		let top10FullName = []
      		text.Data.map(topCoinData => {
      			top10.push(topCoinData.CoinInfo.Name)
      			top10FullName.push(topCoinData.CoinInfo.FullName)
      		})

      		top10 = top10.join()
      		this.setState({
      			top10: top10,
      			top10FullName: top10FullName
      		})

	      })
		}).then(() => {
			console.log(this.state.top10, this.state.top10FullName)
			this.getTop10AllData()

		})
	   .catch(error => {
      	console.log(error)
      })
	}

	getTop10AllData = () => {
		fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${this.state.top10}&tsyms=USD`, {
		      method: 'GET',
		      headers: {
		        'Accept': 'application/json',
		        'Content-Type': 'application/json'
		      },
		    })
	    .then(response => {
	    	console.log(response)
	      	response.json()
	      	.then(text => {
	      		console.log(text.DISPLAY)
	      		// console.log(text.DISPLAY.BTC)

	      		let dataArray = []
	      		
	      		let top10data = this.state.top10
	      		top10data = top10data.split(",")
	      		console.log(top10data)

	      		let ind = 0
	      		let fullNames = this.state.top10FullName
	      		top10data.map(one => {
	      			let dataObj = {}
	      			dataObj["fullName"] = fullNames[ind]
	      			dataObj["cryptoName"] = one
	      			dataObj["price"] = text.DISPLAY[one].USD.PRICE
	      			dataObj["change24H"] = text.DISPLAY[one].USD.CHANGE24HOUR
	      			dataObj["change24Hpct"] = text.DISPLAY[one].USD.CHANGEPCT24HOUR
	      			dataObj["vol24H"] = text.DISPLAY[one].USD.VOLUME24HOURTO
	      			dataObj["marketCap"] = text.DISPLAY[one].USD.MKTCAP
	      			ind ++
	      			dataArray.push(dataObj)
	      		})
	      		
	      		console.log(dataArray)
	      		this.setState({
	      			tableData: dataArray
	      		})
	      		
   				console.log(this.state.tableData)
	      	})
	      		
	     })
	    .catch(error => {
      		console.log(error)
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