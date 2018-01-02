import React from 'react'
import ReactDataGrid from 'react-data-grid'
import GridBase from './GridBase'
import ENUM from '../Enums'
import SuspectTypeFormatter from './SuspectTypeFormatter'
import {Editors, Toolbar, Formatters} from 'react-data-grid-addons'
const {DropDownEditor} = Editors;


class GridCallList extends React.Component {
	constructor(props) {
		super(props);
	}

	getColumns() {
		return [
			{key: "index", name: "序号", resizable: true},
			{key: "f_number", name: "本方电话号码", width: 100, height: 50, resizable: true}, 
			{
				key: "f_type", 
				name: "本方身份判别", 
				resizable: true,
				formatter: SuspectTypeFormatter,
				editor: <DropDownEditor options={_.values(ENUM.CATEGORY_MAP)}/>,
				headerRenderer: <div className='widget-HeaderCell__value wraptext'>本方身份判别</div>
			},
			{
				key: "f_idNumber",
				name: "本方身份证号",
				resizable: true,
				headerRenderer: <div className='widget-HeaderCell__value wraptext'>本方身份证号</div>
			},
			{key: "f_lang", name: "本方语种", resizable: true},
			{
				key: "f_IMEI",
				name: "本方 IMEI （机型）",
				width: 100,
				resizable: true,
				headerRenderer: <div className='widget-HeaderCell__value wraptext'>本方 IMEI （机型）</div>
			},
			{
				key: "f_district",
				name: "本方号码归属地",
				resizable: true,
				headerRenderer: <div className='widget-HeaderCell__value wraptext'>本方号码归属地</div>
			},
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
				editor: <DropDownEditor options={_.values(ENUM.CATEGORY_MAP)}/>,
				headerRenderer: <div className='widget-HeaderCell__value wraptext'>对方身份判别</div>						
			},
			{
				key: "t_idNumber",
				name: "对方身份证号",
				resizable: true,
				headerRenderer: <div className='widget-HeaderCell__value wraptext'>对方身份证号</div>
			},
			{key: "t_lang", name: "对方语种", resizable: true},
			{
				key: "t_IMEI",
				name: "对方 IMEI （机型）",
				width: 100,
				resizable: true,
				headerRenderer: <div className='widget-HeaderCell__value wraptext'>对方 IMEI （机型）</div>
			},
			{
				key: "t_district",
				name: "对方号码归属地",
				resizable: true,
				headerRenderer: <div className='widget-HeaderCell__value wraptext'>对方号码归属地</div>
			},
			{key: "t_host", name: "对方运营商", resizable: true},
			{key: "t_LAC", name: "对方LAC", resizable: true},
			{key: "t_CI", name: "对方CI", resizable: true},
			{key: "t_addr", name: "对方地址", resizable: true},
			{key: "t_long", name: "对方经度", resizable: true},
			{key: "t_lat", name: "对方纬度", resizable: true},
			{
				key: "t_origNumber",
				name: "对方原始号码",
				resizable: true,
				headerRenderer: <div className='widget-HeaderCell__value wraptext'>对方原始号码</div>
			}
		];
	}

	adjustRow(o) {
		return _.assign({}, o, {
			f_type: ENUM.CATEGORY_MAP[o.f_type],
			t_type: ENUM.CATEGORY_MAP[o.t_type]
		});
	}

	render() {
		return <GridBase 
			data={this.props.data} 
			columns={this.getColumns()} 
			fnCusmizeRows={this.adjustRow}
			height={this.props.height}
		/>
	}
}

module.exports = GridCallList;

