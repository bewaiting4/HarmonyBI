import React from 'react'
import _ from 'lodash'
import ReactDataGrid from 'react-data-grid'
import { Editors, Toolbar, Formatters } from 'react-data-grid-addons'
import ENUM from '../Enums'
import SuspectTypeFormatter from './SuspectTypeFormatter'
import HighlightFormatter from './HighlightFormatter'
const { AutoComplete: AutoCompleteEditor, DropDownEditor } = Editors;

class GridBase extends React.Component {
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
		return this.props.columns;
	}
	
	componentDidMount() {
		this.setState({
			rows: _.map(this.props.data, this.props.fnCusmizeRows)
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

module.exports = GridBase;

