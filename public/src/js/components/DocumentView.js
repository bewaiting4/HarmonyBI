import React from "react";
import ChartContainer from "./ChartContainer";

class DocumentView extends React.Component {
	render() {
		return (
			<div className="right_col" role="main">
				<div className="">
					<div className="clearfix" />

					<div className="row">
						<ChartContainer id="chart1" type="network" />
						<ChartContainer id="chart2" type="map2" />
						<ChartContainer id="chart3" type="map" />

						<ChartContainer
							id="chart4"
							type="line"
							data={this.props.data}
						/>
						<ChartContainer id="chart5" type="pie" />
						<ChartContainer id="chart6" type="table" />

						<ChartContainer id="chart7" type="bar" size={6} />
						<ChartContainer id="chart8" type="table" size={6} />
					</div>
				</div>
			</div>
		);
	}
}
module.exports = DocumentView;