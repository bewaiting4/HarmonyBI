import React from 'react';
import ReactDataGrid from 'react-data-grid';

class Grid extends React.Component {
	constructor(props) {
		super(props);

		this.rowGetter = this.rowGetter.bind(this);
		this.getColumns = this.getColumns.bind(this);
	}

  	rowGetter(i) {
  		if (this.props.rowGetter) {
  			return this.props.rowGetter(i);
  		}
    	return this.props.data[i];
  	}

	getColumns() {
		if (this.props.getColumns) {
			return this.props.getColumns();
		}

		return [
			{key: "f_number", name: "本方号码"},
			{key: "f_district", name: "本方号码归属地"},
			{key: "call_start", name: "通讯时间"},
			{key: "call_duration", name: "通讯时长"},
			{key: "t_number", name: "对方号码"}, 
			{key: "t_district", name: "对方号码归属地"}
		];
	}

	render() {
		return <ReactDataGrid
			columns={this.getColumns()}
			rowGetter={this.rowGetter}
			rowsCount={this.props.data.length}
			minHeight={this.props.height}
		/>;
	}
}

module.exports = Grid;

