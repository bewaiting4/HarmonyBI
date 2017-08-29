import React from "react";
import _ from 'lodash';

import ChartContainer from "./ChartContainer";

class DocumentView extends React.Component {
	constructor(props) {
		super(props);

		this.charts = [{
			id: "chart1",
			type: "network",
		}, {
			id: "chart2",
			type: "map2"
		}, {
			id: "chart3",
			type: "map"
		}, {
			id: "chart4",
			type: "combo",
			title: "嫌疑人通话时长和次数趋势",
			data: true
		}, {
			id: "chart5",
			type: "pie",
			title: "嫌疑人手机型号",
			data: true
		}, {
			id: "chart6",
			type: "table",
			title: "紧密联系人名单",
			data: true
		}, {
			id: "chart7",
			type: "bar",
		}, {
			id: "chart8",
			type: "table",
			title: "嫌疑人名单",
			data: true,
		}];

		this.hashCharts = _.keyBy(this.charts, 'id');

		this.handleExpandCollapse = this.handleExpandCollapse.bind(this);

		this.state = {
			fullScreen: ""
		}
	}

	/**
	* flag: true for expand, false for collapse
	*/
	handleExpandCollapse(id, flag) {
		this.hashCharts[id].size = flag ? 12 : 6;
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
  				isUnfold={this.props.isUnfold}
  				{...chart.title && {title: chart.title}}
  				{...chart.size && {size: chart.size}}
  				{...chart.data && {data: me.props.data.vizData}}
  				{...{viewHeight: this.props.dim.height}}
  				onExpandCollapse={this.handleExpandCollapse}
  			/>);
		} else {
			charts = <ChartContainer id="chart9" type="table" size={12} data={this.props.data.vizData} viewHeight={this.props.dim.height} isUnfold={this.props.isUnfold}/>;
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