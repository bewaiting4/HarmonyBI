import React from 'react'
import {Nav, NavItem} from 'react-bootstrap'
import style from './TabBar.css'

class TabBar extends React.Component {
	constructor() {
		super();

		this.handleSelect = this.handleSelect.bind(this);
		this.state = {
			activeKey: 0
		}
	}

	handleSelect(selectedKey) {
		this.props.onTabChange(selectedKey);
	}

	render() {
		return (
			<Nav className="footer footer_fixed" bsStyle="pills" activeKey={this.props.activeTab} onSelect={this.handleSelect}>
    			<NavItem eventKey={0} href="/home">分析页面</NavItem>
    			<NavItem eventKey={1} >话单页面</NavItem>
  			</Nav>
  		);
	}
}
module.exports = TabBar;