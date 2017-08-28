import React from 'react'
import ReactDataGrid from 'react-data-grid'
import EChartsWrapper from './EChartsWrapper.js'

class ChartContainer extends React.Component {
	constructor(props) {
		super(props);

		this.wrapper = new EChartsWrapper(this);
		this.toggleExpandCollapse = this.toggleExpandCollapse.bind(this);
		this.rowGetter = this.rowGetter.bind(this);
		this.getColumns = this.getColumns.bind(this);

		this.chartInstance = null;
	}

	componentDidMount() {
		if (this.props.type !== 'table' ) {
			this.chartInstance = this.wrapper.renderChart(this.props.id, this.props.type || "bar", this.chartInstance);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		this.wrapper.resizeChart(this.chartInstance);
	}

	toggleExpandCollapse() {
		this.props.onExpandCollapse(this.props.id, this.props.size === 12 ? false : true);
	}

  	rowGetter(i) {
    	return this.props.data[i];
  	}

	getColumns() {
		return [
			{key: "f_number", name: "主叫号码"}, 
			{key: "t_number", name: "被叫号码"},
			{key: "call_start", name: "开始时间"},
			{key: "call_duration", name: "通话时长"}
		];
	}

	render() {
		const chart_height = this.props.isUnfold ? 190 : 320;
		const myId = this.props.id || "mainb";
		const title = this.props.title || "图表";
		const sizeCss =
			"col-md-" +
			this.props.size +
			" col-sm-" +
			this.props.size +
			" col-xs-12";

		var vizContent;
		if (this.props.type === "table") {
			vizContent = 
				<ReactDataGrid
        			columns={this.getColumns()}
        			rowGetter={this.rowGetter}
        			rowsCount={this.props.data.length}
        			minHeight={this.props.size===12 ? (this.props.viewHeight - 120) : chart_height} 
        		/>;
		} else {
			vizContent = <div id={myId} style={{ height: this.props.size===12 ? (this.props.viewHeight - 120) + 'px' : (chart_height + 'px') }} />;
		}

		return (
			<div className={sizeCss + " chartContainer"}>
				<div className="x_panel">
					<div className="x_title">
						<h2>
							{title}
						</h2>
						<ul className="nav navbar-right panel_toolbox">
							<li onClick={this.toggleExpandCollapse}>
								<a className="collapse-link">
									<i className={this.props.size===12 ? "fa fa-compress" : "fa fa-expand"} />
								</a>
							</li>
						</ul>
						<div className="clearfix" />
					</div>
					<div className="x_content">
						{vizContent}
					</div>
				</div>
			</div>
		);
	}
}

ChartContainer.defaultProps = {
	size: 6
};

module.exports = ChartContainer;