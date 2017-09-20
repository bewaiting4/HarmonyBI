import React from "react"
import ReactDOM from "react-dom"
import _ from "lodash"
import Menu from "./Menu"
import TopNav from "./TopNav"
import DocumentView from "./DocumentView"
import TabBar from "./TabBar"
import ExportDialog from "./ExportDialog"
import PDFExporter from "./PDFExporter"
import Model from "../model/Model"
import DataTransformer from './DataTransformer'
import DefaultData from '../model/DefaultData'

require('../build/scss/untitled.scss')
//require('../build/scss/custom.scss');

function parseCIData(data) {
	var dataLen = data.length,
		hash = {};

	for (var i = 0; i < dataLen; i++) {
		var fCI = data[i]['f_CI'],
			tCI = data[i]['t_CI'];

		hash[fCI] = true;
		hash[tCI] = true;
	}

	return hash;
}

class AppContainer extends React.Component {
	constructor() {
		super();

		this.handleToggle = this.handleToggle.bind(this);
		this.handleTabSwitch = this.handleTabSwitch.bind(this);
		this.handleApplyFilter = this.handleApplyFilter.bind(this);

		this.updateVizDataModel = this.updateVizDataModel.bind(this);
		this.openExport = this.openExport.bind(this);
		this.closeExport = this.closeExport.bind(this);

		this.exportPDF = this.exportPDF.bind(this);
		this.Exporter = PDFExporter();

		this.dataModel = Model();

		this.state = {
			isLoading: false,
			docData: null,
			isUnfold: true,
			activeTab: 0,
			width: '0',
			heigth: '0',
            showExport: false
		};

  		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	componentDidMount() {

		this.handleApplyFilter();

		this.updateWindowDimensions();
	  	window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		this.setState({ width: window.innerWidth, height: window.innerHeight + $(window).scrollTop() });
	}

	updateVizDataModel(data) {
 	 	this.CIData = parseCIData(data.vizData);
		this.setState({ docData: DataTransformer.transform(data)});
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

	handleApplyFilter(filter) {
		this.dataModel.setFilter(filter);

		this.setState({
			isLoading: true
		});

		try{
			this.dataModel.getVizData(
				function(data) {
					this.setState({
						isLoading: false
					});

					this.updateVizDataModel(data);
				}.bind(this)
			);			
		} catch(e) {
			this.setState({
				isLoading: false
			});
		}
	}

	openExport() {
    	this.refs.expDlg.setState({
            showExport: true
        });
	}

    handleExport() {
        this.exportPDF();     
    }

    closeExport() {
    	this.refs.expDlg.setState({
            showExport: false
        });
    }

	exportPDF() {
		Exporter.export();
	}

	render() {
		if (window.clientDebug) {
			console.log('AppContainer render');
		}
		const myData = this.state.docData || {vizData: []};
		const isUnfold = this.state.isUnfold;

		if (!this.state.isLoading) {
			return (
				<div className={isUnfold ? "nav-md" : "nav-sm"}>
					<div className="container body">
						<div className="main_container">
							<Menu
								onToggleChange={this.handleToggle}
								isUnfold={isUnfold}
								onExport={this.exportPDF}
								dim={{height: this.state.height}}
								onApplyFilter={this.handleApplyFilter}
								CIData={this.CIData}
								onOpenExport={this.openExport}
							/>
							<TopNav />
							<DocumentView data={myData} tab={this.state.activeTab} dim={{width: this.state.width - (isUnfold ? 480 : 54), height: this.state.height - 44 - 54}} isUnfold={this.state.isUnfold}/>
							<TabBar refs="tab" activeTab={this.state.activeTab} onTabChange={this.handleTabSwitch}/>
						</div>
					</div>
                	
                	<ExportDialog ref="expDlg" show={this.state.showExport} onClose={this.closeExport} onExport={this.handleExport}/>
				</div>
			);
		} else {
			return <div className="loading-bg" style={{width: this.state.width, height: this.state.height}}><h1>数据加载中</h1></div>;
		}
	}
}
module.exports = AppContainer;