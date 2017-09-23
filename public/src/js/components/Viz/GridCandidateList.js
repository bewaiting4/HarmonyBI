import React from 'react'
import ReactDataGrid from 'react-data-grid'
import ENUM from '../Enums'
import SuspectTypeFormatter from './SuspectTypeFormatter'
import HighlightFormatter from './HighlightFormatter'
import { Editors, Toolbar, Formatters } from 'react-data-grid-addons'
const { AutoComplete: AutoCompleteEditor, DropDownEditor } = Editors;

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
		let lvlMapping_sn = {}
		lvlMapping_sn[ENUM.SPECIAL_NUMBER_KEY.YES] = 2;
		lvlMapping_sn[ENUM.SPECIAL_NUMBER_KEY.NOT] = 1;

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
			{key: "idNumber", name: "身份证号", resizable: true},
			{key: "district", name: "电话号码归属地", resizable: true},
			{key: "lang", name: "语种", resizable: true},
			{key: "IMEI", name: "电话机型", resizable: true},
			{
				key: "serviceType", 
				name: "续网能力", 
				resizable: true, 
				formatter: <HighlightFormatter 
					lvlMapping={ENUM.SERVICE_TYPE_SCORE_MAP} 
					titleMapping={ENUM.SERVICE_TYPE_MAP}
				/>
			},
			{
				key: "isSpecialNumber",
				name: "靓号度",
				resizable: true,
				formatter: <HighlightFormatter 
					lvlMapping={lvlMapping_sn} 
					titleMapping={ENUM.SPECIAL_NUMBER_MAP}
				/>
			},
			{
				key: "closeScore",
				name: "案发前后紧密度",
				resizable: true,
				formatter: <HighlightFormatter 
					lvlMapping={ENUM.CLOSE_SCORE_MAP}
					titleMapping={ENUM.CLOSE_MAP}
				/>
			},
			{
				key: "connectionStatus",
				name: "案发前后联系状况",
				resizable: true,
				formatter: <HighlightFormatter 
					lvlMapping={ENUM.CONNECTION_SCORE_MAP}
					titleMapping={ENUM.CONNECTION_MAP}
				/>
			},
			{
				key: "isIntersect",
				name: "案发前后活动轨迹",
				resizable: true,
				formatter: <HighlightFormatter 
					lvlMapping={ENUM.INTERSECT_SCORE_MAP}
					titleMapping={ENUM.INTERSECT_MAP}
				/>				
			},
			{
				key: "isPresent",
				name: "案发前后是否在场",
				resizable: true,
				formatter: <HighlightFormatter 
					lvlMapping={ENUM.PRESENT_SCORE_MAP}
					titleMapping={ENUM.PRESENT_MAP}
				/>
			}, {
				key: "notes",
				name: "备注",
				resizable: true,
				editable: true
			}
		];
	}

	componentDidMount() {
		this.setState({
			rows: _.map(this.props.data, function(p) {
				return _.assign(p, {
					type: ENUM.CATEGORY_MAP[p.type],
					isSpecialNumber: (p.isSpecialNumber === ENUM.SPECIAL_NUMBER_KEY.NOT) ? ENUM.SPECIAL_NUMBER_KEY.NOT : ENUM.SPECIAL_NUMBER_KEY.YES,
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
			rowsCount={this.props.data.length}
			minHeight={this.props.height}
			onGridRowsUpdated={this.handleGridRowsUpdated}
		/>;
	}
}

module.exports = GridCandidateList;

