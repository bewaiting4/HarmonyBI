import React from 'react'
import _ from 'lodash'
import ReactDataGrid from 'react-data-grid'
import { Editors, Toolbar, Formatters } from 'react-data-grid-addons'
import ENUM from '../Enums'
import SuspectTypeFormatter from './SuspectTypeFormatter'
import HighlightFormatter from './HighlightFormatter'
const {DropDownEditor} = Editors;
const { Row } = ReactDataGrid;

const RowRenderer = React.createClass({
  propTypes: {
    idx: React.PropTypes.string.isRequired
  },

  setScrollLeft(scrollBy) {
    // if you want freeze columns to work, you need to make sure you implement this as apass through
    this.row.setScrollLeft(scrollBy);
  },

  getRowClassName() {
    return this.props.idx % 2 ?  'odd' : 'even';
  },

  render: function() {
    // here we are just changing the style
    // but we could replace this with anything we liked, cards, images, etc
    // usually though it will just be a matter of wrapping a div, and then calling back through to the grid
    return (<div className={this.getRowClassName()}><Row ref={ node => this.row = node } {...this.props}/></div>);
  }
});

class GridBase extends React.Component {
	constructor(props) {
		super(props);

		this.handleGridRowsUpdated = this.handleGridRowsUpdated.bind(this);

		this.rowGetter = this.rowGetter.bind(this);
		this.state = {rows: []};
	}

  	rowGetter(i) {
  		//return this.props.data[i];
  		return _.map(this.props.data, this.props.fnCusmizeRows)[i];
  	}

	getColumns() {
		return this.props.columns;
	}
	
	componentDidMount() {
		// this.setState({
		// 	rows: _.map(this.props.data, this.props.fnCusmizeRows)
		// })
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
			minHeight={this.props.height || 200}
			onGridRowsUpdated={this.handleGridRowsUpdated}
			rowRenderer={RowRenderer}
		/>;
	}
}

module.exports = GridBase;

