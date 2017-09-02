import React from 'react';
import EChartsWrapper from './Viz/EChartsWrapper.js';
import Grid from './Viz/Grid';

class ChartContainer extends React.Component {
	constructor(props) {
		super(props);

		this.wrapper = new EChartsWrapper(this);
		this.toggleExpandCollapse = this.toggleExpandCollapse.bind(this);
		this.chartInstance = null;
	}

	componentDidMount() {
		if (this.props.type !== 'table' ) {
			this.chartInstance = this.wrapper.renderChart(this.props.id, this.props.type || "bar", this.chartInstance, this.props.data, this.props.subType);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.type !== 'table' ) {
			this.wrapper.resizeChart(this.chartInstance);
		}
	}

	toggleExpandCollapse() {
		this.props.onExpandCollapse(this.props.id, this.props.size === 12 ? false : true);
	}

	render() {
		const chart_height_regular = this.props.isUnfold ? 190 : 320;
		const chart_height_full = this.props.viewHeight - 120;
		const chart_height = this.props.size===12 ?  chart_height_full : chart_height_regular;
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
			vizContent = <Grid data={this.props.data} height={chart_height}/>				
		} else {
			vizContent = <div id={myId} style={{ height: chart_height + 'px'}} />;
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