import React from 'react';
import ReactDataGrid from 'react-data-grid';

class GridContactList extends React.Component {
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
			{key: 'index', name: ""},
			{key: "type", name: "身份判别"},
			{key: "number", name: "电话号码"}, 
			{key: "id", name: "身份证号"},
			{key: "district", name: "电话号码归属地"},
			{key: "lang", name: "语种"},
			{key: "IMEI", name: "电话机型"},
			{key: "callCount", name: "通话次数"},
			{key: "callTime", name: "通话时长"},
			{key: "closeScore", name: "紧密度"},
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

module.exports = GridContactList;

