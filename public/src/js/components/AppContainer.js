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
import DefaultFilter from '../model/DefaultFilter'

require('../build/scss/app.scss')

const DEBUG_MODE = false;

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
		this.handleOpenFilter = this.handleOpenFilter.bind(this);
		this.handleExpandCollapse = this.handleExpandCollapse.bind(this);

		this.updateVizDataModel = this.updateVizDataModel.bind(this);
		this.openExport = this.openExport.bind(this);
		this.closeExport = this.closeExport.bind(this);

		this.handleExport = this.handleExport.bind(this);
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

		this.Exporter = PDFExporter();

		this.dataModel = Model();

		this.state = {
			isLoading: true,
			docData: null,
			isUnfold: true,
			activeTab: 0,
			width: '0',
			height: '0',
            showExport: false
		};

		this.fullScreen = ""


  		window.HarmonyGlobal = {};
	}

	componentDidMount() {
		if (!DEBUG_MODE) {
			this.handleApplyFilter();
		}
		
		this.updateWindowDimensions();
	  	window.addEventListener('resize', this.updateWindowDimensions);
	}

    componentDidUpdate() {

    }

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		this.setState({ width: window.innerWidth, height: window.innerHeight + $(window).scrollTop() });
	}

	updateVizDataModel(data) {
 	 	this.CIData = parseCIData(data.vizData);
		this.setState({
			docData: DataTransformer.transform(data, this.dataModel.getFilter()),
			isLoading: false
		});
	}

	handleToggle() {
		this.setState(function(prevState, props) {
			return {
				isUnfold: !prevState.isUnfold
			};
		});
	}

	handleExpandCollapse(fullScreen) {
		this.fullScreen = fullScreen;
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
					this.updateVizDataModel(data);
				}.bind(this)
			);			
		} catch(e) {
			this.setState({
				isLoading: false
			});
		}
	}

	handleOpenFilter(resData) {
		this.updateVizDataModel(resData);
	}

	openExport() {
    	this.refs.expDlg.setState({
            showExport: true
        });
	}

    handleExport(config) {
    	if (this.state.activeTab !== 0) {
    		this.handleTabSwitch(0);
    	}    	

		this.refs.docView.handleExpandCollapse(this.fullScreen, false);

		this.Exporter.export({
			title: config.title,
			filter: this.dataModel.getFilter(),
			contactTable: this.state.docData.contactTable,
			suspectTable: this.state.docData.suspectTable,
			charts: this.refs.docView.charts,
			filterSuspects: JSON.parse(this.dataModel.getFilter().numbers),
			timeFilter: this.refs.menu.timeFilter,
			callback: config.callback
		});
    }

    closeExport() {
    	this.refs.expDlg.setState({
            showExport: false
        });
    }

	render() {
		if (window.clientDebug) {
			console.log('AppContainer render');
		}
		const myData = this.state.docData || {vizData: [], suspectTable: [], contactTable: [], threeMonthCalls: []};
		const isUnfold = this.state.isUnfold;
		let suspects = {};

		if (this.dataModel.getFilter()) {
			suspects = _.keyBy(JSON.parse(this.dataModel.getFilter().numbers), 'number') || {};
		} else {
			suspects = {};
		}

		var loadingClass;
		if (!this.state.isLoading || DEBUG_MODE) {
			loadingClass = "loading-bg hidden";
		} else {
			loadingClass = "loading-bg";
		}

		return (
			<div>
			<div className={loadingClass} style={{width: '100%', height: '100%'}}><h1>数据加载中</h1></div>

			<div className={isUnfold ? "nav-md" : "nav-sm"} style={{'top': 0}}>

				<div className="container body">
					<div className="main_container">
						<Menu
							ref='menu'
							suspects={suspects}
							onToggleChange={this.handleToggle}
							isUnfold={isUnfold}
							onExport={this.handleExport}
							dim={{height: this.state.height}}
							onApplyFilter={this.handleApplyFilter}
							CIData={this.CIData}
							onOpenExport={this.openExport}
						/>
						<TopNav onOpenFilter={this.handleOpenFilter}/>
						<DocumentView
							ref='docView'
							data={myData}
							tab={this.state.activeTab} 
							dim={{width: this.state.width - (isUnfold ? 480 : 54), height: this.state.height - 44 - 54}} 
							isUnfold={this.state.isUnfold}
							suspects={suspects}
							condition={this.dataModel.condition}
							onExpandCollapse={this.handleExpandCollapse}
						/>
						<TabBar ref="tab" activeTab={this.state.activeTab} onTabChange={this.handleTabSwitch}/>
					</div>
				</div>
            	
            	<ExportDialog ref="expDlg" show={this.state.showExport} onClose={this.closeExport} onExport={this.handleExport}/>
								
			</div>

			</div>
		);
	}
}
module.exports = AppContainer;