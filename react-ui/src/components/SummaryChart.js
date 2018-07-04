import React from "react";

import { PieChart } from "react-easy-chart";
import { Legend } from "react-easy-chart";


const SummaryChart =  props => (
	<div>
		<PieChart
			size={400}
			innerHoleSize={200}
			data={props.data}
			styles={props.styles}		
		/>
		<Legend 
			data={props.data} 
			dataId={"key"} 
			horizontal	
		/>
	</div>
)

export default SummaryChart;