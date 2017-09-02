import React from 'react';
import ReactDataGrid from 'react-data-grid';

class Grid extends React.Component {
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
			{key: "f_number", name: "本方号码"}, 
			{key: "f_district", name: "本方归属地"},
			{key: "t_number", name: "对方号码"},
			{key: "t_district", name: "对方归属地"},
			{key: "call_start", name: "通话开始时间"},
			{key: "call_duration", name: "通话时长(秒)"}
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

