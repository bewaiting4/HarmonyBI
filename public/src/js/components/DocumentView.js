import React from "react";
import _ from 'lodash';

import ChartContainer from "./ChartContainer";

class DocumentView extends React.Component {
	constructor(props) {
		super(props);

		this.charts = [{
			id: "chart1",
			type: "network",
			title: "嫌疑人社会关系"
		}, {
			id: "chart3",
			type: "map",
			title: "嫌疑人社会关系地理分布"
		}, {
			id: "chart4",
			type: "combo",
			title: "嫌疑人通话时长和次数趋势"
		}, {
			id: "chart4-2",
			type: "combo",
			title: "嫌疑人通话时长和次数趋势",
			subType: 2
		}, {
			id: "chart5",
			type: "pie",
			title: "嫌疑人手机型号"
		}, {
			id: "chart2",
			type: "map",
			title: "嫌疑人轨迹"
		}, {
			id: "chart6",
			type: "table",
			title: "紧密联系人名单"
		}, {
			id: "chart7",
			type: "tcomm",
			title: "嫌疑犯通话记录"
		}, {
			id: "chart8",
			type: "table",
			title: "嫌疑人名单"
		}];

		this.grid = [{
			id: "chart9",
			type: "table",
			title: "话单",
			size: 12
		}];

		this.chartsInPage = {
			0: this.charts,
			1: this.grid
		}

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
		let charts = (this.state.fullScreen !== "" ? [_.assign(this.hashCharts[this.state.fullScreen], {size: 12})] : this.chartsInPage[this.props.tab]).map((chart)=> <ChartContainer 
				key={chart.id} 
				id={chart.id} 
				type={chart.type} 
				isUnfold={this.props.isUnfold}
				{...chart.subType && {subType: chart.subType}}
				{...chart.title && {title: chart.title}}
				{...chart.size && {size: chart.size}}
				data={me.props.data.vizData}
				{...{viewHeight: this.props.dim.height}}
				onExpandCollapse={this.handleExpandCollapse}
			/>);

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