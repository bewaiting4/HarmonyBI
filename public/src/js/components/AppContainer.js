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

class AppContainer extends React.Component {
	constructor() {
		super();

		this.handleToggle = this.handleToggle.bind(this);
		this.handleTabSwitch = this.handleTabSwitch.bind(this);
		this.exportPDF = this.exportPDF.bind(this);
		this.dataModel = Model();

		this.state = {
			docData: null,
			navSize: true,
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

		this.updateWindowDimensions();
	  	window.addEventListener('resize', this.updateWindowDimensions);
	  	// window.addEventListener('scroll', this.updateWindowDimensions);
	}

	componentWillUnmount() {
	  window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		console.log('update dim');
	  this.setState({ width: window.innerWidth, height: window.innerHeight + $(window).scrollTop() });
	}

	handleToggle() {
		this.setState(function(prevState, props) {
			return {
				navSize: !prevState.navSize
			};
		});
	}

	handleTabSwitch(tabIdx) {
		this.setState({activeTab: tabIdx});
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
		const navSize = this.state.navSize;

		if (this.state.docData) {
			return (
				<div className={navSize ? "nav-md" : "nav-sm"}>
					<div className="container body">
						<div className="main_container">
							<Menu
								onToggleChange={this.handleToggle}
								navSize={navSize}
								onExport={this.exportPDF}
								dim={{height: this.state.height}}
							/>
							<TopNav />
							<DocumentView data={myData} tab={this.state.activeTab} dim={{width: this.state.width - 360, height: this.state.height - 45 - 59}}/>
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