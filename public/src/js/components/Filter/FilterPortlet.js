import React from "react";
import FontAwesome from "react-fontawesome";
import Datetime from "react-datetime";
import moment from "moment";
import InputMoment from "input-moment";

class FilterPortlet extends React.Component {
	constructor() {
		super();

		this.openFilter = this.openFilter.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.state = {
			m: moment()
		};
	}

	openFilter() {
		this.props.onOpenFilter(this.props.name);
	}

	handleChange(m) {
		this.setState({
			m: m
		});
	}

	handleSave() {
		console.log("saved", this.state.m.format("llll"));
	}

	render() {
		return (
			<li>
				<a onClick={this.openFilter}>
					<i className={"fa fa-" + this.props.icon}/>
					<div className="filter_title">
						{this.props.text}
						<span className={"fa " + "fa-chevron-" + (this.props.onFilter ? "down" : "right") + " chevron-icon"}/>
						<span className="fa fa-undo undo-icon"/>
					</div>
				</a>
				<ul
					className="nav child_menu"
					style={
						this.props.onFilter
							? {
									display: "block"
								}
							: {
									display: "none"
								}
					}
				>
					{this.props.children}
				</ul>
			</li>
		);
	}
}
module.exports = FilterPortlet;