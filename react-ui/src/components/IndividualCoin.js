import React from "react";

import CoinName from "./CoinName";
import CoinCard from "./CoinCard";
import CoinGraph from "./CoinGraph";


const IndividualCoin = props => (
	<div className="row" id="individual-coin">
		<CoinName 
			coinName={props.coinName} 
		/>
		<div className="row">
			<div className="col-xs-12 col-sm-12 col-md-3">
				<CoinCard 
					heading="Current Price" 
					text={props.coinValue} 
				/>	 
			</div>
			<div className="col-xs-12 col-sm-12 col-md-9">
				<CoinGraph 
					token={props.token}
					coinName={props.coinName}
					coinSymbol={props.coinSymbol} 
				/>
			</div>
		</div>
	</div>
);


export default IndividualCoin;