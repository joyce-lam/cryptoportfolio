import React from "react";

import Icon from "react-icons-kit";
import {coinDollar} from "react-icons-kit/icomoon/coinDollar";

const CoinList = props => (
		<div className="row">
			<div className="col-xs-5 col-sm-5 col-md-4"></div>
			<div className="col-xs-1 col-sm-1 col-md-1" >
				<Icon size={32} icon={coinDollar}  />
			</div>
			<div className="col-xs-1 col-sm-1 col-md-3" id={props.id} data={props.data} onClick={() => props.handleCoinClick(props.data, props.id)}> 
				<li className="coin-list">
					{props.children}
				</li>
			</div>
			<div className="col-xs-5 col-sm-5 col-md-4"></div>
		</div>
);

export default CoinList;