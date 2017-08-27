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
				<a className="site_title" onClick={this.openFilter}>
 	 				<FontAwesome name={this.props.icon} className="side_bar-icon"/>
					<div className="filter_title">
						<FontAwesome name={"chevron-" + (this.props.onFilter ? "down" : "right")} className="chevron-icon"/>
						<span className="name">{this.props.text}</span>
						<FontAwesome name="undo" className="undo-icon"/>
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