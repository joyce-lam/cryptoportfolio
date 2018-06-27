import React from "react"
import Icon from 'react-icons-kit'
import {coinDollar} from 'react-icons-kit/icomoon/coinDollar'

const CoinList = props => (

	<div className="row">
		<div className="col-md-5"></div>
		<div className="col-md-1">
			<Icon size={32} icon={coinDollar} id={props.id} />
		</div>
		<div className="col-md-1">
			<li className="coin-list">
				{props.children}
			</li>
		</div>
		<div className="col-md-5"></div>
	</div>
)


export default CoinList