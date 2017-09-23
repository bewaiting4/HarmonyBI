import React from 'react'
import ReactDataGrid from 'react-data-grid'
import ENUM from '../Enums'
import SuspectTypeFormatter from './SuspectTypeFormatter'
import { Editors, Toolbar, Formatters } from 'react-data-grid-addons'
const { AutoComplete: AutoCompleteEditor, DropDownEditor } = Editors;


class GridCallList extends React.Component {
	constructor(props) {
		super(props);

		this.rowGetter = this.rowGetter.bind(this);
		this.getColumns = this.getColumns.bind(this);

		this.state = {rows: []};
	}

  	rowGetter(i) {
    	return this.state.rows[i];
  	}

	getColumns() {
		return [
			{key: "index", name: "序号", resizable: true},
			{key: "f_number", name: "本方电话号码", width: 100, resizable: true}, 
			{
				key: "f_type", 
				name: "本方身份判别", 
				resizable: true,
				formatter: SuspectTypeFormatter,
				editor: <DropDownEditor options={_.values(ENUM.CATEGORY_MAP)}/>				
			},
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
			{
				key: "t_type", 
				name: "对方身份判别", 
				resizable: true,
				formatter: SuspectTypeFormatter,
				editor: <DropDownEditor options={_.values(ENUM.CATEGORY_MAP)}/>								
			},
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

	componentDidMount() {
		this.setState({
			rows: _.map(this.props.data, function(o) {
				return _.assign(o, {
					f_type: ENUM.CATEGORY_MAP[o.f_type],
					t_type: ENUM.CATEGORY_MAP[o.t_type]
				});
			})
		})
	}

	componentDidUpdate() {
		this.refs.grid.updateMetrics();
	}	

	handleGridRowsUpdated({ fromRow, toRow, updated }) {
		let rows = this.state.rows.slice();

		for (let i = fromRow; i <= toRow; i++) {
			let rowToUpdate = rows[i];
			let updatedRow = _.merge(rowToUpdate, updated);
			rows[i] = updatedRow;
		}

		this.setState({rows});
	}	

	render() {
		return <ReactDataGrid
			ref='grid'
			enableCellSelect={true}
			columns={this.getColumns()}
			rowGetter={this.rowGetter}
			rowsCount={this.state.rows.length}
			minHeight={this.props.height || 200}
			onGridRowsUpdated={this.handleGridRowsUpdated}
		/>;
	}
}

module.exports = GridCallList;

