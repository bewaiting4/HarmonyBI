import React from "react";
import ChartContainer from "./ChartContainer";

class DocumentView extends React.Component {
	constructor(props) {
		super(props);

		this.charts = [{
			id: "chart1",
			type: "network"					
		}, {
			id: "chart2",
			type: "map2"
		}, {
			id: "chart3",
			type: "map"
		}, {
			id: "chart4",
			type: "line"
		}, {
			id: "chart5",
			type: "pie"
		}, {
			id: "chart6",
			type: "table",
		}, {
			id: "chart7",
			type: "bar",
			size: 6
		}, {
			id: "chart8",
			type: "table",
			size: 6
		}];
	}

	render() {
		let charts = null
		if (this.props.tab === 0) {

			
  			charts = this.charts.map((chart)=> <ChartContainer key={chart.id} id={chart.id} type={chart.type} {...chart.size && {size: chart.size}}/>);
			// charts = <div className="row">
			// 			<ChartContainer id={this.charts[0].id} type={charts[0].type}/>
			// 			<ChartContainer id="chart2" type="map2" />
			// 			<ChartContainer id="chart3" type="map" />

			// 			<ChartContainer
			// 				id="chart4"
			// 				type="line"							
			// 			/>
			// 			<ChartContainer id="chart5" type="pie" />
			// 			<ChartContainer id="chart6" type="table" />

			// 			<ChartContainer id="chart7" type="bar" size={6} />
			// 			<ChartContainer id="chart8" type="table" size={6} />
			// 		</div>
		} else {
			charts = <ChartContainer id="chart9" type="table" size={12}/>;
		}

		return (
			<div className="right_col" role="main">
				<div className="">
					<div className="clearfix" />

					<div className="row">
						{charts}
					</div>
				</div>
			</div>
		);
	}
}
module.exports = DocumentView;