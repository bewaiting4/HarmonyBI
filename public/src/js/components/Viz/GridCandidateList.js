import React from 'react';
import ReactDataGrid from 'react-data-grid';

class GridCandidateList extends React.Component {
	constructor(props) {
		super(props);

		this.rowGetter = this.rowGetter.bind(this);
		this.getColumns = this.getColumns.bind(this);
	}

  	rowGetter(i) {
    	return this.props.data[i];
  	}

	getColumns() {
		return [
			{key: 'index', name: "序号", resizable: true},
			{key: "type", name: "身份判别", resizable: true},
			{key: "number", name: "电话号码", width: 100, resizable: true}, 
			{key: "idNumber", name: "身份证号", resizable: true},
			{key: "district", name: "电话号码归属地", resizable: true},
			{key: "lang", name: "语种", resizable: true},
			{key: "IMEI", name: "电话机型", resizable: true},
			{key: "serviceType", name: "续网能力", resizable: true},
			{key: "isSpecialNumber", name: "靓号度", resizable: true},
			{key: "closeScore", name: "案发前后紧密度", resizable: true},
			{key: "connectionStatus", name: "案发前后联系状况", resizable: true},
			{key: "isIntersect", name: "案发前后活动轨迹", resizable: true},
			{key: "isPresent", name: "案发前后是否在场", resizable: true},
			{key: "notes", name: "备注", resizable: true}
		];
	}

	componentDidUpdate() {
		this.refs.grid.updateMetrics();
	}

	render() {
		return <ReactDataGrid
			columns={this.getColumns()}
			rowGetter={this.rowGetter}
			rowsCount={this.props.data.length}
			minHeight={this.props.height}
			ref='grid'
		/>;
	}
}

module.exports = GridCandidateList;

