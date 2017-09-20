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
			{key: 'index', name: "序号"},
			{key: "type", name: "身份判别"},
			{key: "number", name: "电话号码"}, 
			{key: "idNumber", name: "身份证号"},
			{key: "district", name: "电话号码归属地"},
			{key: "lang", name: "语种"},
			{key: "IMEI", name: "电话机型"},
			{key: "serviceType", name: "续网能力"},
			{key: "isSpecialNumber", name: "靓号度"},
			{key: "closeScore", name: "案发前后紧密度"},
			{key: "connectionStatus", name: "案发前后联系状况"},
			{key: "isIntersect", name: "案发前后活动轨迹"},
			{key: "isPresent", name: "案发前后是否在场"},
			{key: "notes", name: "备注"}
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

