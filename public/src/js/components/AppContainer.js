import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

import Menu from "./Menu";
import TopNav from "./TopNav";

import DocumentView from "./DocumentView";
import TabBar from "./TabBar";

import Model from "../model/Model";

import style from "./AppContainer.css";

require('../build/scss/untitled.scss');
//require('../build/scss/custom.scss');

class AppContainer extends React.Component {
	constructor() {
		super();

		this.handleToggle = this.handleToggle.bind(this);
		this.handleTabSwitch = this.handleTabSwitch.bind(this);
		this.handleSetDateRange = this.handleSetDateRange.bind(this);

		this.exportPDF = this.exportPDF.bind(this);
		this.dataModel = Model();

		this.state = {
			docData: null,
			isUnfold: true,
			activeTab: 0,
			width: '0',
			heigth: '0'
		};

  		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	componentDidMount() {
		this.dataModel.getVizData(
			function(data) {
				this.setState({ docData: data });
			}.bind(this)
		);

		// this.dataModel.getSuspectData(
		// 	function(data) {
		// 		this.suspects = data;

		// 		this.dataModel.addSuspect(
		// 			{
		// 				number: '233434',
		// 				idigit: '11111111111',
		// 				type: 0
		// 			},
		// 			function(data) {
		// 				console.log(data);
		// 			}.bind(this)
		// 		);

		// 		this.dataModel.getSuspect(
		// 			this.suspects[0]._id,
		// 			function(data) {
		// 				console.log(data);
		// 			}.bind(this)
		// 		);


		// 	}.bind(this)
		// );

		this.updateWindowDimensions();
	  	window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		this.setState({ width: window.innerWidth, height: window.innerHeight + $(window).scrollTop() });
	}

	handleToggle() {
		this.setState(function(prevState, props) {
			return {
				isUnfold: !prevState.isUnfold
			};
		});
	}

	handleTabSwitch(tabIdx) {
		this.setState({activeTab: tabIdx});
	}

	handleSetDateRange(date1, date2) {
		this.dataModel.setFilter({
			'date_from': new Date(date1),
			'date_to': new Date(date2)
		});

		this.dataModel.getVizData(
			function(data) {
				this.setState({ docData: data });
			}.bind(this)
		);
	}

	exportPDF() {
		var doc = new jsPDF("p", "pt");
		var chartNd = document.getElementById("chart1");
		var canvas = chartNd.getElementsByTagName("canvas")[0];
		var cvsWidth = canvas.width;
		var cvsHeight = canvas.height;
		var url = canvas.toDataURL("image/png");
		var pdfWidth = doc.internal.pageSize.width;
		var pdfHeight = doc.internal.pageSize.height;

		// add title
		doc.text("新疆和田地区皮山县2.11特大暴恐案件分析报告", 50, 30);

		// add chart
		doc.addImage(
			url,
			"JPEG",
			pdfWidth / 4,
			60,
			pdfWidth / 2,
			pdfWidth / 2 * cvsHeight / cvsWidth
		);

		// add table
		var columns = ["f_number", "t_number", "call_start", "call_duration"];
		var rows = [];
		_.forEach(this.state.docData.vizData, function(row) {
			var newRow = [];
			_.forEach(columns, function(prop) {
				newRow.push(row[prop]);
			});
			rows.push(newRow);
		});
		doc.autoTable(columns, rows, {
			margin: { top: 60 + pdfWidth / 2 * cvsHeight / cvsWidth + 50 }
		});

		// save document
		//doc.save('报告.pdf');
		doc.output("dataurlnewwindow");
	}

	render() {
		const myData = this.state.docData;
		const isUnfold = this.state.isUnfold;

		if (this.state.docData) {
			return (
				<div className={isUnfold ? "nav-md" : "nav-sm"}>
					<div className="container body">
						<div className="main_container">
							<Menu
								onToggleChange={this.handleToggle}
								isUnfold={isUnfold}
								onExport={this.exportPDF}
								dim={{height: this.state.height}}
								onSetDateRange={this.handleSetDateRange}
							/>
							<TopNav />
							<DocumentView data={myData} tab={this.state.activeTab} dim={{width: this.state.width - (isUnfold ? 480 : 54), height: this.state.height - 44 - 54}} isUnfold={this.state.isUnfold}/>
							<TabBar refs="tab" activeTab={this.state.activeTab} onTabChange={this.handleTabSwitch}/>
						</div>
					</div>
				</div>
			);
		} else {
			return <div>Loading...</div>;
		}
	}
}
module.exports = AppContainer;