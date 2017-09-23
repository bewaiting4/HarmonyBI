import React from 'react'
import FontAwesome from 'react-fontawesome'
import ENUM from '../Enums'

class SuspectTypeFormatter extends React.Component {
	constructor(props) {
		super(props);

		this.colorMap = {};
		this.colorMap[ENUM.CATEGORY_KEY.SUSPECT] = ENUM.COLOR_MAP.LV_ONE;
		this.colorMap[ENUM.CATEGORY_KEY.UNKNOWN] = ENUM.COLOR_MAP.LV_TWO;
		this.colorMap[ENUM.CATEGORY_KEY.VICTIM] = ENUM.COLOR_MAP.LV_THREE;

		this.COLOR_DEFAULT = ENUM.COLOR_MAP.LV_TWO;
	}

	render() {
		return <div>
			<FontAwesome name="user" style={{color: this.colorMap[ENUM.CATEGORY_MAP_REVERSE[this.props.value]] || this.COLOR_DEFAULT}}/>{this.props.value === "" ? ENUM.CATEGORY_MAP[0] : this.props.value}
		</div>
	}
}

module.exports = SuspectTypeFormatter;