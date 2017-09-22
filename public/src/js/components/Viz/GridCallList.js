import React from 'react';
import ReactDataGrid from 'react-data-grid';

class GridCallList extends React.Component {
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
			{key: "index", name: "序号", resizable: true},
			{key: "f_number", name: "本方电话号码", width: 100, resizable: true}, 
			{key: "f_type", name: "本方身份判别", resizable: true},
			{key: "f_idNumber", name: "本方身份证号", resizable: true},
			{key: "f_lang", name: "本方语种", resizable: true},
			{key: "f_IMEI", name: "本方IMEI（机型）", resizable: true},			
			{key: "f_district", name: "本方号码归属地", resizable: true},			
			{key: "f_host", name: "本方运营商", resizable: true},
			{key: "f_LAC", name: "本方LAC", resizable: true},
			{key: "f_CI", name: "本方CI", resizable: true},
			{key: "f_addr", name: "本方地址", resizable: true},
			{key: "f_long", name: "本方经度", resizable: true},
			{key: "f_lat", name: "本方纬度", resizable: true},
			{key: "call_start", name: "通讯时间", resizable: true},
			{key: "call_duration", name: "通讯时长", resizable: true},
			{key: "t_number", name: "对方号码", width: 100, resizable: true}, 
			{key: "t_type", name: "对方身份", resizable: true},
			{key: "t_idNumber", name: "对方身份证号", resizable: true},
			{key: "t_lang", name: "对方语种", resizable: true},
			{key: "t_IMEI", name: "对方IMEI（机型）", resizable: true},
			{key: "t_district", name: "对方号码归属地", resizable: true},
			{key: "t_host", name: "对方运营商", resizable: true},
			{key: "t_LAC", name: "对方LAC", resizable: true},
			{key: "t_CI", name: "对方CI", resizable: true},
			{key: "t_addr", name: "对方地址", resizable: true},
			{key: "t_long", name: "对方经度", resizable: true},
			{key: "t_lat", name: "对方纬度", resizable: true},
			{key: "t_origNumber", name: "对方原始号码", resizable: true}
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

module.exports = GridCallList;

