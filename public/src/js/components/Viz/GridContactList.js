import React from 'react'
import _ from 'lodash'
import ReactDataGrid from 'react-data-grid'
import { Editors, Toolbar, Formatters } from 'react-data-grid-addons'
import ENUM from '../Enums'
import SuspectTypeFormatter from './SuspectTypeFormatter'
import HighlightFormatter from './HighlightFormatter'
const { AutoComplete: AutoCompleteEditor, DropDownEditor } = Editors;

class GridContactList extends React.Component {
	constructor(props) {
		super(props);

		this.handleGridRowsUpdated = this.handleGridRowsUpdated.bind(this);

		this.rowGetter = this.rowGetter.bind(this);
		this.state = {rows: []};
	}

  	rowGetter(i) {
  		return this.state.rows[i];
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
			{key: "callTime", name: "通话时长", resizable: true},
			{key: "closeScore", name: "紧密度", resizable: true, formatter: <HighlightFormatter lvlMapping={ENUM.CLOSE_SCORE_MAP} titleMapping={ENUM.CLOSE_MAP}/>},
			{key: "notes", name: "备注", resizable: true, editable: true}
		];
	}

	componentDidMount() {
		this.setState({
			rows: _.map(this.props.data, function(o) {
				return _.assign(o, {
					type: ENUM.CATEGORY_MAP[o.type]
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

module.exports = GridContactList;

