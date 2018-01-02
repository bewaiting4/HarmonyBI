import React from 'react'
import {ButtonGroup} from 'react-bootstrap'
import Select from 'react-select'
import RegionList from './RegionList'


function createOptionsList(inList, useKey) {
	var propIdx = useKey ? 1 : 0;

	return _.map(_.isArray(inList) ? inList : _.keys(inList), function(value, key) {
		return {label: arguments[propIdx], value: arguments[propIdx]}
	});
}

class RegionDropdownGroup extends React.Component {

	constructor(props) {
		super(props);

		this.onProvinceChange = this.onProvinceChange.bind(this);
		this.onCityChange = this.onCityChange.bind(this);
		this.onCountyChange = this.onCountyChange.bind(this);

		this.listProvince = createOptionsList(RegionList);		

		this.state = {
			location: {}
		}
	}

	onProvinceChange(val) {
		var name = 'location',
			obj = {};

		obj[name] = {
			province: val,
			city: _.keys(RegionList[val])[0],
			county: RegionList[val][_.keys(RegionList[val])[0]][0]
		};

		this.setState(obj);

		this.props.onUpdateRegion(obj[name]);
	}

	onCityChange(val) {
		var name = 'location';
		var obj = {};

		this.setState(function(prevState, props) {

			obj[name] = {
				province: prevState[name].province,
				city: val,
				county: RegionList[prevState[name].province][val][0]
			};

			return obj;
		});

		this.props.onUpdateRegion(obj[name]);
	}

	onCountyChange(val) {
		var name = 'location';
		var obj = {};

		this.setState(function(prevState, props) {
			obj[name] = {
				province: prevState[name].province,
				city: prevState[name].city,
				county: val
			};

			return obj;
		});

		this.props.onUpdateRegion(obj[name]);
	}

	resetFilter() {
		this.setState({
			location: {}
		});
	}

	render() {
		const prov = this.state.location.province;
		let listCity = prov ?  createOptionsList(RegionList[prov]): [];
		let listCounty = prov ? createOptionsList(RegionList[prov][this.state.location.city]): [];

		return <ButtonGroup justified>
			<Select simpleValue options={this.listProvince} placeholder="选择省" value={prov} onChange={this.onProvinceChange} />
			<Select simpleValue options={listCity} placeholder="选择市" value={this.state.location.city} onChange={this.onCityChange} />
			<Select simpleValue options={listCounty} placeholder="选择区" value={this.state.location.county} onChange={this.onCountyChange} />
		</ButtonGroup>	

	}

}

module.exports = RegionDropdownGroup;