import React from "react";

export default function CoinCard (props) {
	return (
		<div id="coin-card">
			<p>{props.heading}</p>
			<p>$ {props.text}</p>
		</div>
	)
}