import React from 'react'
import _ from 'lodash'
import ReactDataGrid from 'react-data-grid'
import { Editors, Toolbar, Formatters } from 'react-data-grid-addons'
import GridBase from './GridBase'
import ENUM from '../Enums'
import SuspectTypeFormatter from './SuspectTypeFormatter'
import HighlightFormatter from './HighlightFormatter'
const {DropDownEditor} = Editors;

class GridContactList extends React.Component {
	constructor(props) {
		super(props);
	}

	getColumns() {
		return [
			{key: 'index', name: "序号", resizable: true},
			{
				key: "type",
				name: "身份判别",
				resizable: true,
				formatter: SuspectTypeFormatter,
				editor: <DropDownEditor options={_.values(ENUM.CATEGORY_MAP)}/>
			},
			{key: "number", name: "电话号码", width: 100, resizable: true}, 
			{key: "id", name: "身份证号", resizable: true},
			{key: "district", name: "电话号码归属地", resizable: true},
			{key: "lang", name: "语种", resizable: true},
			{key: "IMEI", name: "电话机型", resizable: true},
			{key: "callCount", name: "通话次数", resizable: true},
			{key: "callTime", name: "通话时长（分）", resizable: true},
			{key: "closeScore", name: "紧密度", resizable: true, formatter: <HighlightFormatter lvlMapping={ENUM.CLOSE_SCORE_MAP} titleMapping={ENUM.CLOSE_MAP}/>},
			{key: "notes", name: "备注", resizable: true, editable: true}
		];
	}

	adjustRow(o) {
		return _.assign({}, o, {
			type: ENUM.CATEGORY_MAP[o.type]
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

module.exports = GridContactList;

