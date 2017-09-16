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
			// {key: "f_?", name: "本方身份"},
			{key: "f_number", name: "本方号码"}, 
			// {key: "f_?", name: "本方身份证号"},
			{key: "f_district", name: "本方号码归属地"},
			{key: "f_lang", name: "本方语种"},
			{key: "f_IMEI", name: "本方IMEI（机型）"},
			// {key: "f_offservice", name: "续网能力"},
			// {key: "f_lucky", name: "靓号度"},
			// {key: "f_freq", name: "案发前后紧密度"},
			// {key: "f_contact", name: "案发前后联系状况"},
			// {key: "f_track", name: "案发前后活动轨迹"},
			// {key: "f_onsite", name: "案发前后是否在场"},
			// {key: "f_notes?", name: "备注"}
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

