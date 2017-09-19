import React from "react";
import _ from 'lodash';

import ChartContainer from "./ChartContainer";

class DocumentView extends React.Component {
	constructor(props) {
		super(props);

		this.charts = [{
			id: "chart1",
			type: "network",
			category: "echarts",
			title: "嫌疑人社会关系(平时)"
		}, {
			id: "chart1-2",
			type: "network",
			category: "echarts",
			title: "嫌疑人社会关系(案发)"
		}, {
			id: "chart3",
			type: "map",
			category: "echarts",			
			title: "嫌疑人社会关系地理分布(平时)"
		}, {
			id: "chart3-2",
			type: "map",
			category: "echarts",			
			title: "嫌疑人社会关系地理分布(案发)"
		}, {
			id: "chart2",
			type: "map",
			category: "echarts",			
			title: "嫌疑人轨迹(平时)"
		}, {
			id: "chart2-2",
			type: "map",
			category: "echarts",			
			title: "嫌疑人轨迹(案发)"
		}, {
			id: "chart4",
			type: "combo",
			category: "echarts",			
			title: "嫌疑人通话时长和次数趋势(平时)"
		}, {
			id: "chart4-2",
			type: "combo",
			category: "echarts",
			title: "嫌疑人通话时长和次数趋势(案发)",
			config: {
				subType: 2
			}
		}, {
			id: "chart5",
			category: "echarts",
			type: "pie",
			title: "嫌疑人手机型号"
		}, {
			id: "chart7",
			type: "tcomm",
			category: "echarts",
			title: "嫌疑犯通话记录"
		}, {
			id: "chart6",
			type: "tableContactList",
			category: "reactgrid",
			title: "紧密联系人名单"
		}, {
			id: "chart8",
			type: "tableSuspectList",
			category: "reactgrid",			
			title: "嫌疑人名单"
		}];

		this.grid = [{
			id: "chart9",
			type: "tableCallList",
			category: "reactgrid",			
			title: "话单",
			size: 12
		}];

		this.hashCharts = _.keyBy(this.charts, 'id');

		this.handleExpandCollapse = this.handleExpandCollapse.bind(this);
		this.getChartsInPage = this.getChartsInPage.bind(this);

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

	getChartsInPage(tab) {
		return {
			0: this.state.fullScreen !== "" ? [_.assign(this.hashCharts[this.state.fullScreen], {size: 12})] : this.charts,
			1: this.grid
		}[tab];
	}

	render() {
		if (window.clientDebug) {
			console.log('DocumentView render');
		}

		let me = this;
		let charts = this.getChartsInPage(this.props.tab).map((chart)=> <ChartContainer 
				key={chart.id} 
				id={chart.id} 
				type={chart.type} 
				isUnfold={this.props.isUnfold}
				{...chart.config && {config: chart.config}}
				{...chart.title && {title: chart.title}}
				{...chart.size && {size: chart.size}}
				{...chart.category && {category: chart.category}}
				data={me.props.data.vizData}
				{...{viewDim: this.props.dim}}
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