import React, { Component } from "react"

import ReactTable from "react-table"

import API from "../utils/API"

class UserCoinTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: 1,
			userCoinsAndShares: [],
			coinData: [],
			tableData: [],
			tableRow: 1,
            selectedCoin: ""
		}

		this.getAccountInfo = this.getAccountInfo.bind(this)
    	this.getUserCoinData = this.getUserCoinData.bind(this)
		this.processTableData = this.processTableData.bind(this)
	}


	componentDidMount() {
		this.getAccountInfo("1")
	}
	
    getAccountInfo = (userId) => {
    	API.getUserCrypto(userId)
    		.then(res => {
    			console.log(res.data)
    			return res.data
    		}).then(result => {
    			this.setState({
    				userCoinsAndShares: result
    			})

    			let coinArr = []
    			let coinArrFullName = []
                let shareArr = []

    			result.forEach((one, ind) => {
                    coinArrFullName.push(result[ind].cryptoName)
    				coinArr.push(result[ind].cryptoSymbol)
    				shareArr.push(result[ind].shares)
    			})

    			let noOfRow = coinArr.length
    			//console.log(noOfRow)
		    	this.setState({
		    		tableRow: noOfRow,
                    userCoinShares: shareArr
		    	})

    			coinArr = coinArr.join()
    			shareArr = shareArr.join()
    			this.getUserCoinData(userId, coinArr, shareArr, coinArrFullName)

    		}).catch(err => {
    			console.log(err)
    		})
    }


    getUserCoinData = (userId, coinArr, shareArr, coinArrFullName) => {

    	API.getUserCryptoData(userId, coinArr, shareArr)
    		.then(res => {
    			console.log(res.data)
    			return res.data
    		}).then(result => {
               
                let processedResultForTable = []
                 result.forEach((one, ind) => {
                    let processedObj = {}
                    processedObj["key"] = coinArrFullName[ind]
                    processedObj["value"] = result[ind].value
                    processedObj["currentPrice"] = result[ind].currentPrice
                    processedResultForTable.push(processedObj)
                })

                 this.setState({
                    coinData: processedResultForTable
                 })

    			this.processTableData(coinArrFullName, coinArr, shareArr)
    		}).catch(err => {
    			console.log(err)
    		})
    }

    processTableData = (coinArrFullName, coinArr, shareArr) => {
    	let symbolArr = coinArr.split(",")
    	let shareAmountArr = shareArr.split(",")
    	let tableArr = []
    	this.state.coinData.forEach((one, ind) => {
    		let tableObj = {}
    		tableObj["name"] = `${coinArrFullName[ind]} ${symbolArr[ind]}`
            tableObj["currentPrice"] = `$ ${one["currentPrice"]}`
    		tableObj["shareAmount"] = shareAmountArr[ind]
    		tableObj["value"] = `$ ${one["value"]}`
    		tableArr.push(tableObj)
    	})

    	this.setState({
    		tableData: tableArr
    	})
    }

	render() {

		const columns = [{
				Header: "Cryptocurrency Name",
				accessor: "name",
				headerClassName: "header-style",
				className: "table-body"
			},{
                Header: "Current Price",
                accessor: "currentPrice",
                headerClassName: "header-style",
                className: "table-body"
            },{
				Header: "Quantity",
				accessor: "shareAmount",
				headerClassName: "header-style",
				className: "table-body"
			},{
				Header: "Value",
				accessor: "value",
				headerClassName: "header-style",
				className: "table-body"
			}]

		return (
                <div id="portfolio-table">		
    				<ReactTable
    					className="striped"
    					data={this.state.tableData}
    					columns={columns}
    					showPagination={false}
    					showPageSizeOptions={false}
    					minRows={1}
    					pageSize={this.state.tableRow}
    					resizable={true}
                        getTdProps={(state, rowInfo, column, instance) => {
                            return {
                              onClick: (e, handleOriginal) => {
                                console.log(rowInfo.original.name)
                                this.setState({
                                    selectedCoin: rowInfo.original.name
                                })
                                console.log("selected", this.state.selectedCoin)
                                if (handleOriginal) {
                                  handleOriginal()
                                }
                              }
                            };
                          }}
    				/>		
                </div>
			)
	}
}

export default UserCoinTable