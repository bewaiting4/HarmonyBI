import React from 'react'
import _ from 'lodash'
import {Tabs, Tab} from 'react-bootstrap'
import Select from 'react-select';

import EChartsWrapper from '../Viz/EChartsWrapper'
import RegionList from './RegionList'
import RegionDropdownGroup from './RegionDropdownGroup'

import style from 'react-select/dist/react-select.css';

class LocationFilter extends React.Component {
	constructor(props) {
		super(props);

		this.wrapper = new EChartsWrapper(this);
		this.onFromCIChange = this.onFromCIChange.bind(this);
		this.onToCIChange = this.onToCIChange.bind(this);
		
		this.mapLocId = 'locMap';

		this.state = {};
	}

	componentDidMount() {
		this.filterInstance = this.wrapper.renderChart(this.mapLocId, "map", this.filterInstance);
	}

	onFromCIChange(val) {
		this.setState({
			fromCI: val
		});
	}

	onToCIChange(val) {
		this.setState({
			toCI: val
		});
	}

	render() {
		let optionsCI = _.map(this.props.CIData, function(value, key) {return {value: key, label: key}});

		return (
			<Tabs defaultActiveKey={1} id="loc_filter" justified className="tab_loc filter_nav">
				<Tab eventKey={1} title="地图定位" className="tab_map">
					<div className="map_container">
						<label>案发地点及敏感区</label>
						<div id={this.mapLocId} style={{width: "100%", height: "358px"}}/>
					</div>
				</Tab>
				<Tab eventKey={2} title="CI基站定位" className="tab_CI">
					<div className="CI_container">
						<label>主叫方</label>
						<Select multi simpleValue name="fromCI" options={optionsCI} placeholder="搜索CI基站" value={this.state.fromCI} onChange={this.onFromCIChange} />	

    					<div className="separator"><span>并且</span></div>

    					<label>被叫方</label>
    					<Select multi simpleValue name="toCI" options={optionsCI} placeholder="搜索CI基站" value={this.state.toCI} onChange={this.onToCIChange} />
					</div>
				</Tab>
				<Tab eventKey={3} title="行政区划定位" className="tab_region">
					<div className="region_container">
						<label>案发地点</label>
						<RegionDropdownGroup id="location1"/>
						<div className="separator"><span>并且</span></div>				  
						<RegionDropdownGroup id="location2"/>
					</div>
				</Tab>

			</Tabs>
		);
	}
}

module.exports = LocationFilter;