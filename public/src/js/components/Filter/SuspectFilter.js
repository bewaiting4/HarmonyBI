import React from 'react'
import Select from 'react-select'

var ENUM_CATEGORY = {
		SUSPECT: "嫌疑人",
		VICTIM: "受害人",
		UNKNOWN: "未知"
	},
	ENUM_ONLINE = {
		SHORT: "6个月内",
		MEDIUM: "2年以内",
		LONG: "2年以上"
	};
var optionsCategory = [{
		label: ENUM_CATEGORY.SUSPECT, value: ENUM_CATEGORY.SUSPECT
	}, {
		label: ENUM_CATEGORY.VICTIM, value: ENUM_CATEGORY.VICTIM
	}, {
		label: ENUM_CATEGORY.UNKNOWN, value: ENUM_CATEGORY.UNKNOWN
	}];
var optionsOnline = [{
		label: ENUM_ONLINE.SHORT, value: ENUM_ONLINE.SHORT
	}, {
		label: ENUM_ONLINE.MEDIUM, value: ENUM_ONLINE.MEDIUM
	}, {
		label: ENUM_ONLINE.LONG, value: ENUM_ONLINE.LONG
	}];

class SuspectFilter extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			category: ENUM_CATEGORY.UNKNOWN,
			online: ENUM_ONLINE.MEDIUM
		}
	}

	render() {
		this.suspectList = [{
			category: ENUM_CATEGORY.SUSPECT,
			phone: 13588888888,
			online: ENUM_ONLINE.SHORT
		}, {
			category: ENUM_CATEGORY.VICTIM,
			phone: 13677777777,
			online: ENUM_ONLINE.MEDIUM
		}, {
			category: ENUM_CATEGORY.UNKNOWN,
			phone: 13799999999,
			online: ENUM_ONLINE.LONG
		}];

		var suspectList = _.map(this.suspectList, function(suspect) {
			return <ul key={suspect.phone} className="list">
				<span className="phone_search">{suspect.phone}</span>			
				<Select simpleValue options={optionsCategory} placeholder="身份" value={suspect.category} className="category"/>
				<Select simpleValue options={optionsOnline} placeholder="续网" value={suspect.online} className="online"/>
				<div  className="upload_img"><img/></div>			
				<button className="delete">
					<i className="fa fa-remove" aria-hidden="true"></i>
				</button>
			</ul>
		});

		return <div className="tab_suspect filter_nav">
			<li>
				<ul className="list title">
					<input className="phone_search"/>
					<Select simpleValue options={optionsCategory} placeholder="身份" value={this.state.category} className="category"/>
					<Select simpleValue options={optionsOnline} placeholder="续网" value={this.state.online} className="online"/>
					<button disabled className="upload_img">上传照片</button>
					<button className="add">添加</button>
				</ul>
				{suspectList}
			</li>
		</div>
	}

}

module.exports = SuspectFilter;