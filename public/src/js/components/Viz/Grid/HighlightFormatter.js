import React from 'react'
import FontAwesome from 'react-fontawesome'
import ENUM from '../../Enums'

class HighlightFormatter extends React.Component {
	constructor(props) {
		super(props);

		this.cssMap = {base: 'tag'};
		this.cssMap[2] = this.cssMap.base + ' lv_one';
		this.cssMap[1] = this.cssMap.base + ' lv_two';
		this.cssMap[0] = this.cssMap.base + ' lv_three';	
	}

	render() {
		return <div className={this.cssMap[this.props.lvlMapping[this.props.value]] || this.cssMap.base}>
			{this.props.titleMapping[this.props.value]}
		</div>
	}
}

module.exports = HighlightFormatter;