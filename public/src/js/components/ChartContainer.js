import React from 'react'
import EChartsWrapper from './EChartsWrapper.js'

class ChartContainer extends React.Component {
	constructor() {
		super();

		this.wrapper = new EChartsWrapper(this);
		this.resize = this.resize.bind(this);

		this.chartInstance = null;
		this.state = {
			size: 4
		}
	}

	componentDidMount() {
		if (this.props.size !== undefined) {
			this.setState({size: this.props.size});
		}
		this.chartInstance = this.wrapper.renderChart(this.props.id, this.props.type || "bar", this.chartInstance);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.size !== prevState.size) {
			this.wrapper.resizeChart(this.chartInstance);	
		}		
	}

	resize() {
		this.setState(function(prevState, props) {
			return {
				size: prevState.size === 12 ? props.size : 12
			};
		});		
	}

	render() {
		const myId = this.props.id || "mainb";
		const title = this.props.title || "图表";
		const sizeCss =
			"col-md-" +
			this.state.size +
			" col-sm-" +
			this.state.size +
			" col-xs-12";

		var vizContent;
		if (this.props.type === "table") {
			vizContent = (
				<table className="table" style={{ height: "180px" }}>
					<thead>
						<tr>
							<th>#</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Username</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">1</th>
							<td>Mark</td>
							<td>Otto</td>
							<td>@mdo</td>
						</tr>
						<tr>
							<th scope="row">2</th>
							<td>Jacob</td>
							<td>Thornton</td>
							<td>@fat</td>
						</tr>
						<tr>
							<th scope="row">3</th>
							<td>Larry</td>
							<td>the Bird</td>
							<td>@twitter</td>
						</tr>
					</tbody>
				</table>
			);
		} else {
			vizContent = <div id={myId} style={{ height: "200px" }} />;
		}

		return (
			<div className={sizeCss}>
				<div className="x_panel">
					<div className="x_title">
						<h2>
							{title}
						</h2>
						<ul className="nav navbar-right panel_toolbox">
							<li onClick={this.resize}>
								<a className="collapse-link">
									<i className="fa fa-chevron-up" />
								</a>
							</li>
							<li className="dropdown">
								<a
									href="#"
									className="dropdown-toggle"
									data-toggle="dropdown"
									role="button"
									aria-expanded="false"
								>
									<i className="fa fa-wrench" />
								</a>
								<ul className="dropdown-menu" role="menu">
									<li>
										<a href="#">Settings 1</a>
									</li>
									<li>
										<a href="#">Settings 2</a>
									</li>
								</ul>
							</li>
							<li>
								<a className="close-link">
									<i className="fa fa-close" />
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
	size: 4
};
module.exports = ChartContainer;