import React from 'react'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'
import Datetime from 'react-datetime'
import moment from 'moment'
import InputMoment from 'input-moment'
import { toggleFilter } from '../../actions'

class FilterPortlet extends React.Component {
	constructor() {
		super();

		this.handleSave = this.handleSave.bind(this);
		this.handleResetFilter = this.handleResetFilter.bind(this);
		this.state = {
			m: moment()
		};
	}

	handleChange(m) {
		this.setState({
			m: m
		});
	}

	handleSave() {
		console.log("saved", this.state.m.format("llll"));
	}

	handleResetFilter() {
		this.props.onResetFilter();
	}

	render() {
		const titleClassName = "filter_title" + (this.props.onFilter ? " unfold" : "")
		const arrowClassName = "chevron-" + (this.props.onFilter ? "down" : "right")

		return (
			<li>
				<a className="site_title">
 	 				{/*<FontAwesome name={this.props.icon} className="side_bar-icon"/>*/}
 	 				<img src={"../icons/svg/filtericon/" + (this.props.icon)+ "@1x.svg"} className="logo" onClick={(e) => {this.props.onToggle()}}/>
					<div className={titleClassName}>
						<FontAwesome name={arrowClassName} className="chevron-icon" onClick={(e) => {this.props.onToggle()}}/>
						<span className="name">{this.props.text}</span>
						<FontAwesome name="undo" className="undo-icon" onClick={this.handleResetFilter}/>
						<span className="current">{this.props.currSel}</span>						
					</div>
				</a>
				<ul
					className="nav child_menu"
					style={{display: this.props.onFilter ? "block" : "none"}}
				>
					{this.props.children}
				</ul>
			</li>
		);
	}
}

const MAP_ICON = {
	Time: 'date', // "date-unset" "date-set"
	Location: 'map', // "map-unset" "map-set"
	IdNumber: 'id' // "id-unset" "id-set"
}

const mapStateToProps = (state, ownProps) => {
	const fprop = 'on' + ownProps.name + 'Filter'

	return {
		onFilter: state.filter[fprop],
		icon: MAP_ICON[ownProps.name] + '-' + (state.filter[fprop] ? 'set' : 'unset')
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onToggle: () => {
			dispatch(toggleFilter(ownProps.name))
		}
	}
}

FilterPortlet = connect(mapStateToProps, mapDispatchToProps)(FilterPortlet)

module.exports = FilterPortlet;