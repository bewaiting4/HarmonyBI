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
			data: true
		}, {
			id: "chart7",
			type: "bar",
			size: 6
		}, {
			id: "chart8",
			type: "table",
			data: true,
			size: 6
		}];

		this.hashCharts = {
			"chart1": {
				id: "chart1",
				type: "network"					
			}, 
			"chart2": {
				id: "chart2",
				type: "map2"
			}, 
			"chart3": {
				id: "chart3",
				type: "map"
			},
			"chart4": {
				id: "chart4",
				type: "line"
			},
			"chart5": {
				id: "chart5",
				type: "pie"
			},
			"chart6": {
				id: "chart6",
				type: "table",
				data: true
			},
			"chart7": {
				id: "chart7",
				type: "bar",
				size: 6
			}, 
			"chart8": {
				id: "chart8",
				type: "table",
				data: true,
				size: 6
			}
		};

		this.handleExpandCollapse = this.handleExpandCollapse.bind(this);

		this.state = {
			fullScreen: ""
		}
	}

	/**
	* flag: true for expand, false for collapse
	*/
	handleExpandCollapse(id, flag) {
		this.setState({
			fullScreen: flag ? id : ""
		})
	}

	render() {
		let me = this;
		let charts = null;

		if (this.props.tab === 0) {			
  			charts = (this.state.fullScreen !== "" ? [_.assign(this.hashCharts[this.state.fullScreen], {size: 12})] : this.charts).map((chart)=> <ChartContainer 
  				key={chart.id} 
  				id={chart.id} 
  				type={chart.type} 
  				{...chart.size && {size: chart.size}}
  				{...chart.data && {data: me.props.data.vizData}}
  				{...{viewHeight: this.props.dim.height}}
  				onExpandCollapse={this.handleExpandCollapse}
  			/>);
		} else {
			charts = <ChartContainer id="chart9" type="table" size={12} data={this.props.data.vizData}/>;
		}

		return (
			<div className="right_col" role="main" style={{height: this.props.dim.height+'px', 'overflow': 'auto'}}>
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