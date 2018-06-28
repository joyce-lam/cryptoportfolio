import React from "react"


export default function CoinName (props) {
	return (
		<div className="row">
			<div className="col-12 justify-content-center">
				<div id="coin-name">{props.coinName}</div>
			</div>
		</div>
	)
}