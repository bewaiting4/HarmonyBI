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
			{key: 'index', name: "序号", resizable: true},
			{key: "type", name: "身份判别", resizable: true},
			{key: "number", name: "电话号码", width: 100, resizable: true}, 
			{key: "id", name: "身份证号", resizable: true},
			{key: "district", name: "电话号码归属地", resizable: true},
			{key: "lang", name: "语种", resizable: true},
			{key: "IMEI", name: "电话机型", resizable: true},
			{key: "callCount", name: "通话次数", resizable: true},
			{key: "callTime", name: "通话时长", resizable: true},
			{key: "closeScore", name: "紧密度", resizable: true},
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

module.exports = GridContactList;

